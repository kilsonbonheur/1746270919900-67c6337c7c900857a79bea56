import React from "react";
import { Toaster } from "react-hot-toast";

function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#1e293b",
          color: "#fff",
          fontSize: "18px",
          fontWeight: 300,
          padding: "16px 24px",
          borderRadius: "8px",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}

export default ToastProvider;
