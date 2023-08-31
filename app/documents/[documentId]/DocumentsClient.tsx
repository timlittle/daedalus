"use client";

import ClientOnly from "@/app/components/ClientOnly";
import { SafeUser } from "@/app/types";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { Document, Project } from "@prisma/client";
import syncedStore, { getYjsDoc } from "@syncedstore/core";
import { useSyncedStore } from "@syncedstore/react";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { GiMaze } from "react-icons/gi";
// @ts-ignore
import { yCollab } from "y-codemirror.next";
// @ts-ignore
import { WebrtcProvider } from "y-webrtc";
// @ts-ignore
import RandomColor from "randomcolor";

interface DocumentClientProps {
  currentUser: SafeUser | null;
  document: Document;
  project: Project;
}

const DocumentClient = ({
  currentUser,
  document,
  project,
}: DocumentClientProps) => {
  const router = useRouter();

  const initalMarkdown = document.content
    ? document.content
    : `# ${document.title}`;

  const store = syncedStore({ contentText: "text" });
  const providerInitalised = useRef(false);
  const editorMarkdown = useSyncedStore(store);
  const [isLoading, setIsLoading] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(0);

  let extensions = useMemo(
    () => [markdown({ base: markdownLanguage, codeLanguages: languages })],
    []
  );

  useEffect(() => {
    if (providerInitalised.current) return;

    try {
      const doc = getYjsDoc(store);
      const webrtcProvider = new WebrtcProvider(document.id, doc, {
        // signaling: ["ws://localhost:4444"],
      });
      webrtcProvider.awareness.setLocalStateField("user", {
        name: "User " + Math.floor(Math.random() * 100),
        color: RandomColor(),
      });
  
      webrtcProvider.awareness.on("change", () => {
        setConnectedUsers(
          Array.from(webrtcProvider.awareness.getStates().values()).length
        );
      });
  
      webrtcProvider.awareness.on("connect", () => {
        toast.success(currentUser + " connected");
      });
  
      webrtcProvider.awareness.on("close", () => {
        toast.success(currentUser + " disconnected");
      });
  
      extensions.push(
        yCollab(editorMarkdown.contentText, webrtcProvider.awareness)
      );
      providerInitalised.current = true;
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    }
  }, [
    initalMarkdown,
    editorMarkdown,
    document.id,
    store,
    extensions,
    currentUser,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      id: document.id,
      content: initalMarkdown,
    },
  });

  const onSave: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put(`/api/documents/content/${document.id}`, data)
      .then(() => {
        toast.success("Document saved");
      })
      .catch(() => {
        toast.error("Failed to save document");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onChange = (markdown: string) => {
    setValue("content", markdown);
  };
  const onCreate = () => {
    if (editorMarkdown.contentText.toString() === "") {
      editorMarkdown.contentText.insert(0, initalMarkdown);
    }
  };

  let saveButton = (
    <div className="btn btn-primary" onClick={handleSubmit(onSave)}>
      Save
    </div>
  );

  if (isLoading) {
    saveButton = <div className="btn btn-primary btn-loading"></div>;
  }

  const md = require("markdown-it")({
    highlight: function (code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  });

  const parsed = md.render(editorMarkdown.contentText.toString());

  return (
    <div className="flex flex-col h-screen">
      <ClientOnly>
        <div className="navbar rounded-lg">
          <div
            className="navbar-start gap-4 hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            <GiMaze size={30} />
            <div>Daedalus</div>
          </div>
          <div className="gap-4 navbar-center">
            <div>{connectedUsers}</div>
            <div className="title">{document.title}</div>
          </div>
          <div className="navbar-end gap-8">
            <div
              className="badge badge-flat-primary hover:cursor-pointer"
              onClick={() => {
                router.push(`/projects/${project.id}`);
              }}
            >
              {project.title}
            </div>
            {saveButton}
            <input
              className="hidden"
              value={editorMarkdown.contentText.toString()}
              {...register("content")}
            />
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
          <div className="border-r-2 border-gray-5">
            <CodeMirror
              value={editorMarkdown.contentText.toString()}
              extensions={extensions}
              theme={githubDark}
              onChange={onChange}
              onCreateEditor={onCreate}
            />
          </div>
          {/* <Editor /> */}
          <div className="bg-gray-4 relative">
            <div className="absolute top-0 right-0 text-xs">Preview</div>
            <div
              className="prose prose-invert p-10"
              dangerouslySetInnerHTML={{ __html: parsed }}
            ></div>
          </div>
        </div>
      </ClientOnly>
    </div>
  );
};

export default DocumentClient;
