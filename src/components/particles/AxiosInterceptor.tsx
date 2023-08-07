import { Store } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import React from "react";
import setUpInterceptor from "../../services/axiosInterceptors";
import store from "../../store";

const AxiosInterceptor = ({ children, store }: AxiosInterceptorProps) => {
  React.useEffect(() => {
    setUpInterceptor(store);
  }, []);

  return children;
};

interface AxiosInterceptorProps {
  children: React.ReactElement | React.ReactNode;
  store: Store;
}

export default AxiosInterceptor;
