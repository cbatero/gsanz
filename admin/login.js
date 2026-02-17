// Login functionality con encriptación
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    try {
        // Cargar usuarios encriptados
        const response = await fetch('users.json');
        const encryptedData = await response.json();
        
        // Desencriptar datos
        let data;
        if (encryptedData.encrypted) {
            data = decryptFile(encryptedData);
            if (!data) {
                throw new Error('Error al desencriptar datos de usuarios');
            }
        } else {
            data = encryptedData;
        }
        
        // Buscar usuario
        const user = data.users.find(u => u.username === username);
        
        if (!user) {
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            errorMessage.classList.add('show');
            setTimeout(() => errorMessage.classList.remove('show'), 3000);
            return;
        }
        
        // Verificar contraseña
        let passwordValid = false;
        
        // Si la contraseña está hasheada
        if (user.password.length === 64) { // SHA256 hash length
            passwordValid = verifyPassword(password, user.password);
        } else {
            // Contraseña en texto plano (solo para desarrollo)
            passwordValid = password === user.password;
        }
        
        if (passwordValid) {
            // Generar token de sesión
            const timestamp = Date.now();
            const sessionToken = generateSessionToken(username);
            
            // Guardar sesión encriptada
            const sessionData = {
                username: user.username,
                name: user.name,
                role: user.role,
                token: sessionToken,
                timestamp: timestamp
            };
            
            const encryptedSession = encryptData(sessionData);
            sessionStorage.setItem('adminSession', encryptedSession);
            
            // Redirigir al panel
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = 'Usuario o contraseña incorrectos';
            errorMessage.classList.add('show');
            setTimeout(() => errorMessage.classList.remove('show'), 3000);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        errorMessage.textContent = 'Error al conectar con el servidor';
        errorMessage.classList.add('show');
    }
});
