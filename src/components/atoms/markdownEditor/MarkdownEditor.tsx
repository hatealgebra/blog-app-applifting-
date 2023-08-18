import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  if (typeof window !== 'undefined') {
    return (
      <SimpleMDE
        value={value}
        onChange={onChange}
        placeholder="Supports markdown. Yay!"
      />
    );
  }
  return <></>;
};

interface MarkdownEditorProps {
  value: string;
  onChange: React.Dispatch<string>;
}

export default MarkdownEditor;
