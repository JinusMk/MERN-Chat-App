import axios from 'axios';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware';

const useChatStore = create(
  devtools((set, get) => ({
    selectedChat: null,
    setSelectedChat: (chat) => set({ selectedChat: chat }),
    notification: [],
    setNotification: (notifications) => set({ notification: notifications }),
    chats: [],
    setChats: (chats) => set({ chats }),
    chatsLoading: false,
    isChatsStale: false,
    invalidateChats: () => set({ isChatsStale: true }),
    messages: [],
    messagesLoading: false,
    isMessagesStale: false,
    setMessages: (messages) => set({ messages }),
    invalidateMessages: () => set({ isMessagesStale: true }),
    sendMessageLoading: false,
    newMessage: '',
    setNewMessage: (newMessage) => set({ newMessage }),
    fetchMessages: async ({ headers, toast, chatId }) => {
      set({
        messagesLoading: true,
      })
       try {
        const config = {
          headers,
        };

        const { data } = await axios.get(`/api/message/${chatId}`, config);
        set({
          messages: data,
          isMessagesStale: false,
        })

      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Messages",
          variant: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }finally {
        set({
          messagesLoading: false,
        })
      }
    },
    fetchChats: async ({ headers, toast }) => {
      set({
        chatsLoading: true
      })
      try {
        const config = {
          headers,
        };

        const { data } = await axios.get("/api/chat", config);
        set({ chats: data, isChatsStale: false });
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the chats",
          variant: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      } finally {
        set({
          chatsLoading: false
        })
      }
    },
    sendMessage: async ({ headers, toast, body, socket }) => {
      set({
        sendMessageLoading: true,
      })
      try {
         const config = {
           headers: headers,
         };
         const { data } = await axios.post("/api/message", body, config );
         socket.emit("new message", data);
         set({
          newMessage: '',
          messages: [...get().messages, data]
         })
      }catch (err) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          variant: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }finally {
        set({
          sendMessageLoading: false
        })
      }
    }
  }), { name: 'MERN-CHAT-APP-chat-store' })
);

export default useChatStore;
