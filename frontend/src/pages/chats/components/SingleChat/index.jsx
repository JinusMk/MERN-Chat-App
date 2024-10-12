import { FormControl, Input, Box, Text, IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "../ProfileModal";
import ScrollableChat from "../ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../../../../common/animations/typing.json";
import io from "socket.io-client";
import UpdateGroupChatModal from "../UpdateGroupChatModal";
import useChatStore from "../../store";
import useAuthStore from "../../../auth/store";
import { getSender, getSenderFull } from "../../../../common/utils";
import "../styles.css";
import { useNavigate, useParams } from "react-router-dom";
import useAuthHeaders from "../../../../common/hooks/useAuthHeaders";

const ENDPOINT = "http://localhost:8000"; // Move to .env file in real-world applications

const SingleChat = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { id: chatId } = useParams()
  const socket = useRef(); // Using useRef for socket connection
  const lastSelectedChat = useRef(); // Using useRef for selected chat comparison
  const headers = useAuthHeaders()
  const navigate = useNavigate()
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { messages, setMessages, invalidateChats, fetchMessages, setNewMessage, newMessage, sendMessage, selectedChat, setSelectedChat, notification, setNotification, messagesLoading, isMessagesStale } = useChatStore();
  const { user } = useAuthStore();

  const handleSendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.current.emit("stop typing", chatId);
      sendMessage({
        headers,
        toast,
        body: { content: newMessage, chatId },
        socket: socket.current
      })
    }
  };

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("setup", user);
    socket.current.on("connected", () => setSocketConnected(true));
    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stop typing", () => setIsTyping(false));

    return () => socket.current.disconnect(); // Clean up the socket on component unmount
  }, [user]);

  const handleFetchMessages = useCallback(() => {
    if (!chatId) return;
    fetchMessages({ headers, toast, chatId})
  }, [chatId, headers, toast])
  
  useEffect(() => {
    if(isMessagesStale && !messagesLoading) {
      handleFetchMessages()
    }
  }, [isMessagesStale, messagesLoading, handleFetchMessages])
  
  useEffect(() => {
    handleFetchMessages();
    lastSelectedChat.current = selectedChat._id;
    
    if(socket.current) {
      socket.current.emit("join chat", chatId);
    }
  }, [selectedChat, chatId]);

  useEffect(() => {
    const handleMessageReceived = (newMessageReceived) => {
      if (
        !lastSelectedChat.current || // if chat is not selected or doesn't match current chat
        lastSelectedChat.current !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          invalidateChats()
        }
      } else {
        invalidateChats()
        setMessages([...messages, newMessageReceived]);
      }
    };

    socket.current.on("message received", handleMessageReceived);

    return () => socket.current.off("message received", handleMessageReceived);
  }, [notification, messages, setNotification]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socket.current || !socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.current.emit("typing", chatId);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.current.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleNavigateBack = () => {
    setSelectedChat(null)
    navigate('/chat')
  }
  return (
    <>
      {chatId ? (
        <>
          <Box display="flex" bg="grey.900" justifyContent="space-between" fontSize={{ base: "28px", md: "30px" }} pb={3} px={2} w="100%" fontFamily="Work sans">
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={handleNavigateBack}
            />
            {messages && (!selectedChat?.isGroupChat ? (
              <>
                {getSender(user, selectedChat?.users)}
                <ProfileModal user={getSenderFull(user, selectedChat?.users)} />
              </>
            ) : (
              <>
                {selectedChat?.chatName?.toUpperCase()}
                <UpdateGroupChatModal />
              </>
            ))}
          </Box>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="grey.900"
            w="100%"
            h="100%"
            borderRadius="lg"
            
            overflowY="hidden"
          >
            {messagesLoading ? (
              <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={handleSendMessage} isRequired mt={3}>
              {istyping && (
                <div>
                  <Lottie options={defaultOptions} width={70} style={{ marginBottom: 15, marginLeft: 0 }} />
                </div>
              )}
              <Input
                variant="filled"
                focusBorderColor="orange.400"
                bg="white"
                size="lg"
                placeholder="Enter a message..."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
