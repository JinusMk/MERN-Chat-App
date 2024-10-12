import React from 'react'

// Lazy load the components
const PrivateRoutesWrapper = React.lazy(() => import("./PrivateRoutesWrapper"));
const AuthRoutesWrapper = React.lazy(() => import("./AuthRoutesWrapper"));
const Chats = React.lazy(() => import("../pages/chats"));
const ChatWindow = React.lazy(() => import("../pages/chats/ChatWindow"));
const Login = React.lazy(() => import("../pages/auth/login"));
const SignUp = React.lazy(() => import("../pages/auth/signup"));
const AllRoutesWrapper = React.lazy(() => import("./AllRoutesWrapper"));

const ALL_ROUTES = [];

const PRIVATE_ROUTES = {
  name: 'Private Routes Wrapper',
  path: '/',
  element: <PrivateRoutesWrapper />,
  children: [
    { path: '/chat', 
      element: <Chats />, 
      name: 'CHAT_PAGE', 
      children: [
        { path: ':id', element: <ChatWindow />, name: 'CHAT_DETAILS_PAGE' }
      ] 
    },
  ]
}

const AUTH_ROUTES = {
      name: 'Auth Routes Wrapper',
      element: <AuthRoutesWrapper />,
      children: [
            {
                  path: '/login',
                  element: <Login />,
            },
            {
                  path: '/signup',
                  element: <SignUp />,
            },
      ]
}


const NO_MATCH_ROUTE = {
  name: '404 - Page Not Found',
  path: '*',
  element: <div>Page not found</div>,
};


ALL_ROUTES.push({
  name: 'All Routes Wrapper',
  element: <AllRoutesWrapper />,
  errorElement: <div>ALL ROUTES ERROR</div>,
  children: [PRIVATE_ROUTES, AUTH_ROUTES, NO_MATCH_ROUTE],
});

export { ALL_ROUTES };