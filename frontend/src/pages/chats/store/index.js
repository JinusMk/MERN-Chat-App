import { create } from 'zustand'
import { devtools } from 'zustand/middleware';

const useChatStore = create(
  devtools((set) => ({
    selectedChat: null,
    setSelectedChat: (chat) => set({ selectedChat: chat }),
    notification: [],
    setNotification: (notifications) => set({ notification: notifications }),
    chats: [],
    setChats: (chats) => set({ chats }),
  }), { name: 'MERN-CHAT-APP-chat-store' })
);

export default useChatStore;
