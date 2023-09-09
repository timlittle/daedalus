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
  const router = useRouter();
  const shareModal = useShareModal();
  const [isLoading, setIsLoading] = useState(false);

  const [shareableUser, setShareableUser] = useState<SafeUser[]>([]);
  const [shareDocument, setShareDocument] = useState("");

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
    setIsLoading(true);

    axios
      .post("/api/documents/share", data)
      .then(() => {
        toast.success("Document shared!");
        router.refresh();
        reset();
        shareModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = useCallback(() => {
    shareModal.onClose();
    reset();
  }, [shareModal, reset]);

  // Setup default state for create
  let submitHandler = onCreate;
  let actionLabel = "Share";
  let heading = <Heading title="Share the document" subtitle="Select a users to collaborate on this document with" />;

  useEffect(() => {
    // Work out which users are not already shared
    let availibleUsers = [...shareModal.allUsers];

    shareModal.sharedUsers.map((sharedUser) => {
      for (var i = 0; i < availibleUsers.length; i++) {
        if (availibleUsers[i].id === sharedUser.id) {
          availibleUsers.splice(i, 1);
          break;
        }
      }
    });

    setShareableUser(availibleUsers);
    setShareDocument(shareModal.documentId);
    setValue("documentId", shareDocument);
  }, [shareModal, setValue, shareDocument]);

  // Body of the form
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
