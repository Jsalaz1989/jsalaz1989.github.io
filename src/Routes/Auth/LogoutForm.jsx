import React from 'react'
import BaseAuthForm from './BaseAuthForm';


const LogoutForm = ({ history }) => {
   
    function logoutUser() {

        console.log('Logging out user')

        localStorage.removeItem('authenticated')

        history.push('/')
        window.location.reload();

        // function handleResponse(data) {

        //     actions.setSubmitting(false)

        //     if (data.userRegistered)
        //     {
        //         console.log('Server registered the new user')
        //         setEmailSent(values.email)
        //     }
        //     else
        //         console.log('Server unable to register user')
        // }
    
        // fetchPost('/registerUser', values, handleResponse)
    }

    setTimeout(logoutUser, 2000)

    return (
        <BaseAuthForm 
            history={history}
            done={true}
            titleBefore='Blah'
            textBefore='Blah blah'
            titleAfter='Logged Out'
            textAfter={'You have logged out successfully. Returning to the landing page.'}
            userMustExist={false}
            passwordCheck={true}
            onSubmit={logoutUser}
            submitButtonText='Blah'
        />
    )
}

export default LogoutForm