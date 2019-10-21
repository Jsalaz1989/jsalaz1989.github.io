import React, { useState } from 'react'
import BaseAuthForm from './BaseAuthForm';
import { fetchPost } from '../../helpers/fetch'


const RegisterForm = ({ history }) => {

    const emailAvailable = window.location.search.replace('?email=','')
    const [emailSent, setEmailSent] = useState('')

    const [helpButtonEmail, setHelpButtonEmail] = useState({ icon: 'email', helpText: 'Use your email as your username', nextPage: null })
    const [helpButtonPassword, setHelpButtonPassword] = useState({ icon: 'password', helpText: 'Password should be 6-8 characters', nextPage: null })
    
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
            titleBefore={emailAvailable ? 'Reactivate' : 'Register'}
            textBefore={emailAvailable ? 'Reenter your password' : 'Enter an email and password'}
            titleAfter={emailAvailable ? 'Email resent' : 'Account registered'}
            textAfter={'An email has been sent to ' + emailSent + ' with an activation link'}
            userMustExist={false}
            passwordCheck={true}
            onSubmit={registerUser}
            submitButtonText={emailAvailable ? 'Resend activation email' : 'Register'}
            helpButtonEmail={helpButtonEmail}
            helpButtonPassword={helpButtonPassword}
        />
    )
}

export default RegisterForm