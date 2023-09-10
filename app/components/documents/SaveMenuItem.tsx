"use client";
import useEditorText from "@/app/hooks/useEditorText";
import axios from "axios";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiSolidSave } from "react-icons/bi";
import MenuItem from "../navbar/MenuItem";

// @ts-ignore
import { Autosave } from "react-autosave";

interface SaveMenuItemProps {
  documentId: string;
}

const SaveMenuItem: React.FC<SaveMenuItemProps> = ({ documentId }) => {
  // Component to save the state of the editor to the database

  // Fecth the state of the editor from the custom hook
  const editorStateText = useEditorText();

  // Setup a form for submitting to the API hanlder
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
    // Set the content of the form based on the state in the editor
    setValue("content", editorStateText.content);
  }, [setValue, editorStateText]);

  const onSave: SubmitHandler<FieldValues> = (data) => {
    // Onsave, call the internal API to save the document to the database
    axios
      .put(`/api/documents/content/${documentId}`, data)
      .then(() => {
        // Give feedback to the user of the action
        toast.success("Document saved");
      })
      .catch(() => {
        // Give feedback to the user of the action
        toast.error("Failed to save document");
      });
  };

  // Render the menuitem on the page
  // Include a hidden input field for the form and populate it with the state from the useEffect
  // Using the Autosave feature the onSave handler will be called when the user stops typing
  return (
    <div>
      <MenuItem key="save" action={handleSubmit(onSave)} actionLabel="Save" icon={BiSolidSave} />
      <input className="hidden" value={editorStateText.content} {...register("content")} />
      <Autosave data={editorStateText.content as any} onSave={handleSubmit(onSave)} interval={10000} />
    </div>
  );
};

export default SaveMenuItem;
