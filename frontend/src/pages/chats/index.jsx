import { Box } from "@chakra-ui/react";

import SideDrawer from "./components/SideDrawer";
import MyChats from "./components/MyChats";
import { Outlet } from "react-router-dom";

const Chatpage = () => {
  return (
    <div style={{ width: "100%" }}>
      <SideDrawer />
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh">
        <MyChats />
        <Outlet />
      </Box>
    </div>
  );
};

export default Chatpage;