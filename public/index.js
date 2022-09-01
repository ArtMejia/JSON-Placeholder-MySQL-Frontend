const apiURL = 'http://localhost:4500/api';

const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;        
    }
}

const parseData = () => {
    data => {
        if (isValidJSON(data)) {
            const parseJSON = JSON.parse(data);
            document.getElementById('response').innerText = JSON.stringify(parseJSON, null, '\t');  
        } else {
            document.getElementById('response').innerText = data;
        }
    }
}

const reqAllUsers = (
    method // GET, POST, DELETE
    ) => {
        if (!['GET', 'POST', 'DELETE'].includes(method)) {
            alert('Invalid method used for request all Users');
            return;
        }

    fetch(apiURL + '/users/sql/all/', {method: method})
    .then(response => response.text())
    .then(data => {
        if (isValidJSON(data)) {
            const parseJSON = JSON.parse(data);
            document.getElementById('response').innerText = JSON.stringify(parseJSON, null, '\t');  
        } else {
            document.getElementById('response').innerText = data;
        }
    })
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
        document.getElementById('userId').value = '';
        document.getElementById('response').innerText = errorMsg;
        return;
    }

    fetch(apiURL + '/users/sql/' + userId, {method: method})
    .then(response => response.text())
    .then(data => {
        if (isValidJSON(data)) {
            const parseJSON = JSON.parse(data);
            document.getElementById('response').innerText = JSON.stringify(parseJSON, null, '\t')
        } else {
            document.getElementById('response').innerText = data;
        }
    })
    .catch(error => {
        console.log(error);
        document.getElementById('response').innerText = error;
    })
    .finally(() => {
        document.getElementById('userId').value = '';
    })
}

const postNewUser = () => {
    const name = document.getElementById('name').value;
    const userName = document.getElementById('username').value;
    const userEmail = document.getElementById('email').value;

    console.log(name, userName, userEmail);

    let errorMsg = [];

    if (name === '') {
        errorMsg.push('Please eneter valid name')
    if (userName === '') {
        errorMsg.push('Please eneter valid username')
    }
    if (userEmail === '') {
        errorMsg.push('Please enter valid email')
    }
    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById('name').value = '';
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        document.getElementById('response').innerText = errorMsg.join('\n');
        return;  
    }
        fetch(apiURL + '/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                username: userName,
                email: userEmail
            })
        })
        .then(response => response.text())
        .then(data => {
        if (isValidJSON(data)) {
            const parseJSON = JSON.parse(data);
            document.getElementById('response').innerText = JSON.stringify(parseJSON, null, '\t')
        } else {
            document.getElementById('response').innerText = data;
        }
    })
    .catch(error => {
        console.log(error);
        document.getElementById('response').innerText = error;
    })
    .finally(() => {
        document.getElementById('name').value = '';
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
    })
}
}

const updateUserById = () => {
    const name = document.getElementById('name').value;
    const userName = document.getElementById('username').value;
    const userEmail = document.getElementById('email').value;

    const userId = parseInt(document.getElementById('userId').value);

    let errorMsg = ''
    if (isNaN(userId)) {
        errorMsg = "Please enter a user ID. Must be a number";
    } else if (userId < 1) {
        errorMsg = "Please enter valid user ID. Must be greater than 0";
    }
    if (errorMsg !== '') {
        document.getElementById('userId').value = '';
        document.getElementById('response').innerText = errorMsg;
        return;
    }
}


const clearResponseText = () => {
    document.getElementById('response').innerText = "";
}
