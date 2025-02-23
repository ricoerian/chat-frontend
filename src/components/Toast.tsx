import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`px-4 py-3 rounded-lg shadow-lg text-white flex items-center gap-2 transition-all duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-400"
      }`}
    >
      {type === "success" ? "✅" : "❌"} {message}
    </div>
  );
};

export default Toast;