"use client";

import useEditorText from "@/app/hooks/useEditorText";
import useGithubSyncModal from "@/app/hooks/useGithubSyncModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const GithubSyncModal = () => {
  // Modal for prompting the user to sync their document to github

  // Setup the next router and fetch the githubsync modal state
  const router = useRouter();
  const githubSyncModal = useGithubSyncModal();
  // Fetch the state of the editor using the custom hook
  const editorStateText = useEditorText();

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
      repo: "",
      commitMessage: "",
      content: "",
      owner: "",
      path: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Sumbit handler for syncing the changes to github

    // Indicate the modal is busy
    setIsLoading(true);

    // Make a call to the internal API to sync the change to github
    axios
      .post("/api/github/sync", data)
      .then(() => {
        // Provide feedback to the user
        toast.success("Document Synced!");
        // Refresh the page
        router.refresh();
        // Reset the form
        reset();
        // Close the modal
        githubSyncModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = useCallback(() => {
    // Clear the form state when the modal is closed
    githubSyncModal.onClose();
    reset();
  }, [githubSyncModal, reset]);

  useEffect(() => {
    // Populate the state of the form on page load using state from the database or editor
    setValue("path", githubSyncModal.githubPath);
    setValue("owner", githubSyncModal.githubOwner);
    setValue("content", editorStateText.content);
  }, [setValue, githubSyncModal, editorStateText]);

  // Body of the form
  // loops through the repos the GitHub App has access to
  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Sync to a github repo" subtitle="Sync the current file to a github repo" />
      <div className="flex flex-row">
        <Input id="owner" label="User" register={register} errors={errors} required disabled />
        <Input id="path" label="Path" register={register} errors={errors} required disabled />
      </div>
      <div className="flex flex-row">
        <select
          {...register("repo", { required: true })}
          className={`
          select
          select-block
          ${errors["repo"] ? "border-rose-500" : "border-neutral-300"}
          ${errors["repo"] ? "focus:border-rose-500" : "focus:border-black"}
          `}
        >
          {githubSyncModal.githubRepos.map((repo) => (
            <option value={repo} key={repo}>
              {repo}
            </option>
          ))}
        </select>
      </div>
      <Input id="commitMessage" label="Commit Message" register={register} errors={errors} required />
    </div>
  );

  // Render the modal using the Modal base component
  return (
    <Modal
      isOpen={githubSyncModal.isOpen}
      title="Sync to Github"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Sync"
      body={bodyContent}
    />
  );
};

export default GithubSyncModal;
