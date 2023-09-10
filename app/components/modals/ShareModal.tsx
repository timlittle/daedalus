"use client";

import useShareModal from "@/app/hooks/useShareModal";
import { SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Modal from "./Modal";

const ShareModal = () => {
  // The share modal, used to prompt the user to share documents with other users

  // Setup the router and fetch the share modal hook
  const router = useRouter();
  const shareModal = useShareModal();

  // State to indicate the modal sumbit is loading
  const [isLoading, setIsLoading] = useState(false);

  // Setup the state for the list of users and the document
  const [shareableUser, setShareableUser] = useState<SafeUser[]>([]);
  const [shareDocument, setShareDocument] = useState("");

  // Setup the form for submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      documentId: "",
      userId: "",
    },
  });

  const onCreate: SubmitHandler<FieldValues> = (data) => {
    // Submit handlder used when the user submits the form

    // Set the loading state to indicate it is busy
    setIsLoading(true);

    // Make a call to the internal API to create the share relationship in the database
    axios
      .post("/api/documents/share", data)
      .then(() => {
        // Give feedback to the user of the action
        toast.success("Document shared!");
        // Refresh the page
        router.refresh();
        // Reset the form
        reset();
        // Close the form
        shareModal.onClose();
      })
      .catch(() => {
        // Give feedback to the user of the action
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = useCallback(() => {
    // Handler for closing the modal and clearing the form
    shareModal.onClose();
    reset();
  }, [shareModal, reset]);

  // Setup default state for the modal
  let submitHandler = onCreate;
  let actionLabel = "Share";
  let heading = <Heading title="Share the document" subtitle="Select a users to collaborate on this document with" />;

  useEffect(() => {
    // Work out which users are not already shared
    let availibleUsers = [...shareModal.allUsers];

    // Compare the list of all the users and users with access already and filter the array
    shareModal.sharedUsers.map((sharedUser) => {
      for (var i = 0; i < availibleUsers.length; i++) {
        if (availibleUsers[i].id === sharedUser.id) {
          availibleUsers.splice(i, 1);
          break;
        }
      }
    });

    // Set the state to the filtered list
    setShareableUser(availibleUsers);
    setShareDocument(shareModal.documentId);

    // Update the form with the doucment id
    setValue("documentId", shareDocument);
  }, [shareModal, setValue, shareDocument]);

  // The body of the content form with a table of permissions and a select for new users
  // Tied to the react-hook-form for submission
  const bodyContent = (
    <div className="flex flex-col gap-8">
      {heading}
      <input value={shareDocument} className="hidden" {...register("documentId")} />
      <div className="flex w-full overflow-x-auto">
        <table className="table-compact table max-w-4xl">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {shareModal.sharedUsers.map((user) => (
              <tr key={user.id}>
                <th>
                  {user.name}
                  <div className="text-xs">{user.email}</div>
                </th>
                <th>Contributor</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row gap-8">
        <div className="flex title text-center items-center justify-center">Add user:</div>
        <select
          data-cy="share-select"
          {...register("userId", { required: true })}
          className={`
        select
        ${errors["userId"] ? "border-rose-500" : "border-neutral-300"}
        ${errors["userId"] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        >
          {shareableUser.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  // Render the modal using the base Modal component
  return (
    <Modal
      isOpen={shareModal.isOpen}
      title="Share"
      onClose={onClose}
      onSubmit={handleSubmit(submitHandler)}
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
};

export default ShareModal;
