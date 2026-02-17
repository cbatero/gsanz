# 🔐 Seguridad del Sistema GSanz Rifas

## Características de Seguridad Implementadas

### 1. Encriptación de Datos
- **Algoritmo:** AES (Advanced Encryption Standard)
- **Librería:** CryptoJS 4.1.1
- **Datos encriptados:**
  - Usuarios y contraseñas
  - Configuración de la rifa
  - Sesiones de usuario
  - Datos sensibles en localStorage

### 2. Hash de Contraseñas
- **Algoritmo:** SHA-256
- **Salt:** Clave secreta única
- Las contraseñas nunca se almacenan en texto plano

### 3. Tokens de Sesión
- Generación de tokens únicos por sesión
- Validación de timestamp (expiración 24 horas)
- Verificación en cada petición

### 4. Protección de Archivos JSON
- `users.json` - Encriptado
- `config.json` - Encriptado
- Solo accesibles mediante desencriptación

## Cómo Usar la Herramienta de Encriptación

### Paso 1: Abrir la Herramienta
Abre `admin/encrypt-data.html` en tu navegador

### Paso 2: Encriptar Usuarios
1. Edita el JSON de usuarios con tus datos
2. Click en "Hash Contraseñas" para hashear las contraseñas
3. Copia el resultado
4. Pega en `admin/users.json`

### Paso 3: Encriptar Configuración
1. Edita el JSON de configuración
2. Click en "Encriptar Configuración"
3. Copia el resultado
4. Pega en `admin/config.json`

## Estructura de Datos Encriptados

```json
{
  "encrypted": true,
  "data": "U2FsdGVkX1+...",
  "timestamp": 1738022400000
}
```

## Cambiar la Clave Secreta

⚠️ **IMPORTANTE:** Cambia la clave secreta en producción

Edita `admin/crypto-utils.js`:
```javascript
const SECRET_KEY = 'TU_CLAVE_SECRETA_AQUI';
```

Después de cambiar la clave:
1. Re-encripta todos los archivos JSON
2. Los usuarios deberán volver a iniciar sesión

## Credenciales por Defecto

**Usuario:** cris
**Contraseña:** 1823

⚠️ **Cambia estas credenciales inmediatamente en producción**

## Recomendaciones de Seguridad

### Para Producción:
1. ✅ Cambia la clave secreta (`SECRET_KEY`)
2. ✅ Cambia las credenciales por defecto
3. ✅ Usa HTTPS en el servidor
4. ✅ Implementa rate limiting en el login
5. ✅ Mueve la lógica de autenticación al backend
6. ✅ Usa variables de entorno para claves
7. ✅ Implementa logs de auditoría
8. ✅ Configura CORS apropiadamente

### Mejoras Futuras:
- Autenticación de dos factores (2FA)
- Recuperación de contraseña por email
- Roles y permisos más granulares
- Historial de cambios
- Backup automático encriptado

## Limitaciones Actuales

⚠️ Este sistema usa encriptación del lado del cliente. Para máxima seguridad:
- Implementa un backend con Node.js/PHP/Python
- Almacena datos en una base de datos segura
- Usa JWT para autenticación
- Implementa HTTPS obligatorio

## Soporte

Para dudas de seguridad: admin@gsanz.com
