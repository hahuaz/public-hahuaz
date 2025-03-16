import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type ToastProps = {
  message: string;
  duration: number;
  type: string;
  onClose: () => void;
};

const Toast = ({ message, duration, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  let bgColor = "";
  switch (type) {
    case "info":
      bgColor = "bg-blue-500";
      break;
    case "success":
      bgColor = "bg-green-500";
      break;
    case "error":
      bgColor = "bg-red-500";
      break;
    default:
      bgColor = "bg-gray-800";
  }

  return createPortal(
    <div className="toast-overlay fixed bottom-4 left-4">
      <div className={`p-4 rounded shadow-md text-white ${bgColor}`}>
        {message}
      </div>
    </div>,
    document.body
  );
};

export default Toast;
