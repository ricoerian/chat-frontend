import { useEffect, useRef, useState } from "react";
import { connectWebSocket } from "../services/socket";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Chat = () => {
  const [messages, setMessages] = useState<
    { sender_id: number; sender?: string; content: string; created_at: string }[]
  >([]);
  const [message, setMessage] = useState("");
  const socket = connectWebSocket();
  const token = useAuthStore((state) => state.token);
  const user_id = Number(useAuthStore((state) => state.idUser));
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/messages")
      .then((response) => {
        setMessages(response.data.messages || []);
      })
      .catch((error) => {
        console.error("Gagal memuat pesan:", error);
        setMessages([]);
      });
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, receivedMessage]);
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
      socket.close();
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    useAuthStore.getState().setToken("");
    useAuthStore.getState().setIdUser("");
    useAuthStore.getState().setUsername("");
    localStorage.clear();
    socket.close();
    navigate("/");
  };

  const sendMessage = () => {
    if (message.trim() && socket.readyState === WebSocket.OPEN) {
      const messageData = {
        sender_id: user_id,
        content: message,
      };
      socket.send(JSON.stringify(messageData));
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Chat Room</h2>
          <button
            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 h-[35rem] overflow-y-auto bg-gray-50">
          {(messages || []).map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender_id === user_id ? "justify-end" : "justify-start"} mb-4 relative`}
            >
              <div className="flex items-end gap-2">
                {msg.sender_id !== user_id && (
                  <div className="w-10 h-10 bg-gray-500 flex items-center justify-center rounded-full text-white text-lg font-bold">
                    {msg.sender?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
                <div
                  className={`relative p-4 rounded-2xl max-w-3xs sm:max-w-md md:max-w-lg xl:max-w-2xl break-words whitespace-pre-wrap shadow-md ${
                    msg.sender_id === user_id ? "bg-blue-500 text-white" : "bg-white text-gray-900"
                  }`}
                >
                  <strong className="block text-sm">{msg.sender || "Unknown"}</strong>
                  <p className="text-base">{msg.content}</p>
                  <span className="block text-xs mt-2">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
                </div>
                {msg.sender_id === user_id && (
                  <div className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full text-white text-lg font-bold">
                    {msg.sender?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-4 flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && message.trim() && sendMessage()}
          />
          <button
            className={`px-4 py-2 rounded-lg text-white transition ${message.trim() ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
            onClick={sendMessage}
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;