"use client";
import useEditorText from "@/app/hooks/useEditorText";
import { BiSolidCloudDownload } from "react-icons/bi";
import { snakeCase } from "snake-case";
import MenuItem from "../navbar/MenuItem";

interface DocumentMenuItemProps {
  documentTitle: string;
}

const DocumentMenuItem: React.FC<DocumentMenuItemProps> = ({ documentTitle }) => {
  // Component for downloading a document into a markdown file

  // Fetch the state of the editor from the custom hook
  const editorStateText = useEditorText();

  // Function to download the file
  const downloadFile = () => {
    // Create a blog of the markdown in the editor
    const file = new Blob([editorStateText.content], { type: "text/markdown" });
    // Create a URL from the blob
    const url = URL.createObjectURL(file);
    // Create a link element in DOM
    const link = document.createElement("a");
    // Set the URL and the filename
    link.href = url;
    link.download = `${snakeCase(documentTitle.toLowerCase())}.md`;
    link.style.visibility = "hidden";
    // Add the link to the DOM
    document.body.appendChild(link);
    // Click the link
    link.click();
    // Remove the link
    document.body.removeChild(link);
  };

  // Render the menuitm with the download function
  return <MenuItem action={downloadFile} actionLabel="Download" icon={BiSolidCloudDownload} />;
};

export default DocumentMenuItem;
