// Login functionality
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        // En producción, esto debería ser una llamada a tu backend
        const response = await fetch('users.json');
        const data = await response.json();
        
        const user = data.users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Guardar sesión
            sessionStorage.setItem('adminUser', JSON.stringify({
                username: user.username,
                name: user.name,
                role: user.role
            }));
            
            // Redirigir al panel
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            errorMessage.classList.add('show');
            
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 3000);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        errorMessage.textContent = 'Error al conectar con el servidor';
        errorMessage.classList.add('show');
    }
});
