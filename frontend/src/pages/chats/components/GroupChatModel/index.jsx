import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";

import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import useChatStore from "../../store";
import useDebounce from "../../../../common/hooks/useDebounce";
import useAuthHeaders from "../../../../common/hooks/useAuthHeaders";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const headers = useAuthHeaders()
  const toast = useToast();

  const { createGroupLoading, createGroup, setGroupChatName, groupSearchLoading, fetchUsers, groupSearchResult, setSelectedUsers, setGroupChatSearch, chats, setChats, groupChatName, groupChatSearch, selectedUsers } = useChatStore();

  const handleAddUser = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        variant: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const debouncedFetch = useDebounce(fetchUsers, 600)
  
  const handleSearch = async (query) => {
    setGroupChatSearch(query);
    debouncedFetch({ headers, toast })
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        variant: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    await createGroup({
      headers,
      toast,
      body: {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
      }
    })
    onClose()
  }
  
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="1.5rem"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                focusBorderColor="orange.400"
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                focusBorderColor="orange.400"
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box width="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {groupSearchLoading ? (
              <div>Loading...</div>
            ) : (
              groupSearchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button isLoading={createGroupLoading} disabled={createGroupLoading} colorScheme="orange" onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;