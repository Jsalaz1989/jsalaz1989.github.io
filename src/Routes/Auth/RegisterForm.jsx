import React, { useState } from 'react'
import BaseAuthForm from './BaseAuthForm';
import { fetchPost } from '../../helpers/fetch'


const RegisterForm = ({ history }) => {

    const [emailSent, setEmailSent] = useState('')
    
    function registerUser(values, actions) {

        console.log('Registering user: ', values)
    
        function handleResponse(data) {

            actions.setSubmitting(false)

            if (data.userRegistered)
            {
                console.log('Server registered the new user')
                setEmailSent(values.email)
            }
            else
                console.log('Server unable to register user')
        }
    
        fetchPost('/registerUser', values, handleResponse)
    }

    return (
        <BaseAuthForm 
            history={history}
            done={emailSent}
            titleBefore='Register'
            textBefore='Enter an email and password'
            titleAfter='Account registered'
            textAfter={'An email has been sent to ' + emailSent + ' with an activation link'}
            userMustExist={false}
            passwordCheck={true}
            onSubmit={registerUser}
            submitButtonText='Register'
            alternateButton={{ icon: 'password', helpText: 'Password should be 6-8 characters', nextPage: null }}
        />
    )
}

export default RegisterForm