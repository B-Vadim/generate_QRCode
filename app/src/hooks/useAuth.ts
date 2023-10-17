import { useCallback, useEffect, useState } from "react"
import { U_TOKET } from "src/constants";

type LocalStorageAuth = {
   userId: string,
   token: string
};

export const useAuth = () => {
   const [token, setToken] = useState<string | null>(null);
   const [userId, setUserId] = useState<string | null>(null);
   const [isInit, setIsInit] = useState<boolean>(false);

   const login = useCallback((jwtToken: string, id: string) => {
      setToken(jwtToken);
      setUserId(id);
      localStorage.setItem(U_TOKET, JSON.stringify({userId: id, token: jwtToken}));
   }, []);
   
   const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      localStorage.removeItem(U_TOKET);
   }, []);

   useEffect(() => {
      const data: LocalStorageAuth = JSON.parse(localStorage.getItem(U_TOKET));
      if (data && data?.token) {
         login(data?.token, data?.userId);
      };
      !isInit && setIsInit(true);
   }, [login]);

   return {login, logout, token, userId, isInit};
};