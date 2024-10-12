import useLocalStorage from './useLocalStorage';

const useAuthHeaders = () => {
  const [userInfo] = useLocalStorage('userInfo', null);

  return userInfo ? {
        "Authorization": `Bearer ${userInfo.token}`,
      }: {};
};

export default useAuthHeaders;
