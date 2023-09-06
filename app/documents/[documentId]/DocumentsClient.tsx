"use client";

import ClientOnly from "@/app/components/ClientOnly";
import { SafeUser } from "@/app/types";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorView } from "@codemirror/view";
import { TiptapCollabProvider } from "@hocuspocus/provider";
import { Document, GithubAuthZ, Project } from "@prisma/client";
import syncedStore, { getYjsDoc } from "@syncedstore/core";
import { useSyncedStore } from "@syncedstore/react";
import { githubDark } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import DownloadMenuItem from "@/app/components/documents/DownloadMenuItem";
import GitSyncMenuItem from "@/app/components/documents/GitSyncMenuItem";
import SaveMenuItem from "@/app/components/documents/SaveMenuItem";
import ShareMenuItem from "@/app/components/documents/ShareMenuItem";
import MenuItem from "@/app/components/navbar/MenuItem";
import Navbar from "@/app/components/navbar/Navbar";
import useEditorText from "@/app/hooks/useEditorText";

// @ts-ignore
import markdownItMermaid from "@md-reader/markdown-it-mermaid";
// @ts-ignore
import markdownItTextualUml from "markdown-it-textual-uml";
// @ts-ignore
import { yCollab } from "y-codemirror.next";
// @ts-ignore
import RandomColor from "randomcolor";

interface DocumentClientProps {
  currentUser: SafeUser | null;
  document: Document;
  project: Project;
  jwtToken: string;
  allUsers: SafeUser[] | [];
  sharedUsers: SafeUser[] | undefined;
  githubAuthZ?: GithubAuthZ | null;
  githubOwner?: string;
  githubRepos?: string[];
}

const DocumentClient = ({
  currentUser,
  document,
  project,
  jwtToken,
  allUsers,
  sharedUsers,
  githubAuthZ,
  githubOwner,
  githubRepos,
}: DocumentClientProps) => {
  const router = useRouter();

  const initalMarkdown = document.content ? document.content : `# ${document.title}`;

  const store = syncedStore({ contentText: "text" });
  const editorStateText = useEditorText();
  const providerInitalised = useRef(false);
  const editorMarkdown = useSyncedStore(store);
  const connectedUsers = useRef(0);

  let extensions = useMemo(() => [markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping], []);
  let displayGithubSync = true;

  if (!githubOwner || !githubRepos || !githubAuthZ) {
    displayGithubSync = false;
  }

  const md = require("markdown-it")({
    highlight: function (code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
    .use(markdownItTextualUml)
    .use(require("markdown-it-task-lists"))
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
      if (editorMarkdown.contentText.toString() === "" && connectedUsers.current === 0) {
        editorMarkdown.contentText.insert(0, initalMarkdown);
        editorStateText.setContent(initalMarkdown);
      }
    });

    extensions.push(yCollab(editorMarkdown.contentText, provider.awareness));

    providerInitalised.current = true;

    return () => {
      provider.disconnect();
    };
  }, [initalMarkdown, editorMarkdown, document.id, store, extensions, currentUser, jwtToken, editorStateText]);

  const onChange = (markdown: string) => {
    editorStateText.setContent(markdown);
  };

  const navMenuItems = [
    <ShareMenuItem key="share" document={document} currentUser={currentUser} sharedUsers={sharedUsers || []} allUsers={allUsers} />,
    <SaveMenuItem key="save" documentId={document.id} />,
    <DownloadMenuItem key="download" documentTitle={document.title} />,

    ...(displayGithubSync
      ? [<GitSyncMenuItem key="githubsync" documentTitle={document.title} githubOwner={githubOwner} githubRepos={githubRepos} />]
      : [""]),

    <div key="divider" className="divider" />,
    <MenuItem key="projects" action={() => router.push("/projects")} actionLabel="Projects" />,
    <MenuItem key="documents" action={() => router.push("/documents")} actionLabel="Documents" />,
    <MenuItem key="shared" action={() => router.push("/documents/shared")} actionLabel="Shared Documents" />,
    <MenuItem key="profile" action={() => router.push("/profile")} actionLabel="Profile" />,
    <MenuItem key="logout" action={() => signOut()} actionLabel="Logout" />,
  ];

  return (
    <div className="flex flex-col h-screen">
      <ClientOnly>
        <Navbar
          currentUser={currentUser}
          menuItems={navMenuItems}
          badgeLabel={project.title}
          badgeAction={() => router.push(`/projects/${project.id}`)}
          documentTitle={document.title}
        />
      </ClientOnly>
      <ClientOnly>
        <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2">
          <div className="border-r-2 border-gray-5">
            <CodeMirror extensions={extensions} theme={githubDark} onChange={onChange} />
          </div>
          <div className="bg-gray-4 relative sm:overflow-scroll">
            <div className="absolute top-0 right-0 text-xs">Preview</div>
            <div className="prose prose-invert p-10 leading-6 prose-code:leading-6:" dangerouslySetInnerHTML={{ __html: parsedMarkdown }}></div>
          </div>
          <div className="bottom-3 right-3 text-xs fixed">{connectedUsers.current}</div>
        </div>
      </ClientOnly>
    </div>
  );
};

export default DocumentClient;
