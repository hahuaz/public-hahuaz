import React, { createContext, useContext } from "react";
import { useImmer } from "use-immer";

import { ToastContainer } from "./ToastContainer";
import { Toast } from "./types";

type State = {
  toasts: Toast[];
};

type Action = {
  addToast: (props: Toast) => void;
  removeToast: (id: string) => void;
};

type IContext = (State & Action) | null;

const Context = createContext<IContext>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ toasts }, setToasts] = useImmer<State>({ toasts: [] });

  const addToast = (toast: Toast) => {
    setToasts((draft) => {
      draft.toasts.push(toast);
    });
  };

  const removeToast = (id: string) => {
    setToasts((draft) => {
      draft.toasts = draft.toasts.filter((toast) => toast.id !== id);
    });
  };

  console.log("toasts", toasts);

  return (
    <Context.Provider value={{ toasts, addToast, removeToast }}>
      <ToastContainer />
      {children}
    </Context.Provider>
  );
};

export const useToast = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useToast must be used within a ContextProvider");
  }

  return context;
};
