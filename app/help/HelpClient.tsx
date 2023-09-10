"use client";

import hljs from "highlight.js";
import React from "react";
// @ts-ignore
import markdownItMermaid from "@md-reader/markdown-it-mermaid";
// @ts-ignore
import markdownItTextualUml from "markdown-it-textual-uml";

interface HelpClientProps {
  content: String;
}

const HelpClient: React.FC<HelpClientProps> = ({ content }) => {
  // View component for displaying the help page using content stored within a markdown file

  // Setup the markdown renderer, using the same setting as the editor component
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

  // Render the markdown as HTML
  const parsedMarkdown = md.render(content);

  // Render the content HTML onto the page
  return (
    <div className="flex flex-col flex-grow max-prose">
      <div
        className="prose prose-invert p-10 leading-6 max-w-full prose-code:leading-6 prose-h1:text-center"
        dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
      ></div>
    </div>
  );
};

export default HelpClient;
