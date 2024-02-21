import React, { JSX } from 'react';
import './TextEditor.scss';
import cn from 'classnames';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface TextEditorProps {
    initData: string;
    onChange: (value: string) => void;
}

export function TextEditor({ initData, onChange }: TextEditorProps): JSX.Element {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={initData}
            onChange={(e, editor) => onChange(editor.getData())}
        />
    );
}