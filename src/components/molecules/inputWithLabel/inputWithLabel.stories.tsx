import React from 'react';

import InputWithLabel from './InputWithLabel';

export const InputWithLabelTypes = () => {
  const [name, setName] = React.useState('hello');
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <InputWithLabel
        label="Username"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputWithLabel
        label="Email"
        placeholder="me@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputWithLabel
        label="Password"
        placeholder="Enter your password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
    </div>
  );
};

export default {
  title: 'Molecules/Input with label',
  component: InputWithLabel,
};
