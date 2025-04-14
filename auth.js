// auth.js

// Handle Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#login-form input[type="email"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;
    
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
};
// Handle Register Form Submission
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullName = document.querySelector('#register-form input[type="text"]').value;
    const email = document.querySelector('#register-form input[type="email"]').value;
    const phone = document.querySelector('#register-form input[type="tel"]')?.value;
    const password = document.querySelector('#register-form input[type="password"]:nth-child(1)').value;
    const confirmPassword = document.querySelector('#register-form input[type="password"]:nth-child(2)').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName, email, phone, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Register error:', error);
        alert('An error occurred during registration');
    }
});
});