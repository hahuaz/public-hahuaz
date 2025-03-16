import React from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonWithLoadingProps {
  isLoading: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const LoadingButton = ({
  isLoading,
  onClick,
  children,
}: ButtonWithLoadingProps) => {
  return (
    <button
      className={`relative h-[50px] w-[120px] overflow-hidden rounded-md bg-purple-600 px-6 py-3 text-white  ${
        isLoading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <FaSpinner className="absolute inset-0 m-auto animate-spin text-2xl " />
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
