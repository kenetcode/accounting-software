let togglePassword = document.getElementById('toggle-password');
let submit = document.getElementById('submit');
let username = document.getElementById('input-username');
let password = document.getElementById('input-password');
let error = document.getElementById('error-container');

submit.addEventListener('click', function() {
    if (username.value === 'admin' && password.value === 'admin') {
        window.location.href = '/home';
    }
    else {
        error.innerHTML = '<p class="alert">Usuario o Contraseña invalidos</p>';
        username.value = '';
        password.value = '';
    }
});

togglePassword.addEventListener('click', function() {
    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    } 
});


submit.addEventListener('click', async() =>  {
    /* let response = await fetch('https://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    });
    let data = await response.json();
    if (data.status === 'success') {
        window.location.href = '/home';
    } else {
        alert('Login failed');
    } */
});