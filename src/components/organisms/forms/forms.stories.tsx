import React from 'react';

import action from '@storybook/addon-actions';
import LoginForm from './LoginForm';

export const LoginFormExample = () => <LoginForm />;

export default {
  title: 'Organisms/Forms',
  subcomponent: { LoginForm },
};
