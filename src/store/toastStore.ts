import { create } from 'zustand';

interface ToastState {
  message: string;
  isVisible: boolean;
  showToast: (message: string) => void;
  hideToast: () => void;
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  isVisible: false,

  showToast: (message) => {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    set({ message, isVisible: true });

    toastTimer = setTimeout(() => {
      set({ isVisible: false });
      toastTimer = null;
    }, 2200);
  },

  hideToast: () => {
    if (toastTimer) {
      clearTimeout(toastTimer);
      toastTimer = null;
    }

    set({ isVisible: false });
  },
}));
