let socket: WebSocket | null = null;

export const connectWebSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log("WebSocket already connected");
    return socket;
  }

  socket = new WebSocket("ws://chat-backend-production-6900.up.railway.app/ws");

  socket.onopen = () => console.log("WebSocket Connected");
  socket.onclose = () => console.log("WebSocket Disconnected");
  socket.onerror = (error) => console.log("WebSocket Error:", error);

  return socket;
};
