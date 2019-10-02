import React from 'react'
import BaseAuthForm from './BaseAuthForm';


const ResetConf = ({ history }) => {

    let email = window.location.search.replace('?email=','')

    return (
        <BaseAuthForm 
            history={history}
            done={true}
            titleAfter='Password reset'
            textAfter={'Click below to sign in as ' + email}
            onSubmit={() => history.push('/login?email='+email)}
            submitButtonText='Log In'
            nextAfterDone={true}
            isInitialValid={true}
        />
    )
}

export default ResetConf