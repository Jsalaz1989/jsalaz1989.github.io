import React, { useState } from 'react'
import BaseAuthForm from './BaseAuthForm';
import { fetchPost } from '../../helpers/fetch'


const ResetForm = ({ history }) => {

    const [emailSent, setEmailSent] = useState('')
    
    function resetPassword(values, actions) {

        console.log('Resetting password for user: ', values)
    
        function handleResponse(data) {

            actions.setSubmitting(false)

            if (data.resetEmailSent)
            {
                console.log('Server reset the password')
                setEmailSent(values.email)
            }
            else
                console.log('Server unable to reset the password')
        }
    
        fetchPost('/resetPasswordEmail', values, handleResponse)
    }

    return (
        <BaseAuthForm 
            history={history}
            done={emailSent}
            titleBefore='Reset password'
            textBefore='Enter an email and password'
            titleAfter='Email sent'
            textAfter={'An email has been sent to ' + emailSent + ' with a confirmation link'}
            userMustExist={true}
            passwordCheck={true}
            onSubmit={resetPassword}
            submitButtonText='Send confirmation email'
        />
    )
}

export default ResetForm