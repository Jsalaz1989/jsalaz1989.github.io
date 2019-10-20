export function fetchPost(url, body, handleResponse) {

    console.log('Fetching from ' + url)

    
    
    fetch(process.env.REACT_APP_API_URL + url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(body),
    })   
        .then(response => {
            console.log('Received response from server: ', response)
            return response.json()
        })
        .then(data => {
            console.log('Received data from server: ' + JSON.stringify(data))
            handleResponse(data)
        })
}



// export function fetchPost(url, body, handleResponse) {

//     console.log('Fetching from ' + url)
    
//     fetch('http://127.0.0.1:5000'+url, {
//         method: 'POST',
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify(body),
//     })
//         .then(response => {
//             console.log('Received response from ' + url + ': ' + response.status)
//             handleResponse(response)
//         })
//}


