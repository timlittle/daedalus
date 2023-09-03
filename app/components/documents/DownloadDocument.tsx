import useEditorText from "@/app/hooks/useEditorText";
import { snakeCase } from 'snake-case';

interface DownloadDocumentProps {
    documentTitle: string;
}

const DownloadDocument: React.FC<DownloadDocumentProps> = ({
    documentTitle
}) => {

    const editorStateText = useEditorText();

    const downloadFile = ()=>{
        const file = new Blob([editorStateText.content], {type: "text/markdown"});
        const url = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url
        link.download = `${snakeCase(documentTitle.toLowerCase())}.md`
        link.style.visibility = 'hidden'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
    }


    return (
        <div className="btn btn-outline-primary" onClick={downloadFile}>Download</div>
    );
}
 
export default DownloadDocument;