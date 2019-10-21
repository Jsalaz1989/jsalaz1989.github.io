import React, { useState } from 'react'
import BaseAuthForm from './BaseAuthForm';
import { fetchPost } from '../../helpers/fetch'


const LoginForm = ({ history, setIsAuthenticated }) => {

    const [helpButton, setHelpButton] = useState({ icon: 'password', helpText: 'Password should be 6-8 characters', nextPage: null })
 
    function logInUser(values, actions) {

		console.log('Logging in user: ', values)
		
		function handleResponse(data) {
            
            actions.setSubmitting(false)

            if (data.userLoggedIn)
            {
                console.log('Correct password')
                setIsAuthenticated(true)
                localStorage.setItem('authenticated', true)
                history.push('/home')
                window.location.reload();
            }
            else 
            {
                console.log(data.errorMsg)
                actions.setFieldError('password', data.errorMsg)

                if (data.errorMsg === 'User not activated')
                    setHelpButton({ icon: 'help', helpText: 'Resend activation link?', nextPage: '/registerUser?resendEmail=true&' })
                else if (data.errorMsg === 'Incorrect password')
                    setHelpButton({ icon: 'help', helpText: 'Reset password?', nextPage: '/reset?email=' })
            }
        }

        fetchPost('/logInUser', values, handleResponse)
    }
    
    return (
        <BaseAuthForm 
            history={history}
            done={false}
            titleBefore='Log In'
            textBefore='Enter an email and password'
            titleAfter='Success'
            textAfter={'Please wait while we log you in'}
            userMustExist={true}
            passwordCheck={false}
            onSubmit={logInUser}
            submitButtonText='Log In'
            alternateButton={helpButton}
        />
    )
}

export default LoginForm