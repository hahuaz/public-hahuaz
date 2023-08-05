// pages/index.tsx

import { useState } from "react";

import { useToast } from "@/context/ToastContext";

import Modal from "../components/Modal";

export default function Home() {
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4">My Next.js App</h1>
        <div className="flex flex-col gap-6 divide-y-2 ">
          <div>
            <h2>Modal Component</h2>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={openModal}
            >
              Open Modal
            </button>
            {isModalOpen && (
              <Modal onClose={closeModal}>
                <div className="max-w-sm">
                  <p>I am arbitrary modal content!</p>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quo excepturi, maiores obcaecati, quasi neque dolorem alias
                    accusantium repellendus nesciunt tempore cupiditate
                    molestias quae? Assumenda earum, enim deserunt delectus
                    quaerat quas.
                  </p>
                </div>
              </Modal>
            )}
          </div>
          <div className="pt-6">
            <h2>Toast Component</h2>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={() =>
                showToast({
                  message: "hello toast!",
                  duration: 2000,
                  type: "error",
                })
              }
            >
              Show Toast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
