import React, { createContext, useContext, ReactNode, useState } from "react";

import Toast from "@/components/Toast";

type showToastProps = {
  message: string;
  duration: number;
  type: "info" | "success" | "error";
};

type ToastContextType = {
  showToast: (props: showToastProps) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<showToastProps | null>(null);

  const showToast = (payload: showToastProps) => {
    setToast(payload);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          duration={toast.duration}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
