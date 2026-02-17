# 🗄️ Instalación con MySQL - GSanz Rifas

## 📋 Requisitos

- Servidor web (Apache/Nginx)
- PHP 7.4 o superior
- MySQL 5.7 o superior
- phpMyAdmin (opcional, recomendado)

## 🚀 Paso 1: Crear la Base de Datos

### Opción A: Usando phpMyAdmin

1. Abre phpMyAdmin en tu navegador
2. Click en "Nueva" para crear base de datos
3. Nombre: `gsanz_rifas`
4. Cotejamiento: `utf8mb4_unicode_ci`
5. Click "Crear"
6. Selecciona la base de datos creada
7. Ve a la pestaña "SQL"
8. Copia todo el contenido de `database/schema.sql`
9. Pega en el editor SQL
10. Click "Continuar"

### Opción B: Usando línea de comandos

```bash
# Conectar a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE gsanz_rifas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Salir
exit

# Importar schema
mysql -u root -p gsanz_rifas < database/schema.sql
```

## ⚙️ Paso 2: Configurar la Conexión

Edita el archivo `api/config/database.php`:

```php
private $host = "localhost";        // Tu host MySQL
private $db_name = "gsanz_rifas";   // Nombre de la BD
private $username = "tu_usuario";   // Tu usuario MySQL
private $password = "tu_contraseña"; // Tu contraseña MySQL
```

### Para Producción:

Crea un usuario específico para la aplicación:

```sql
CREATE USER 'gsanz_user'@'localhost' IDENTIFIED BY 'contraseña_segura';
GRANT SELECT, INSERT, UPDATE, DELETE ON gsanz_rifas.* TO 'gsanz_user'@'localhost';
FLUSH PRIVILEGES;
```

## 📁 Paso 3: Subir Archivos al Servidor

### Estructura de carpetas:

```
tu-servidor/
├── public_html/          (o www, htdocs)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── admin/
│   │   ├── index.html
│   │   ├── login.html
│   │   └── ...
│   ├── api/
│   │   ├── index.php
│   │   ├── .htaccess
│   │   ├── config/
│   │   │   └── database.php
│   │   └── controllers/
│   │       ├── RifaController.php
│   │       ├── VentaController.php
│   │       └── CompradorController.php
│   └── data/
│       └── rifa-data.json
```

### Usando FTP:

1. Conecta a tu servidor FTP
2. Sube todos los archivos manteniendo la estructura
3. Asegúrate de subir la carpeta `api/` completa

### Usando cPanel:

1. Abre el Administrador de Archivos
2. Ve a `public_html`
3. Sube los archivos
4. Extrae si subiste un ZIP

## 🔧 Paso 4: Configurar Permisos

```bash
# Dar permisos de escritura a carpetas necesarias
chmod 755 api/
chmod 644 api/config/database.php
chmod 755 data/
chmod 644 data/rifa-data.json
```

## 🌐 Paso 5: Configurar el Admin

Edita `admin/admin.js` y busca la configuración de la API:

```javascript
// Cambiar esta línea
const API_URL = 'https://tudominio.com/api';
```

Edita `script.js` (página pública) y busca:

```javascript
// Cambiar esta línea
const API_URL = 'https://tudominio.com/api';
```

## ✅ Paso 6: Verificar Instalación

### Probar la API:

Abre en tu navegador:
```
https://tudominio.com/api/rifas
```

Deberías ver un JSON con la rifa inicial.

### Probar el Admin:

1. Abre: `https://tudominio.com/admin`
2. Login: usuario `cris`, contraseña `1823`
3. Deberías ver el dashboard

### Probar la Página Pública:

1. Abre: `https://tudominio.com`
2. Deberías ver los números de la rifa

## 🔐 Paso 7: Seguridad (IMPORTANTE)

### 1. Cambiar Contraseña del Admin

```sql
-- Conectar a MySQL
mysql -u root -p gsanz_rifas

-- Cambiar contraseña (ejemplo: nueva contraseña "MiPassword123")
UPDATE usuarios_admin 
SET password_hash = '$2y$10$ejemplo_hash_aqui' 
WHERE username = 'cris';
```

Para generar el hash, usa este script PHP:

```php
<?php
echo password_hash('MiPassword123', PASSWORD_DEFAULT);
?>
```

### 2. Proteger Archivos Sensibles

Crea un archivo `.htaccess` en `api/config/`:

```apache
Order Deny,Allow
Deny from all
```

### 3. Usar HTTPS

- Instala un certificado SSL (Let's Encrypt es gratis)
- Fuerza HTTPS en tu `.htaccess` principal:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 📊 Paso 8: Verificar Tablas Creadas

En phpMyAdmin o MySQL:

```sql
USE gsanz_rifas;
SHOW TABLES;
```

Deberías ver:
- rifas
- caracteristicas_rifa
- compradores
- ventas
- numeros_vendidos
- ganadores
- usuarios_admin
- configuracion
- logs_actividad

## 🎯 Endpoints de la API

### Rifas:
- `GET /api/rifas` - Obtener todas las rifas
- `GET /api/rifas/{id}` - Obtener una rifa
- `GET /api/numeros/{rifa_id}` - Obtener números de una rifa
- `GET /api/estadisticas/{rifa_id}` - Obtener estadísticas

### Ventas:
- `POST /api/ventas` - Registrar venta
- `GET /api/ventas` - Obtener todas las ventas
- `GET /api/ventas/{id}` - Obtener una venta
- `DELETE /api/ventas/{id}` - Eliminar venta

### Compradores:
- `GET /api/compradores` - Obtener todos los compradores
- `GET /api/compradores/{id}` - Obtener un comprador

## 🧪 Probar la API

### Usando cURL:

```bash
# Obtener rifas
curl https://tudominio.com/api/rifas

# Registrar venta
curl -X POST https://tudominio.com/api/ventas \
  -H "Content-Type: application/json" \
  -d '{
    "rifaId": 1,
    "comprador": {
      "nombre": "Juan Pérez",
      "telefono": "3001234567",
      "email": "juan@ejemplo.com"
    },
    "numeros": [15, 20],
    "precio": {
      "base": 20000,
      "descuento": 0,
      "total": 20000
    },
    "notas": "Cliente frecuente"
  }'
```

### Usando Postman:

1. Importa la colección de endpoints
2. Configura la URL base: `https://tudominio.com/api`
3. Prueba cada endpoint

## 🆘 Solución de Problemas

### Error: "Access denied for user"
**Solución:** Verifica usuario y contraseña en `database.php`

### Error: "Table doesn't exist"
**Solución:** Ejecuta el script `schema.sql` nuevamente

### Error: "500 Internal Server Error"
**Solución:** 
- Verifica logs de PHP: `/var/log/apache2/error.log`
- Activa display_errors en desarrollo

### Error: "CORS policy"
**Solución:** Verifica que el `.htaccess` en `api/` esté configurado

### No se guardan las ventas
**Solución:**
- Verifica que la API esté respondiendo
- Revisa la consola del navegador (F12)
- Verifica la URL de la API en el código

## 📝 Mantenimiento

### Backup de la Base de Datos:

```bash
# Crear backup
mysqldump -u root -p gsanz_rifas > backup_$(date +%Y%m%d).sql

# Restaurar backup
mysql -u root -p gsanz_rifas < backup_20260217.sql
```

### Limpiar Logs Antiguos:

```sql
DELETE FROM logs_actividad WHERE fecha < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

### Optimizar Tablas:

```sql
OPTIMIZE TABLE ventas, numeros_vendidos, compradores;
```

## 🎉 ¡Listo!

Tu sistema ahora está funcionando con MySQL:

- ✅ Base de datos profesional
- ✅ API REST funcional
- ✅ Guardado automático
- ✅ Sin pérdida de datos
- ✅ Escalable y robusto

## 📞 Soporte

Para ayuda con la instalación:
- WhatsApp: +57 313 533 0859
- Instagram: @gsanzjoyeria
