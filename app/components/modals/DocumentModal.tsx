"use client";

import useDocumentModal from "@/app/hooks/useDocumentModal";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const DocumentModal = () => {
  const router = useRouter();
  const documentModal = useDocumentModal();
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      id: "",
      projectId: "",
      title: "",
      description: "",
    },
  });

  const onCreate: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    data.projectId = projectId;

    axios
      .post("/api/documents", data)
      .then(() => {
        toast.success("Document Created!");
        router.refresh();
        reset();
        documentModal.onClose();
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
      .put(`/api/documents/${data.id}`, data)
      .then(() => {
        toast.success("Document updated!");
        router.refresh();
        reset();
        documentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = useCallback(() => {
    documentModal.onClose();
    reset();
  }, [documentModal, reset]);

  // Setup default state for create
  let submitHandler = onCreate;
  let actionLabel = "Create";
  let heading = <Heading title="Create a new document" subtitle="A document to collaborate on" />;

  // If we are updating
  if (documentModal.isEdit) {
    heading = <Heading title="Edit document" />;
    submitHandler = onEdit;
    actionLabel = "Update";
    setValue("id", documentModal.documentId);
    setValue("projectId", documentModal.projectId);
    setValue("title", documentModal.documentTitle);
    setValue("description", documentModal.documentDescription);
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
      isOpen={documentModal.isOpen}
      title="New Document"
      onClose={onClose}
      onSubmit={handleSubmit(submitHandler)}
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
};

export default DocumentModal;
