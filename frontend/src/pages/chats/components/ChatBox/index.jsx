import { Box } from "@chakra-ui/react";
import "../styles.css";
import SingleChat from "../SingleChat";
import useChatStore from "../../store";

const Chatbox = () => {
  const { selectedChat } = useChatStore();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      flex={1}
      bg="grey.900"
    >
      <SingleChat />
    </Box>
  );
};

export default Chatbox;