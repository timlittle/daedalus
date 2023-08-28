"use client";

import ClientOnly from "@/app/components/ClientOnly";
import Editor from "@/app/components/editor/Editor";
import Preview from "@/app/components/editor/Preview";
import { SafeUser } from "@/app/types";
import { Document, Project } from "@prisma/client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { GiMaze } from "react-icons/gi";

interface DocumentClientProps {
  currentUser: SafeUser | null;
  document: Document;
  project: Project;
}

const DocumentClient = ({ 
  currentUser, 
  document,
  project 
}: DocumentClientProps) => {
  const router = useRouter();

  const initalContent = document.content ? document.content : `# ${document.title}`
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      id: document.id,
      content: initalContent
    }
  });

  const onSave: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put(`/api/documents/content/${document.id}`, data)
      .then(()=>{
        toast.success("Document saved");
      })
      .catch(()=>{
        toast.error("Failed to save document");
      })
      .finally(()=>{
        setIsLoading(false);
      })
  }

  const [markdown, setMarkdown] = useState(initalContent);

  const onChange = (markdown: string) => {
    setMarkdown(markdown);
    setValue("content", markdown);
  };

  let saveButton = (
    <div className="btn btn-primary" onClick={handleSubmit(onSave)}>Save</div>
  )

  if (isLoading) {
    saveButton = (
      <div className="btn btn-primary btn-loading"></div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <ClientOnly>
        <div className="navbar rounded-lg">
          <div className="navbar-start gap-4 hover:cursor-pointer" onClick={()=> router.push('/')}>
            <GiMaze size={30} />
            <div>Daedalus</div>
          </div>
          <div className="gap-4 navbar-center">
            <div className="title">{document.title}</div>
          </div>
          <div className="navbar-end gap-8">
            <div className="badge badge-flat-primary hover:cursor-pointer" onClick={()=>{router.push(`/projects/${project.id}`)}}>{project.title}</div>
            { saveButton }
            <input className="hidden" value={markdown} {...register("content")}/>
            <div className="navbar-item dropdown">
              <div tabIndex={0}>Menu</div>
              <div className="dropdown-menu">
                <div
                  tabIndex={-1}
                  className="dropdown-item"
                  onClick={() => router.push("/projects")}
                >
                  Projects
                </div>
                <div tabIndex={-1} className="dropdown-item">
                  Profile
                </div>
                <div
                  tabIndex={-1}
                  className="dropdown-item"
                  onClick={() => signOut()}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
      <ClientOnly>
        <div className="w-full h-screen overflow-y-scroll grid grid-cols-1 sm:grid-cols-2">
          <Editor content={markdown} setMarkdown={onChange} />
          <Preview markdown={markdown} />
        </div>
      </ClientOnly>
    </div>
  );
};

export default DocumentClient;
