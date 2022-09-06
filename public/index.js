const apiURL = 'http://localhost:4500/api';

const isValidJSON = (str) => {
    try {
        JSON.parse(str)
        return true
    } catch (e) {
        return false       
    }
}

const clearResponseText = () => {
    document.getElementById('response').innerText = "";
}

const clearInputs = () => {
    document.getElementById('userId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('website').value = '';
}

const parseData = (data) => {
    if (isValidJSON(data)) {
        const parseJSON = JSON.parse(data);
        document.getElementById('response').innerText = JSON.stringify(parseJSON, null, '\t');  
    } else {
        document.getElementById('response').innerText = data;
    }
}

const reqAllUsers = (method) => {
    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method used for request all Users');
        return;
    }

    fetch(apiURL + '/users/sql/all/', {method: method})
    .then(response => response.text())
    .then(parseData)
    .catch(error => {
        console.log(error)
        document.getElementById('response').innerText = error
    });
}

const requestUserId = (method) => {
    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method used for request User by ID');
        return;
    }

    const userId = parseInt(document.getElementById('userId').value);

    let errorMsg = ''
    if (isNaN(userId)) {
        errorMsg = "Please enter a user ID. Must be a number";
    } else if (userId < 1) {
        errorMsg = "Please enter valid user ID. Must be greater than 0";
    }
    if (errorMsg !== '') {
        document.getElementById('response').innerText = errorMsg;
        return;
    }

    fetch(apiURL + '/users/sql/' + userId, {method: method})
    .then(response => response.text())
    .then(parseData)
    .catch(error => {
        console.log(error);
        document.getElementById('response').innerText = error;
    })
}

const writeUserData = (method) => {
    if (!['POST', 'PUT'].includes(method)) {
        alert('Invalid method used for request User by ID');
        return;
    }

    const name = document.getElementById('name').value;
    const userName = document.getElementById('username').value;
    const userEmail = document.getElementById('email').value;
    const userPhone = document.getElementById('phone').value;
    const userWebsite = document.getElementById('website').value;

    const userBody = {
        name: name,
        username: userName,
        email: userEmail,
        phone: userPhone,
        website: userWebsite
    }

    let errorMsg = [];

    if (name === '') {
        errorMsg.push('Please enter valid name')
    }
    if (userName === '') {
        errorMsg.push('Please enter valid username')
    }
    if (userEmail === '') {
        errorMsg.push('Please enter valid email')
    }
    if (userPhone === '') {
        errorMsg.push('Please enter valid phone number')
    }
    if (userWebsite === '') {
        errorMsg.push('Please enter valid website')
    }
    if (method === 'PUT') {
        userBody.id = parseInt(document.getElementById('userId').value);
        if (isNaN(userBody.id)) {
            errorMsg = 'Please enter a valid user ID. Must be a number';
        } else if (userBody.id < 1) {
            errorMsg = 'Please enter a valid user ID. Must be greater than 0';
        }
    }

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById('response').innerText = errorMsg;
        return;  
    }

    const requestURL = apiURL + '/users' + (method === 'PUT' ? '/sql/' + userBody.id : '');

    fetch(requestURL, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBody)
    })
    .then(response => response.text())
    .then(parseData)
    .catch(error => {
        console.log(error);
        document.getElementById('response').innerText = error;
    })
}


const reqAllPosts = (method) => {
    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method used for request all Posts');
        return;
    }

    fetch(apiURL + '/posts/sql/all/', {method: method})
    .then(response => response.text())
    .then(parseData)
    .catch(error => {
        console.log(error)
        document.getElementById('response').innerText = error
    });
}

const requestPostId = (method) => {
    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method used for request Post by ID');
        return;
    }

    const postId = parseInt(document.getElementById('postId').value);

    let errorMsg = ''
    if (isNaN(postId)) {
        errorMsg = "Please enter a post ID. Must be a number";
    } else if (postId < 1) {
        errorMsg = "Please enter valid post ID. Must be greater than 0";
    }
    if (errorMsg !== '') {
        document.getElementById('response').innerText = errorMsg;
        return;
    }

    fetch(apiURL + '/posts/sql/' + postId, {method: method})
    .then(response => response.text())
    .then(parseData)
    .catch(error => {
        console.log(error);
        document.getElementById('response').innerText = error;
    })
}

const writePostData = (method) => {
    if (!['POST', 'PUT'].includes(method)) {
        alert('Invalid method used for request Post by ID');
        return;
    }

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    const postBody = {
        title: title,
        body: body,
    }

    let errorMsg = [];

    if (title === '') {
        errorMsg.push('Please enter valid title')
    }
    if (body === '') {
        errorMsg.push('Please enter valid body')
    }
    
    if (method === 'PUT') {
        postBody.id = parseInt(document.getElementById('postId').value);
        if (isNaN(postBody.id)) {
            errorMsg = 'Please enter a valid post ID. Must be a number';
        } else if (postBody.id < 1) {
            errorMsg = 'Please enter a valid post ID. Must be greater than 0';
        }
    }

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById('response').innerText = errorMsg;
        return;  
    }

    const requestURL = apiURL + '/posts' + (method === 'PUT' ? '/sql/' + postBody.id : '');

    fetch(requestURL, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    })
    .then(response => response.text())
    .then(parseData)
    .catch(error => {
        console.log(error);
        document.getElementById('response').innerText = error;
    })
}