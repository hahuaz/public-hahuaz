import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";

import { useImmer } from "use-immer";

import { DialogDetail } from "./DialogDetail";

type State = {
  isOpen: boolean;
  content: React.ReactNode;
};

type Action = {
  openDialog: (payload: { content: React.ReactNode }) => void;
  closeDialog: () => void;
};

type IContext = (State & Action) | null;

const Context = createContext<IContext>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ isOpen, content }, setState] = useImmer<State>({
    isOpen: false,
    content: null,
  });

  const openDialog: Action["openDialog"] = ({ content }) => {
    setState((draft) => {
      draft.isOpen = true;
      draft.content = content;
    });
  };

  // memoize `closeDialog` to prevent re-renders
  const closeDialog = useCallback(() => {
    setState((draft) => {
      draft.isOpen = false;
    });
  }, [setState]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleEscape = (event: KeyboardEvent) =>
        event.key === "Escape" && closeDialog();

      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, closeDialog]);

  return (
    <Context.Provider value={{ openDialog, closeDialog, isOpen, content }}>
      {children}
      <DialogDetail />
    </Context.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useDialog must be used within a ContextProvider");
  }

  return context;
};
