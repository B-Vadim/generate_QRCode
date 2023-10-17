import { message } from 'antd';
import { useCallback } from 'react';


export const useMessage = () => {
   const messagePopupError = useCallback((text: string) => {
         message.error(text);
   }, []);
   
   const messagePopupSuccess = useCallback((text: string) => {
         message.success(text);
   }, []);
   return {
      messagePopupError,
      messagePopupSuccess
   };
} 