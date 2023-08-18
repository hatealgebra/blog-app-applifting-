import { Store } from '@reduxjs/toolkit';
import React from 'react';
import setUpInterceptor from '../../services/axiosInterceptors';

interface AxiosInterceptorProps {
  children: React.ReactElement | React.ReactNode;
  store: Store;
}

const AxiosInterceptor = ({ children, store }: AxiosInterceptorProps) => {
  React.useEffect(() => {
    setUpInterceptor(store);
  }, [store]);

  return children;
};

export default AxiosInterceptor;
