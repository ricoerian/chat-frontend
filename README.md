# Chat App Frontend

This is the frontend of a real-time public chat application built using React, Vite, and TypeScript. It connects to a Go-based backend to facilitate seamless messaging between users.

## 🚀 Features
- 🌐 Real-time messaging with WebSockets
- 🎨 Modern UI with TailwindCSS and Ant Design
- 🔐 User authentication (Login/Register)
- 💬 Public chat rooms
- 🌓 Light/Dark mode support (coming soon)

## 🛠️ Tech Stack
- **Framework**: React (Vite)
- **Styling**: TailwindCSS
- **State Management**: React Context API and Zustand
- **Real-time Communication**: WebSockets
- **Backend API**: [Chat Backend (Go)](https://github.com/ricoerian/chat-backend)

## 📦 Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/ricoerian/chat-frontend.git
   cd chat-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the backend URL:
   ```sh
   VITE_API_URL=http://localhost:8080
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## 🏗️ Build and Deploy
To create a production build:
```sh
npm run build
```

## 🤝 Contributing
Pull requests are welcome! Feel free to submit issues or suggest improvements.

## 📄 License
This project is open-source under the [MIT License](LICENSE).
