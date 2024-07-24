"use client"
import React, { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const Modal = ({ children, className = "sm:max-w-4xl sm:w-full" }) => {
    return (
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"
          }`}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hiddens shadow-xl transform transition-all sm:my-8 sm:align-middle ${className}`}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  return { isOpen, openModal, closeModal, Modal };
}

export default useModal;
