import { createPortal } from "react-dom";

import { useDialog } from "./context";

export const DialogDetail = () => {
  const { closeDialog, isOpen, content } = useDialog();

  return isOpen
    ? createPortal(
        <div
          className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeDialog}
        >
          <div
            className="rounded bg-gray-800 p-6 shadow-md min-w-[300px] max-w-[600px]"
            onClick={(event) => event.stopPropagation()}
          >
            {content}
            <button
              className="mt-4 rounded bg-red-500 px-4 py-2 hover:bg-gray-300 focus:outline-none"
              onClick={closeDialog}
            >
              Close
            </button>
          </div>
        </div>,
        document.body
      )
    : null;
};
