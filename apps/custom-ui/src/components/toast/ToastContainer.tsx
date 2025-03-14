import { createPortal } from "react-dom";
import { useToast } from "./context";
import { ToastDetail } from "./ToastDetail";

export const ToastContainer = () => {
  const { toasts } = useToast();

  return createPortal(
    <div className="fixed top-5 right-5 z-50 space-y-3">
      {toasts.map((toast) => (
        <ToastDetail
          key={toast.id}
          id={toast.id}
          title={toast.title}
          type={toast.type}
          children={toast.children}
          duration={toast.duration}
        />
      ))}
    </div>,
    document.body
  );
};
