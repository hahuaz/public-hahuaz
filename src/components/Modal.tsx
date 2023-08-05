import { useEffect, ReactNode, useState } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleOverlayClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return mounted
    ? createPortal(
        <div
          className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-gray-800 p-6 rounded shadow-md">
            {children}
            <button
              className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-gray-300 focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>,
        document.getElementById("portal-root") as HTMLElement
      )
    : null;

  return;
};

export default Modal;
