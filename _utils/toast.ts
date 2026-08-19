export const ToastPromise = () =>
  new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 2000));
