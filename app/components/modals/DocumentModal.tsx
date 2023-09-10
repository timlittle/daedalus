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
  // Modal for creating and updating documents

  // Fetch the next router and document modal state from hooks
  const router = useRouter();
  const documentModal = useDocumentModal();

  // Setup state for indicating the modal is busy
  const [isLoading, setIsLoading] = useState(false);

  // Pull the project id from the params in the URL
  const { projectId } = useParams();

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
      projectId: "",
      title: "",
      description: "",
    },
  });

  const onCreate: SubmitHandler<FieldValues> = (data) => {
    // Callback function to submit the form to the API

    // Indicate the modal is busy
    setIsLoading(true);

    // Set the project ID in the request to the one from the page
    data.projectId = projectId;

    // Call the internal API to create the the document
    axios
      .post("/api/documents", data)
      .then(() => {
        // Feedback to the user
        toast.success("Document Created!");
        // Refresh the page
        router.refresh();
        // Reset the form
        reset();
        // Close the modal
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
    // Callback fuction to submit the form for updates

    // Indicate the modal is busy
    setIsLoading(true);

    // Call the internal API to update the project in the database
    axios
      .put(`/api/documents/${data.id}`, data)
      .then(() => {
        // Feedback to the user
        toast.success("Document updated!");
        // Refresh the page
        router.refresh();
        // Reset the form
        reset();
        // Close the modal
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
    // Reset the form when the modal is closed
    documentModal.onClose();
    reset();
  }, [documentModal, reset]);

  // Setup default state for create
  let submitHandler = onCreate;
  let actionLabel = "Create";
  let heading = <Heading title="Create a new document" subtitle="A document to collaborate on" />;

  // If updating, change the modal and populate it with state
  if (documentModal.isEdit) {
    heading = <Heading title="Edit document" />;
    submitHandler = onEdit;
    actionLabel = "Update";
    // Set the values of the form in the modal with the state from the page
    setValue("id", documentModal.documentId);
    setValue("projectId", documentModal.projectId);
    setValue("title", documentModal.documentTitle);
    setValue("description", documentModal.documentDescription);
  }

  // Body of the form with title and description
  const bodyContent = (
    <div className="flex flex-col gap-8">
      {heading}
      <Input id="title" label="Title" register={register} errors={errors} required />
      <Input id="description" label="Description" register={register} errors={errors} required />
    </div>
  );

  // Render the modal with the Modal base component
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
