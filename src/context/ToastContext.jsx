'use client';
import { createContext, useContext, useState } from "react";
import ToastMessage from "../components/ui/toast-message"; 

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

  const [toast, setToast] = useState(null);

  const showToast = ({ message, type , duration = 5000 }) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <ToastMessage {...toast} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);