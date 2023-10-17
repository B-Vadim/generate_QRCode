import React, { FC } from 'react'
import AuthForm from 'src/forms/AuthForm';


const AuthPage: FC = () => {
    return (
        <div className='authPage'>
            <h1>Welcome</h1>
            <AuthForm />
        </div>
    )
}

export default AuthPage;