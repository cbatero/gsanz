// Utilidades de encriptación usando CryptoJS
// Clave secreta - En producción, esto debería estar en el servidor
const SECRET_KEY = 'GSanz2024$ecureK3y!@#';

// Encriptar datos
function encryptData(data) {
    try {
        const jsonString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
        return encrypted;
    } catch (error) {
        console.error('Error al encriptar:', error);
        return null;
    }
}

// Desencriptar datos
function decryptData(encryptedData) {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error al desencriptar:', error);
        return null;
    }
}

// Hash de contraseña (SHA256)
function hashPassword(password) {
    return CryptoJS.SHA256(password + SECRET_KEY).toString();
}

// Verificar contraseña
function verifyPassword(password, hashedPassword) {
    const hash = hashPassword(password);
    return hash === hashedPassword;
}

// Generar token de sesión
function generateSessionToken(username) {
    const timestamp = Date.now();
    const data = `${username}:${timestamp}:${SECRET_KEY}`;
    return CryptoJS.SHA256(data).toString();
}

// Validar token de sesión
function validateSessionToken(token, username, timestamp) {
    const expectedToken = CryptoJS.SHA256(`${username}:${timestamp}:${SECRET_KEY}`).toString();
    const tokenAge = Date.now() - timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 horas
    
    return token === expectedToken && tokenAge < maxAge;
}

// Encriptar archivo completo
function encryptFile(data) {
    return {
        encrypted: true,
        data: encryptData(data),
        timestamp: Date.now()
    };
}

// Desencriptar archivo completo
function decryptFile(encryptedFile) {
    if (!encryptedFile.encrypted) {
        return encryptedFile;
    }
    return decryptData(encryptedFile.data);
}
