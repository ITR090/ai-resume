'use client';
import { createContext, useContext, useRef, useState } from "react";
import ToastMessage from "../components/ui/toast-message";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = ({ message, type , duration = 5000 }) => {
    setToast({ message, type });

    // Reset the timer so an older toast's timeout doesn't hide a newer one.
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToast(null);
    }, duration);
  };

  const hideToast = () => {
    clearTimeout(timerRef.current);
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <ToastMessage {...toast} onClose={hideToast} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
