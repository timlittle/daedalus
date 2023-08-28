
'use client';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

interface PreviewProps {
    markdown: String
}

export default function Preview({markdown}: PreviewProps) {
    
    const md = require('markdown-it')(
        {
            highlight: function (code: string, lang: string) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, {language}).value;
            }
        }
    );

    const parsed = md.render(markdown);

    return (
    <div className='bg-gray-4 relative'>
        <div className='absolute top-0 right-0 text-xs'>Preview</div>
        <div className="prose prose-invert p-10" dangerouslySetInnerHTML={{__html: parsed}}></div>
    </div>
    );
}