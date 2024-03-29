"use client";

import store from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const Providers = ({ children, session }) => {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>{children}</Provider>
      </SessionProvider>
    </>
  );
};

export default Providers;
