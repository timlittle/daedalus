"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  // A provider for displaying toasts to the page
  // Used to give feedback to the customer on the stage of calls to the api
  return (
    <Toaster
      data-cy="toaster"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
  );
};

export default ToasterProvider;
