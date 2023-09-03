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
import { TiptapCollabProvider } from "@hocuspocus/provider";
import ShareDocument from "@/app/components/documents/ShareDocument";
import {EditorView} from '@codemirror/view'

// @ts-ignore
import { Autosave } from  'react-autosave';
// @ts-ignore
import markdownItMermaid from "@md-reader/markdown-it-mermaid";
// @ts-ignore
import markdownItTextualUml from "markdown-it-textual-uml";
// @ts-ignore
import { yCollab } from "y-codemirror.next";
// @ts-ignore
import RandomColor from "randomcolor";
import DownloadDocument from "@/app/components/documents/DownloadDocument";
import useEditorText from "@/app/hooks/useEditorText";

interface DocumentClientProps {
  currentUser: SafeUser | null;
  document: Document;
  project: Project;
  jwtToken: string;
  allUsers: SafeUser[] | [] 
  sharedUsers: SafeUser[] | undefined
}

const DocumentClient = ({
  currentUser,
  document,
  project,
  jwtToken,
  allUsers,
  sharedUsers
}: DocumentClientProps) => {
  const router = useRouter();

  const initalMarkdown = document.content ? document.content : `# ${document.title}`;

  const store = syncedStore({ contentText: "text" });
  const editorStateText = useEditorText();
  const providerInitalised = useRef(false);
  const editorMarkdown = useSyncedStore(store);
  const [isLoading, setIsLoading] = useState(false);
  const connectedUsers = useRef(0);

  let extensions = useMemo(() => [
    markdown({ base: markdownLanguage, codeLanguages: languages }),
    EditorView.lineWrapping
  ],[]);

  const md = require("markdown-it")({
    highlight: function (code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
    .use(markdownItTextualUml)
    .use(markdownItMermaid, {
      theme: "dark",
      flowchart: { useMaxWidth: true },
    });

  const parsedMarkdown = md.render(editorMarkdown.contentText.toString());

  useEffect(() => {
    if (providerInitalised.current) return;

    const doc = getYjsDoc(store);

    const provider = new TiptapCollabProvider({
      appId: "jkv8llmx",
      name: document.id,
      token: jwtToken,
      document: doc,
    });

    // @ts-ignore
    provider.awareness.setLocalStateField("user", {
      name: currentUser?.name,
      color: RandomColor(),
    });

    // @ts-ignore
    provider.awareness.on("change", () => {
      // @ts-ignore
      connectedUsers.current = Array.from(provider.awareness.getStates().values()).length;
    });

    provider.on("synced", () => {
      if (
        editorMarkdown.contentText.toString() === "" &&
        connectedUsers.current === 0
      ) {
        editorMarkdown.contentText.insert(0, initalMarkdown);
        editorStateText.setContent(initalMarkdown);
      }
    });

    extensions.push(yCollab(editorMarkdown.contentText, provider.awareness));

    providerInitalised.current = true;

    return () => {
      provider.disconnect();
    };
  }, [
    initalMarkdown,
    editorMarkdown,
    document.id,
    store,
    extensions,
    currentUser,
    jwtToken,
    editorStateText
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
    editorStateText.setContent(markdown);
    setValue("content", markdown);
  };

  let saveButton = (
    <div className="btn btn-primary" onClick={handleSubmit(onSave)}>
      Save
    </div>
  );

  if (isLoading) {
    saveButton = <div className="btn btn-primary btn-loading"></div>;
  }

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
            <div
              className="badge badge-flat-primary hover:cursor-pointer"
              onClick={() => {
                router.push(`/projects/${project.id}`);
              }}
            >
              {project.title}
            </div>
          </div>
          <div className="gap-4 navbar-center">
            <div>{connectedUsers.current}</div>
            <div className="title">{document.title}</div>
          </div>
          <div className="navbar-end gap-8">
            <div className="flex gap-4">
              <DownloadDocument documentTitle={document.title} />
              <ShareDocument document={document} currentUser={currentUser} sharedUsers={sharedUsers || []} allUsers={allUsers}/>
              {saveButton}

            </div>
            <input
              className="hidden"
              value={editorMarkdown.contentText.toString()}
              {...register("content")}
            />
            <div className="navbar-item dropdown">
              <div tabIndex={0}>Menu</div>
              <div className="dropdown-menu">
                <div tabIndex={-1} className="dropdown-item" onClick={() => router.push("/projects")}> Projects </div>
                <div tabIndex={-1} className="dropdown-item" onClick={() => router.push("/documents")}> Documents </div>
                <div tabIndex={-1} className="dropdown-item" onClick={() => router.push("/documents/shared")}> Shared Documents </div>
                <div tabIndex={-1} className="dropdown-item">Profile</div>
                <div tabIndex={-1} className="dropdown-item" onClick={() => signOut()}>Logout </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
      <ClientOnly>
        <div className="w-full h-screen overflow-y-scroll grid grid-cols-1 sm:grid-cols-2">
          <div className="border-r-2 border-gray-5">
            <CodeMirror
              extensions={extensions}
              theme={githubDark}
              onChange={onChange}
            />
          </div>
          <div className="bg-gray-4 relative">
            <div className="absolute top-0 right-0 text-xs">Preview</div>
            <div
              className="prose prose-invert p-10"
              dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
            ></div>
          </div>
        </div>
      </ClientOnly>
      <Autosave data={editorMarkdown.contentText.toString()} onSave={handleSubmit(onSave)} interval={10000}/>
    </div>
  );
};

export default DocumentClient;
