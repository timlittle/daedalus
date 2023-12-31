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
  tipTapApp: string;
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
  tipTapApp,
  allUsers,
  sharedUsers,
  githubAuthZ,
  githubOwner,
  githubRepos,
}: DocumentClientProps) => {
  // The editor view for the platform
  // Contains realtime collaboration, sharing, gitsyncing, markdown rendering, mermaid/plantuml rendering

  // Setup the next router
  const router = useRouter();

  // Fetch the markdown from the database, if it is blank generate a default
  const initalMarkdown = document.content ? document.content : `# ${document.title}`;

  // Setup a distributed state in a SyncedStore
  const store = syncedStore({ contentText: "text" });
  const editorMarkdown = useSyncedStore(store);

  // Store the state of the editor into a custom hook
  const editorStateText = useEditorText();

  // State for when the yJS provider has been provided
  const providerInitalised = useRef(false);

  // Count of how many users are connect to the page
  const connectedUsers = useRef(0);

  // List of all the exensions for the code editor
  let extensions = useMemo(() => [markdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping], []);

  // If the user has connected to the github app, display the button
  let displayGithubSync = true;

  // If the user has not connected, do not display
  if (!githubOwner || !githubRepos || !githubAuthZ) {
    displayGithubSync = false;
  }

  // Setup the markdown renderer
  // Using TextualUML to display PlantUML
  // Using Mermaid to display Mermaid
  // Using Task List to display checklists
  // Setup code syntax highlighting using highlight.js
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

  // Parse the markdown in the editor into HTML using markdown-it
  const parsedMarkdown = md.render(editorMarkdown.contentText.toString());

  // Setup the real time collaboration in the page with yJS, SyncedStore and Hocuspocus
  useEffect(() => {
    // If the provider already setup, skip
    if (providerInitalised.current) return;

    // Fetch the yJS document from the SyncedStore
    const doc = getYjsDoc(store);

    // Setup the HocusPocus store using the cloud based version
    // Use the JWT to authenticate
    const provider = new TiptapCollabProvider({
      appId: tipTapApp,
      name: document.id,
      token: jwtToken,
      document: doc,
    });

    // Setup the awareness for yJS, displays the users cursor and name in the UI
    // @ts-ignore
    provider.awareness.setLocalStateField("user", {
      name: currentUser?.name,
      color: RandomColor(),
    });

    // When the awareness changes (new users, disconnects), update the connectedusers
    // @ts-ignore
    provider.awareness.on("change", () => {
      // @ts-ignore
      connectedUsers.current = Array.from(provider.awareness.getStates().values()).length;
    });

    // Load the inital markdown into editor when it connects
    provider.on("synced", () => {
      if (editorMarkdown.contentText.toString() === "" && connectedUsers.current === 0) {
        editorMarkdown.contentText.insert(0, initalMarkdown);
        editorStateText.setContent(initalMarkdown);
      }
    });

    // Add the new collaboration plugin to the CodeMirror editor
    extensions.push(yCollab(editorMarkdown.contentText, provider.awareness));

    // Set the provider to initalised
    providerInitalised.current = true;

    return () => {
      // Disconnect from the yJS provider on exit
      provider.disconnect();
    };
  }, [initalMarkdown, editorMarkdown, document.id, store, extensions, currentUser, jwtToken, editorStateText, tipTapApp]);

  const onChange = (markdown: string) => {
    // Update the state for the editor when the CodeMirror editor changes (Users type)
    editorStateText.setContent(markdown);
  };

  // Setup the navigation menu in the dropdown
  // Share to share the document
  // Save to save the document to the databae
  // Download to download the document into the local machine
  // GitSync to sync changes to a remote github repo
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
    <MenuItem key="help" action={() => router.push("/help")} actionLabel="Help" />,
    <MenuItem key="logout" action={() => signOut()} actionLabel="Logout" />,
  ];

  // Render the view
  // Add the navbar for the navigation
  // Use CodeMirror editor to sync changes and add highlighing
  // Display the preview panel with the rendered markdown in as HTML
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
