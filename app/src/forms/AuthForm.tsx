import React, { FC, useContext, useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useHTTP } from 'src/hooks/useHTTP';
import { useMessage } from 'src/hooks/useMessage';
import { AuthContext } from 'src/context/authContext';

type ResponseAuthType = {
   message?: string;
   token?: string;
   userID?: string;
};

type RegistrationOrloginType = 'registration' | 'login';


const AuthForm: FC = () => {
   const [form] = Form.useForm();
   const auth = useContext(AuthContext);
   const { request, isLoading, error, clearError } = useHTTP();
   const { messagePopupError } = useMessage();
   const [isRegistration, setIsRegistration] = useState<boolean>(false);

   useEffect(() => {
      if (error) {
         messagePopupError(error);
         clearError();
      }
   }, [error, messagePopupError, clearError])

   const handleRegOrAuth = async (key: RegistrationOrloginType) => {
      const {name, email, password, repeatPassword} = form.getFieldsValue(['name', 'email', 'password', 'repeatPassword']);
      const emailValidation = form.getFieldError('email')?.length;
      const passwordValidation = form.getFieldError('password')?.length;

      if (key === 'registration' && password !== repeatPassword) {
         messagePopupError('Password mismatch');
         return;
      };

      if ((!emailValidation && !passwordValidation) && (email && password)) {
         try {
            const res: ResponseAuthType = await request(`/api/auth/${key}`, 'POST', {name, email, password});
            if (res?.message) {
               messagePopupError(res?.message);
            };

            if (key === 'login' && res?.token) {
               auth?.login(res?.token, res?.userID);
            }
            setIsRegistration(false);
         } catch (e) {
            messagePopupError('Error request');
         };
      };
   };

   return (
      <Form
         form={form}
         name='normal_login'
         className='login-form'
      >
         {isRegistration &&
            <Form.Item
               name='name'
               rules={[{ required: true, message: 'Please input your name!' }]}
            >
               <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  type='name'
                  placeholder='Name'
               />
            </Form.Item>
         }
         <Form.Item
            name='email'
            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
         >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
         </Form.Item>
         <Form.Item
            name='password'
            rules={[{ required: true, min: 6, message: 'Please input your password!' }]}
         >
            <Input
               prefix={<LockOutlined className='site-form-item-icon' />}
               type='password'
               placeholder='Password'
            />
         </Form.Item>
         {isRegistration &&
            <Form.Item
               name='repeatPassword'
               rules={[{ required: true, min: 6, message: 'Please repeat your password!' }]}
            >
               <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Repeat password'
               />
            </Form.Item>
         }
         <Form.Item>
            {!isRegistration ? (
               <>
                  <Button type='primary' htmlType='submit' className='login-form-button' loading={isLoading} onClick={() => handleRegOrAuth('login')}>
                     Sing In
                  </Button>
                  <Button type='default' htmlType='button' className='login-form-button' loading={isLoading} onClick={() => setIsRegistration(true)}>
                     Registration
                  </Button>
               </>
               ) : (
                  <>
                     <Button type='primary' htmlType='button' className='login-form-button' loading={isLoading} onClick={() => handleRegOrAuth('registration')}>Registration</Button>
                     <Button type='default' htmlType='button' className='login-form-button' loading={isLoading} onClick={() => {
                        setIsRegistration(false);
                        form.resetFields(['name', 'email', 'password', 'repeatPassword']);
                     }}>
                        Back
                     </Button>
                  </>
               )
            }
         </Form.Item>
      </Form>
   );
};

export default AuthForm;