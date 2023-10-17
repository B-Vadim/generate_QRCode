import React, { FC } from 'react';
import { Layout } from "antd";
import HeaderApp from "./Header";
import ContentApp from "./Content";
import FooterApp from "./Footer";


const LayoutApp: FC = () => {
   return (
      <Layout id='LayoutWrapperApp'>
         <HeaderApp />
         <ContentApp />
         <FooterApp />
      </Layout>
   )
};

export default LayoutApp;