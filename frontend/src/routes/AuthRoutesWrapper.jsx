import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../pages/auth/store';
import { useEffect } from 'react';

const AuthRoutesWrapper = () => {
  const { isLoggedIn, setIsLoggedIn, setUser} = useAuthStore()

   useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(userInfo) {
        setIsLoggedIn(true)
        setUser(userInfo)
      }
    }catch(err) {
      console.log('err', err)
    }
  }, [setUser, setIsLoggedIn, localStorage.getItem('userInfo')])
  
  if (isLoggedIn) {
    return <Navigate to="/chat" replace />;
  }

  return <Outlet />;
};

export default AuthRoutesWrapper;
