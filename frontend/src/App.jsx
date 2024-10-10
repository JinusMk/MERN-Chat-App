import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Chats from "./pages/chats";
import './App.css'
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";

const router = createBrowserRouter([
  {
    path: "/chats",
    element: (
      <Chats />
    ),
    children: [{
      path: ":id",
      element: <div>This is Chat screen</div>,
      errorElement: <div>Oops! There was an error.</div>,
    },
   ]
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
