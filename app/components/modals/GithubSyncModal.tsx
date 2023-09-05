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
  const router = useRouter();
  const githubSyncModal = useGithubSyncModal();
  const editorStateText = useEditorText();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    axios
      .post("/api/github/sync", data)
      .then(() => {
        toast.success("Document Synced!");
        router.refresh();
        reset();
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
    githubSyncModal.onClose();
    reset();
  }, [githubSyncModal, reset]);

  useEffect(() => {
    setValue("path", githubSyncModal.githubPath);
    setValue("owner", githubSyncModal.githubOwner);
    setValue("content", editorStateText.content);
  }, [setValue, githubSyncModal, editorStateText]);

  // Body of the form
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
