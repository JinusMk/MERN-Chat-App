import { AvatarBadge, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/react";
import ProfileModal from "../ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import UserListItem from "../userAvatar/UserListItem";
import useAuthStore from "../../../auth/store";
import useChatStore from "../../store";
import { getSender } from "../../../../common/utils";
import useAuthHeaders from "../../../../common/hooks/useAuthHeaders";

function SideDrawer() {
  const [loadingChat, setLoadingChat] = useState(false);
  const { user } = useAuthStore();
  const {
    searchLoading,
    fetchUsers,
    setSelectedChat,
    notification,
    setNotification,
    chats,
    setChats,
    searchResult,
    searchQuery,
    setSearchQuery
  } = useChatStore()
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuthStore()
  const navigate = useNavigate();
  const headers = useAuthHeaders()
  
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    logout();
    navigate("/");
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      toast({
        title: "Please Enter something in search",
        variant: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    fetchUsers({ headers, toast, type : "search" })
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        variant: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        bg="grey.900"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        p="10px"
        borderBottomWidth="1px"
        borderBottomColor="grey.800"
      >
        <Text fontSize="2xl">
          Talk-A-Tive
        </Text>
        <Box display="flex" gap={3}>
          <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
            <Button width="220px" borderColor="grey.400" variant="outline" onClick={onOpen} leftIcon={<SearchIcon />}>Search User</Button>
          </Tooltip>
          <div>
            <Menu>
              <MenuButton p={1}>
                <NotificationBadge
                  count={notification.length}
                  effect={Effect.SCALE}
                />
                <BellIcon fontSize="2xl" m={1} color="grey.400" />
              </MenuButton>
              <MenuList pl={2}>
                {!notification.length && "No New Messages"}
                {notification.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    onClick={() => {
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n) => n !== notif));
                    }}
                  >
                    {notif.chat.isGroupChat
                      ? `New Message in ${notif.chat.chatName}`
                      : `New Message from ${getSender(user, notif.chat.users)}`}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton _active={{bg: "grey.800"}} _hover={{bg: "grey.800"}} bg="grey.900" as={Button} rightIcon={<ChevronDownIcon color="grey.400" />}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                  >
                    <AvatarBadge boxSize='1em' bg='green.500' />
                  </Avatar>
                  <Text textTransform="capitalize">{user.name}</Text>
                </Box>
              </MenuButton>
              <MenuList>
                <ProfileModal user={user}>
                  <MenuItem bg="white" _hover={{bg: "grey.800"}}>My Profile</MenuItem>{" "}
                </ProfileModal>
                <MenuDivider background="grey.800" />
                <MenuItem _active={{ bg: "grey.800" }} _hover={{bg: "grey.800"}} onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Box>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" borderBottomColor="grey.800" fontSize="1.5rem">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                focusBorderColor="orange.400"
                placeholder="Search by name or email"
                mr={2}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button colorScheme="orange" onClick={handleSearch}>Go</Button>
            </Box>
            {searchLoading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;