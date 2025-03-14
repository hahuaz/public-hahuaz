import { useEffect } from "react";
import { Toast } from "./types";
import { useToast } from "./context";

export const ToastDetail = ({ title, type, children, id, duration }: Toast) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeToast(id);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, id, removeToast]);

  // Define styles based on toast type
  const typeStyles = {
    info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-50",
    success:
      "border-green-500 bg-green-50 text-green-900 dark:bg-green-900 dark:border-green-400 dark:text-green-50",
    error:
      "border-red-500 bg-red-50 text-red-900 dark:bg-red-900 dark:border-red-400 dark:text-red-50",
  };

  return (
    <div
      className={`flex items-center justify-between w-80 p-4 rounded-lg shadow-lg border-l-4 transition-opacity 
        duration-300 ease-in-out opacity-100 animate-fade-in hover:opacity-90 ${typeStyles[type]}`}
    >
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {children && <div className="mt-2 text-sm">{children}</div>}
      </div>

      <button
        onClick={() => removeToast(id)}
        className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
      >
        ✖
      </button>
    </div>
  );
};
