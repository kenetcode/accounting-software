let togglePassword = document.getElementById('toggle-password');
let username = document.getElementById('input-username');
let password = document.getElementById('input-password');

togglePassword.addEventListener('click', function() {
    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    } 
});