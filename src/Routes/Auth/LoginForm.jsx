import React, { useState } from 'react'
import BaseAuthForm from './BaseAuthForm';
import { fetchPost } from '../../helpers/fetch'


const LoginForm = ({ history, setIsAuthenticated }) => {

    const [helpButtonEmail, setHelpButtonEmail] = useState({ icon: 'email', helpText: 'Your email is your username', nextPage: null })
    const [helpButtonPassword, setHelpButtonPassword] = useState({ icon: 'password', helpText: 'Password should be 6-8 characters', nextPage: null })
 
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

                if (data.errorMsg === 'User not activated') {
                    actions.setFieldError('email', data.errorMsg)
                    // setHelpButton({ icon: 'help', helpText: 'Resend activation link?', nextPage: '/registerUser?resendEmail=true&' })
                    setHelpButtonEmail({ icon: 'help', helpText: 'Resend activation link?', nextPage: '/register?email='+values.email })
                }
                else if (data.errorMsg === 'Incorrect password') {
                    actions.setFieldError('password', data.errorMsg)
                    setHelpButtonPassword({ icon: 'help', helpText: 'Reset password?', nextPage: '/reset?email=' })
                }
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
            helpButtonEmail={helpButtonEmail}
            helpButtonPassword={helpButtonEmail}
        />
    )
}

export default LoginForm