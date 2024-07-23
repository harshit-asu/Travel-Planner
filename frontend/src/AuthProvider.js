import { createContext, useContext, useEffect, useState } from 'react';
import { isLoggedIn } from './services/api';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  userId: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const isAuth = async () => {
      try {
        const response = await isLoggedIn();
        if(response){
            setUserId(response.data.user_id);
            setAuth(true);
        }  
        else{
            setAuth(false);
        }
      } catch(error) {
        setUserId(null);
      };
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;