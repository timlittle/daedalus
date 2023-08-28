
import CodeMirror from '@uiw/react-codemirror';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data'
import { useCallback } from 'react';
import { githubDark } from '@uiw/codemirror-theme-github';


interface EditorProps {
    content: string;
    setMarkdown: (markdown: string) => void;
}

export default function Editor({content, setMarkdown}: EditorProps) {

    const onChange = useCallback((value: string, viewUpdate: any) => {
        console.log('value:', value);
        setMarkdown(value);
      }, [setMarkdown]);

    return (
        <div className="border-r-2 border-gray-5">
            <CodeMirror 
                value={content}
                extensions={[
                    markdown({base: markdownLanguage, codeLanguages: languages})
                ]}
                theme={githubDark}
                onChange={onChange}
            />
        </div>
    );
}