import { createContext, useCallback, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toast.css";

const ToastContext = createContext(null);
const DEFAULT_DURATION = 3800;

export const ToastProvider = ({ children }) => {
  const dismissToast = useCallback((id) => {
    if (id) {
      toast.dismiss(id);
    }
  }, []);

  const toastApi = {
    success: (msg, duration = DEFAULT_DURATION) =>
      toast.success(msg, {
        autoClose: duration,
        position: "top-right",
      }),
    error: (msg, duration = DEFAULT_DURATION) =>
      toast.error(msg, {
        autoClose: duration,
        position: "top-right",
      }),
    info: (msg, duration = DEFAULT_DURATION) =>
      toast.info(msg, {
        autoClose: duration,
        position: "top-right",
      }),
    warning: (msg, duration = DEFAULT_DURATION) =>
      toast.warning(msg, {
        autoClose: duration,
        position: "top-right",
      }),
    confirm: (
      msg,
      { onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" } = {},
    ) => {
      const id = toast.warn(
        <div className="toast-confirm-content">
          <p className="toast-message">{msg}</p>
          <div className="toast-actions">
            <button
              className="toast-action-btn toast-action-btn-secondary"
              onClick={() => {
                if (onCancel) onCancel();
                toast.dismiss(id);
              }}
            >
              {cancelText}
            </button>
            <button
              className="toast-action-btn toast-action-btn-primary"
              onClick={() => {
                if (onConfirm) onConfirm();
                toast.dismiss(id);
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false,
          position: "top-right",
        },
      );

      return id;
    },
    dismiss: dismissToast,
  };

  return (
    <ToastContext.Provider value={toastApi}>
      {children}
      <ToastContainer newestOnTop />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
};
