"use client";
import useEditorText from "@/app/hooks/useEditorText";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiSolidSave } from "react-icons/bi";
import MenuItem from "../navbar/MenuItem";
import { useEffect } from "react";

// @ts-ignore
import { Autosave } from "react-autosave";

interface SaveMenuItemProps {
  documentId: string;
}

const SaveMenuItem: React.FC<SaveMenuItemProps> = ({ documentId }) => {
  const editorStateText = useEditorText();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      id: documentId,
      content: "",
    },
  });

  useEffect(() => {
    setValue("content", editorStateText.content);
  }, [setValue, editorStateText]);

  const onSave: SubmitHandler<FieldValues> = (data) => {
    axios
      .put(`/api/documents/content/${documentId}`, data)
      .then(() => {
        toast.success("Document saved");
      })
      .catch(() => {
        toast.error("Failed to save document");
      });
  };

  return (
    <div>
      <MenuItem key="save" action={handleSubmit(onSave)} actionLabel="Save" icon={BiSolidSave} />
      <input className="hidden" value={editorStateText.content} {...register("content")} />
      <Autosave data={editorStateText.content as any} onSave={handleSubmit(onSave)} interval={10000} />
    </div>
  );
};

export default SaveMenuItem;
