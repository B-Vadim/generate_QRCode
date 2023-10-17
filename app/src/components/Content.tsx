import React, { FC, memo, useContext } from 'react';
import { Content } from 'antd/es/layout/layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import GeneratePage from 'src/pages/GeneratePage';
import LinksPage from 'src/pages/LinksPage';
import AuthPage from 'src/pages/AuthPage';
import AboutPage from 'src/pages/AboutPage';
import { AuthContext } from 'src/context/authContext';


const ContentApp: FC = () => {
   const { isAuthenticated } = useContext(AuthContext);

   return (
      <Content>
            <div className='container'>
            <Routes>
               {!isAuthenticated && <Route path='/auth' element={<AuthPage />} />}
               <Route path='/generate' element={<GeneratePage />} />
               <Route path='/links' element={<LinksPage />} />
               <Route path='/about' element={<AboutPage />} />
               <Route path='*' element={<Navigate replace to='/generate' />} />
            </Routes>
      </div>
         </Content>
   );
}

export default memo(ContentApp);