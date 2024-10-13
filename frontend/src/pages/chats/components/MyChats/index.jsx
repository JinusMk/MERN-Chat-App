import { AddIcon } from "@chakra-ui/icons";
import { Avatar, Box, Stack, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import ChatLoading from "../ChatLoading";
import { Button } from "@chakra-ui/react";
import GroupChatModal from "../GroupChatModel";
import { getSender } from "../../../../common/utils";
import useChatStore from "../../store";
import { useNavigate } from "react-router-dom";
import useAuthHeaders from "../../../../common/hooks/useAuthHeaders";
import useAuthStore from "../../../auth/store";

const MyChats = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { selectedChat, setSelectedChat, chats, fetchChats, isChatsStale, chatsLoading } = useChatStore();

  const toast = useToast();
  const headers = useAuthHeaders()
  
  const handleFetchConversations = useCallback(() => {
    fetchChats({ headers, toast })
  }, [headers, toast]);

  const handleSelectChat = (chatId) => {
    navigate(`/chat/${chatId}`)  
  }
  
  useEffect(() => {
    if(isChatsStale && !chatsLoading) {
      handleFetchConversations()
    }
  }, [isChatsStale, chatsLoading, handleFetchConversations])
  
  useEffect(() => {
    handleFetchConversations();
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      w={{ base: "100%", md: "380px" }}
      borderRightWidth="1px"
      borderRightColor="grey.800"
      bg="grey.900"
    >
      <Box
        p={4}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        borderBottomColor="grey.800"
        borderBottomWidth="1px"
      >
        <GroupChatModal>
          <Button
            colorScheme="orange"
            width='346px'
            display="flex"
            rightIcon={<AddIcon size="sm" />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        bg="#F8F8F8"
        w="100%"
        h="100%"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" gap={0}>
            {chats.map((chat) => (
              <Box
                onClick={() => {
                  setSelectedChat(chat)
                  handleSelectChat(chat._id)
                }}
                display="flex"
                alignItems="center"
                cursor="pointer"
                bg={selectedChat?._id === chat._id ? "white" : "grey.900"}
                borderLeftWidth={selectedChat?._id === chat._id ? "3px" : 0}
                borderLeftColor="orange.400"
                p={4}
                key={chat._id}
                minHeight="60px"
                borderBottomColor="grey.700"
                borderBottomWidth="1px"
                _hover={{
                  bg: "white"
                }}
              >
                <Avatar
                  mr={2}
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={user.pic}
                />
                <Box display="flex" flexDirection="column">
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(user, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;