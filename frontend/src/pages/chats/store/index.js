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
    groupChatName: '',
    groupChatSearch: '',
    selectedUsers: [],
    groupSearchLoading: false,
    groupSearchResult: [],
    createGroupLoading: false,
    searchLoading: false,
    searchQuery: '',
    searchResult: [],
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    setGroupChatName: (groupChatName) => set({ groupChatName }),
    setSelectedUsers: (selectedUsers) => set({ selectedUsers }),
    setGroupChatSearch: (groupChatSearch) => set({ groupChatSearch }),
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
    fetchUsers: async ({ headers, toast, type }) => {
      const loaderKey = type === "search" ? "searchLoading" : "groupSearchLoading"
      const searchKey = type === "search" ? "searchQuery" : "groupChatSearch"
      const dataKey = type === "search" ? "searchResult" : "groupSearchResult"
      
      set({
        [loaderKey]: true
      })
      try {
        const config = {
          headers,
        };

        const { data } = await axios.get(`/api/user?search=${get()?.[searchKey]}`, config);
        set({ [dataKey]: data });
        
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          variant: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } finally {
        set({
          [loaderKey]: false
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
    },
    createGroup: async ({ headers, toast, body }) => {
      set({
        createGroupLoading: true,
      })
      try {
         const config = {
           headers: headers,
         };
         const { data } = await axios.post("/api/chat/group", body, config );
         set({
          chats: [data, ...get().chats],
          groupChatName: '',
          selectedUsers: []
         })
         toast({
          title: "New Group Chat Created!",
          variant: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }catch (err) {
        toast({
          title: "Error Occured!",
          description: "Failed to create the Group",
          variant: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }finally {
        set({
          createGroupLoading: false
        })
      }
    }
  }), { name: 'MERN-CHAT-APP-chat-store' })
);

export default useChatStore;
