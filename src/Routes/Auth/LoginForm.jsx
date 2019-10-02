import React from 'react'
import BaseAuthForm from './BaseAuthForm';
import { fetchPost } from '../../helpers/fetch'


const LoginForm = ({ history, setIsAuthenticated }) => {
 
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
                console.log('Incorrect password')
                actions.setFieldError('password', 'Incorrect password')
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
            alternateButton={true}
        />
    )
}

export default LoginForm