import { CloseIcon } from "@chakra-ui/icons";
import { Badge, Text } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="0.5rem"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="orange"
      cursor="pointer"
      onClick={handleFunction}
      alignItems="center"
      display="flex"
    >
      
      <Text fontWeight="semiBold" textTransform="Capitalize">{user.name}</Text>
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;