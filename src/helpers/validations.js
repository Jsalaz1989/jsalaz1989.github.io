export const validateEmail = (value, userMustExist) => {

    let error
    if (!value)
        error = 'Required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
        error = 'Invalid email address'
    
    if (error !== undefined)
        return error

    console.log('Checking database for user')
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
    return wait(0).then(async () => {
                
        await fetch(process.env.REACT_APP_API_URL + 'checkUserExists', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: value,
            // mode: 'no-cors'
        })
            .then(response => response.json())
            .then(data => {

                if (!userMustExist && data.userExists)
                    error = 'User already exists'
                else if (userMustExist && !data.userExists)
					error = 'User not found' 

                throw error
            })
    })
}


export const validatePassword = (value) => {

    let error
    if (!value)
        error = 'Required'
    else if (value && !/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{6,12}$/i.test(value))
        error = 'Must be alphanumeric and 6-8 characters'
    
    return error
}

export const validateConfirmation = (confirmationValue, passwordValue) => {

    console.log('confirmationValue = ', confirmationValue)
    console.log('passwordValue = ', passwordValue)

    let error
    if (!confirmationValue)
        error = 'Required'
    else if (confirmationValue && confirmationValue !== passwordValue)
        error = 'Passwords must match'
    
    console.log('error = ', error)
    
    return error
}