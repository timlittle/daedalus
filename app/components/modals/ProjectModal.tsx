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
  // Modal used to create and edit projects

  // Setup the router and fetch the project modal
  const router = useRouter();
  const projectModal = useProjectModal();

  // Setup state to indicate the modal is busy
  const [isLoading, setIsLoading] = useState(false);

  // Setup the form for submission
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
    // Submit handler for creating the project in the database

    // Indicate the modal is busy
    setIsLoading(true);

    // Make a clall to the internal API to create the project
    axios
      .post("/api/projects", data)
      .then(() => {
        // Provide the user feedback on the action
        toast.success("Project Created!");
        // Refresh the page
        router.refresh();
        // Reset the form
        reset();
        // Close the modal
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
    // Subbmit handler for editing a project

    // Indicate the modal is busy
    setIsLoading(true);

    // Make a call to the internal API to update the project record in the database
    axios
      .put(`/api/projects/${data.id}`, data)
      .then(() => {
        // Provide feedback to the user
        toast.success("Project updated!");
        // Refresh the page
        router.refresh();
        // Reset the form
        reset();
        // Close the modal
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
    // When the modal is closed, reset the form
    projectModal.onClose();
    reset();
  }, [projectModal, reset]);

  // Setup default state for creattion
  let submitHandler = onCreate;
  let actionLabel = "Create";
  let heading = <Heading title="Create a new project" subtitle="A project is a collection of documents that contribute to a project" />;

  // If we are updating, update the UI and populate state with details from the project object
  if (projectModal.isEdit) {
    heading = <Heading title="Edit project" />;
    submitHandler = onEdit;
    actionLabel = "Update";
    // Setup the value of the form based on the existing project object
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

  // Render the modal using the base Modal component
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
