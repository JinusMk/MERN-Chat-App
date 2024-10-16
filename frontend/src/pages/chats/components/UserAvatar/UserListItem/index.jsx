import { Avatar } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";

const UserListItem = ({ handleFunction, user }) => {

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="grey.800"
      _hover={{
        background: "orange.400",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;