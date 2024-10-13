import { Avatar, Box, Text } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../../common/utils";
import useAuthStore from "../../../auth/store";
import useChatStore from "../../store";

const ScrollableChat = () => {
  const { messages } = useChatStore()
  const { user } = useAuthStore();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <Box display="flex" key={m._id} gap={1}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt={isSameUser(messages, m, i, user._id) ? '8px' : '12px'}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <Box
              bg={m.sender._id === user._id ? "grey.800" : "white"}
              style={{
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 8 : 12,
                borderRadius: m.sender._id !== user._id ? "0 16px 16px 16px": "16px 0 16px 16px",
                color: m.sender._id !== user._id ? "black": "black",
                padding: "8px 16px",
                maxWidth: "75%",
              }}
            >
              <Text fontSize="1rem">
                {m.content}
              </Text>
            </Box>
          </Box>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;