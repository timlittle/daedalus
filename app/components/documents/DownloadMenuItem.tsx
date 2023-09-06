"use client";
import useEditorText from "@/app/hooks/useEditorText";
import { BiSolidCloudDownload } from "react-icons/bi";
import { snakeCase } from "snake-case";
import MenuItem from "../navbar/MenuItem";

interface DocumentMenuItemProps {
  documentTitle: string;
}

const DocumentMenuItem: React.FC<DocumentMenuItemProps> = ({ documentTitle }) => {
  const editorStateText = useEditorText();

  const downloadFile = () => {
    const file = new Blob([editorStateText.content], { type: "text/markdown" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${snakeCase(documentTitle.toLowerCase())}.md`;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <MenuItem action={downloadFile} actionLabel="Download" icon={BiSolidCloudDownload} />;
};

export default DocumentMenuItem;
