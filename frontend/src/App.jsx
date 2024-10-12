import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import './App.css'
import { ALL_ROUTES } from "./routes/config";
import { Box } from "@chakra-ui/react";

const router = createBrowserRouter(ALL_ROUTES);

function App() {
  return (
    <Box minHeight="100vh" display="flex" background="grey.900">
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
