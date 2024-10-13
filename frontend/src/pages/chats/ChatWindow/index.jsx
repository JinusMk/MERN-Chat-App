import { Box } from "@chakra-ui/react"
import Chatbox from "../components/ChatBox"
import ProfileDock from "../ProfileDock"

const ChatWindow = () => {
      return <Box display="flex" flex={1}>
            <Chatbox />
            <ProfileDock />
      </Box>
}

export default ChatWindow