import React, { useState } from "react";

interface CreateChatModalProps {
  users: { ID: number; Username: string }[];
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (receiverId: number, chatName: string) => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ users, isOpen, onClose, onCreateChat }) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [chatName, setChatName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80">
      <div className="bg-blue-400 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Buat Chat Baru</h2>
        <input
          type="text"
          className="bg-white text-black border rounded-lg p-2 flex-1 w-full mb-2"
          placeholder="Nama Chat Room"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
        <select
          className="bg-white text-black border rounded-lg p-2 flex-1 w-full"
          onChange={(e) => setSelectedUser(Number(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>
            Pilih user untuk chat
          </option>
          {users?.length > 0 ? (
            users.map((user) => (
              <option key={user.ID} value={user.ID}>
                {user.Username}
              </option>
            ))
          ) : (
            <option disabled>Loading users...</option>
          )}
        </select>
        <div className="mt-4 flex justify-end">
          <button className="mr-2 bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>
            Batal
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
            onClick={() => selectedUser && onCreateChat(selectedUser, chatName)}
            disabled={!selectedUser || !chatName}
          >
            Buat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;