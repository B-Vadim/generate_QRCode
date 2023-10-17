import React, { FC, memo } from 'react';
import { Footer } from 'antd/es/layout/layout';

const FooterApp: FC = () => {
   return (
      <Footer>
         <span>Generate QR Code 2023<sup>&#169;</sup></span>
      </Footer>
   )
}

export default memo(FooterApp);