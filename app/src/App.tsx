import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useAuth } from './hooks/useAuth';
import { AuthContext, AuthContextType } from './context/authContext';
import LayoutApp from './components/Layout';


const antdConfigure = {
  colorPrimary: '#00b96b'
}

const App: FC = () => {
  const { login, logout, token, userId, isInit } = useAuth();
  const isAuthenticated = !!token;
  
  if (!isInit) {
    return (<></>)
  };

  return (
    <ConfigProvider theme={{ token: antdConfigure }}>
      <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated} as AuthContextType}>
        <BrowserRouter>
          <LayoutApp />
        </BrowserRouter>
      </AuthContext.Provider>
    </ConfigProvider>
  );
}

export default App;
