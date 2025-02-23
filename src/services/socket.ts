let socket: WebSocket | null = null;

export const connectWebSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log("WebSocket already connected");
    return socket;
  }

  const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
  const wsUrl = `${wsProtocol}://chat-backend-production-6900.up.railway.app/ws`;

  socket = new WebSocket(wsUrl);

  socket.onopen = () => console.log("WebSocket Connected");
  socket.onclose = () => console.log("WebSocket Disconnected");
  socket.onerror = (error) => console.log("WebSocket Error:", error);

  return socket;
};
