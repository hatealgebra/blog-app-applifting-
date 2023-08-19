import React from 'react';
import MarkdownEditor from './MarkdownEditor';

export const MarkDownEditorExample = () => {
  const [value, setValue] = React.useState('');

  return (
    <MarkdownEditor value={value} onChange={(newValue) => setValue(newValue)} />
  );
};

export default {
  title: 'Atoms/MarkdownEditor',
  component: MarkdownEditor,
};
