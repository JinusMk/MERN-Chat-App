import { Avatar, AvatarGroup, Box, Center, Text, Tooltip } from "@chakra-ui/react"
import useChatStore from "../store"
import useAuthStore from "../../auth/store"
import { useMemo } from "react"

function ProfileDock() {
      const { selectedChat } = useChatStore()
      const { user } = useAuthStore()
      
      const selectedUser = useMemo(() => selectedChat?.users[0]._id === user._id ? selectedChat?.users[1] : selectedChat?.users[0], [selectedChat, user])


      return <Box display="flex" width="320px" flexDirection="column" p="1rem" borderLeftColor="grey.800" borderLeftWidth="1px">
            <Text fontSize="xl" fontWeight="bold" marginBottom="2rem">{selectedChat?.isGroupChat ? `Group info`:`Profile`}</Text>
            <Center display="flex" flexDirection="column">
                  <AvatarGroup size='md' max={4}>
                        {
                              selectedChat?.isGroupChat ? selectedChat.users.map((user => <Tooltip hasArrow key={user._id} label={user.name}> 
                              <Box>
                                    <Avatar borderRadius="full" alt={user.name} src={user.pic} />
                              </Box>
                              </Tooltip>)): <Avatar marginBottom="1rem" borderRadius="full" alt={selectedUser.name} boxSize="150px" src={selectedUser.pic} />
                        }
                  </AvatarGroup>
                  {
                        selectedChat?.isGroupChat ? null : <>
                              <Text fontWeight="medium" fontSize="lg">{selectedUser.name}</Text>
                              <Text fontSize="lg">{selectedUser.email}</Text>     
                        </>
                  }
            </Center>
      </Box>
}

export default ProfileDock