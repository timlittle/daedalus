"use client";

import useProjectModal from "@/app/hooks/useProjectModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const ProjectModal = () => {
  const router = useRouter();
  const projectModal = useProjectModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      id: "",
      title: "",
      description: "",
    },
  });

  const onCreate: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/projects", data)
      .then(() => {
        toast.success("Project Created!");
        router.refresh();
        reset();
        projectModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onEdit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put(`/api/projects/${data.id}`, data)
      .then(() => {
        toast.success("Project updated!");
        router.refresh();
        reset();
        projectModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = useCallback(() => {
    projectModal.onClose();
    reset();
  }, [projectModal, reset]);

  // Setup default state for create
  let submitHandler = onCreate;
  let actionLabel = "Create";
  let heading = <Heading title="Create a new project" subtitle="A project is a collection of documents that contribute to a project" />;

  // If we are updating
  if (projectModal.isEdit) {
    heading = <Heading title="Edit project" />;
    submitHandler = onEdit;
    actionLabel = "Update";
    setValue("id", projectModal.projectId);
    setValue("title", projectModal.projectTitle);
    setValue("description", projectModal.projectDescription);
  }

  // Body of the form
  const bodyContent = (
    <div className="flex flex-col gap-8">
      {heading}
      <Input id="title" label="Title" register={register} errors={errors} required />
      <Input id="description" label="Description" register={register} errors={errors} required />
    </div>
  );

  return (
    <Modal
      isOpen={projectModal.isOpen}
      title="New Project"
      onClose={onClose}
      onSubmit={handleSubmit(submitHandler)}
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
};

export default ProjectModal;
