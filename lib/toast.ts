import { toast } from "sonner";

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  info: (message: string) => toast.info(message),
  warning: (message: string) => toast.warning(message),
  loading: (message: string) => toast.loading(message),
};

// Convenience function for success messages with action
export const showSuccess = (message: string) => {
  showToast.success(message);
};

// Convenience function for error messages
export const showError = (message: string) => {
  showToast.error(message);
};

// Convenience function for warning messages
export const showWarning = (message: string) => {
  showToast.warning(message);
};

// Convenience function for info messages
export const showInfo = (message: string) => {
  showToast.info(message);
};
