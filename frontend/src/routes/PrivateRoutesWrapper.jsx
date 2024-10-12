import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../pages/auth/store';
import { useEffect } from 'react';

const PrivateRoutesWrapper = () => {
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
  

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutesWrapper;
