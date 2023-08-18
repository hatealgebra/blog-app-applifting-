import React from 'react';
import LoginForm from '../components/organisms/forms/LoginForm';

import FormPageTemplate from '../components/templates/FormPage.template';

const LoginPage = () => {
  return (
    <FormPageTemplate>
      <LoginForm />
    </FormPageTemplate>
  );
};

export default LoginPage;
