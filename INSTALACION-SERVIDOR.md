# 🚀 Instalación en tu Servidor - GSanz Rifas

## 📋 Información del Servidor

- **Host**: gsanz.crisdev.fun
- **Base de Datos**: sas
- **Usuario**: cris_cris
- **Contraseña**: cris_cris

## 🗄️ Paso 1: Crear la Base de Datos

### Conectar por SSH o phpMyAdmin

1. Accede a phpMyAdmin en: https://gsanz.crisdev.fun/phpmyadmin
2. Login con tus credenciales
3. Selecciona la base de datos `sas` (o créala si no existe)
4. Ve a la pestaña "SQL"
5. Copia todo el contenido del archivo `database/schema.sql`
6. Pega en el editor SQL
7. Click "Continuar"

Esto creará todas las tablas necesarias:
- rifas
- caracteristicas_rifa
- compradores
- ventas
- numeros_vendidos
- ganadores
- usuarios_admin
- configuracion
- logs_actividad

## 📁 Paso 2: Subir la API al Servidor

### Estructura en el servidor:

```
gsanz.crisdev.fun/
└── api/
    ├── index.php
    ├── .htaccess
    ├── config/
    │   └── database.php
    └── controllers/
        ├── RifaController.php
        ├── VentaController.php
        └── CompradorController.php
```

### Subir archivos:

1. Conecta por FTP/SFTP a tu servidor
2. Navega a la carpeta raíz de gsanz.crisdev.fun
3. Crea la carpeta `api` si no existe
4. Sube todos los archivos de la carpeta `api/` local

### Archivos a subir:

```
api/
├── index.php
├── .htaccess
├── config/
│   └── database.php
└── controllers/
    ├── RifaController.php
    ├── VentaController.php
    └── CompradorController.php
```

## 🔧 Paso 3: Verificar Configuración

### Verificar database.php:

El archivo ya está configurado con tus credenciales:

```php
private $host = "gsanz.crisdev.fun";
private $db_name = "sas";
private $username = "cris_cris";
private $password = "cris_cris";
```

### Verificar permisos:

```bash
chmod 755 api/
chmod 644 api/index.php
chmod 644 api/config/database.php
chmod 644 api/controllers/*.php
```

## ✅ Paso 4: Probar la API

### Prueba 1: Verificar que la API responde

Abre en tu navegador:
```
https://gsanz.crisdev.fun/api/rifas
```

Deberías ver un JSON con la rifa inicial.

### Prueba 2: Verificar números

```
https://gsanz.crisdev.fun/api/numeros/1
```

Deberías ver los números disponibles y ocupados.

### Prueba 3: Verificar estadísticas

```
https://gsanz.crisdev.fun/api/estadisticas/1
```

Deberías ver las estadísticas de la rifa.

## 🌐 Paso 5: Configurar GitHub Pages

### En tu repositorio GitHub:

1. Ve a Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Save

### URL de tu sitio:

- **Público**: https://cbatero.github.io/gsanz
- **Admin**: https://cbatero.github.io/gsanz/admin

## 🔗 Paso 6: Verificar Conexión

### Probar desde el admin:

1. Abre: https://cbatero.github.io/gsanz/admin
2. Login: usuario `cris`, contraseña `1823`
3. Si carga el dashboard, la conexión funciona ✅

### Probar desde la página pública:

1. Abre: https://cbatero.github.io/gsanz
2. Deberías ver los números de la rifa
3. Los números ocupados aparecen como "Reservado"

## 🔐 Paso 7: Seguridad

### 1. Cambiar contraseña del admin

Conéctate a MySQL y ejecuta:

```sql
USE sas;

-- Generar nuevo hash de contraseña
-- Usa este script PHP para generar el hash:
-- <?php echo password_hash('TuNuevaContraseña', PASSWORD_DEFAULT); ?>

UPDATE usuarios_admin 
SET password_hash = '$2y$10$TU_NUEVO_HASH_AQUI' 
WHERE username = 'cris';
```

### 2. Proteger la carpeta api/config

Crea un archivo `.htaccess` en `api/config/`:

```apache
Order Deny,Allow
Deny from all
```

### 3. Habilitar HTTPS

Tu servidor ya tiene HTTPS, asegúrate de que todas las URLs usen `https://`

## 📊 Endpoints Disponibles

### Rifas:
- `GET /api/rifas` - Todas las rifas
- `GET /api/rifas/1` - Rifa específica
- `PUT /api/rifas/1` - Actualizar rifa

### Números:
- `GET /api/numeros/1` - Números de la rifa

### Ventas:
- `GET /api/ventas` - Todas las ventas
- `POST /api/ventas` - Registrar venta
- `DELETE /api/ventas/{id}` - Eliminar venta

### Estadísticas:
- `GET /api/estadisticas/1` - Estadísticas de la rifa

## 🧪 Probar con cURL

```bash
# Obtener rifa
curl https://gsanz.crisdev.fun/api/rifas/1

# Registrar venta
curl -X POST https://gsanz.crisdev.fun/api/ventas \
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
    }
  }'
```

## 🆘 Solución de Problemas

### Error: "Connection refused"
**Solución**: Verifica que la API esté subida correctamente

### Error: "Access denied"
**Solución**: Verifica las credenciales en `database.php`

### Error: "Table doesn't exist"
**Solución**: Ejecuta el script `schema.sql` en phpMyAdmin

### Error: "CORS policy"
**Solución**: Verifica que el `.htaccess` esté en la carpeta `api/`

### No se guardan las ventas
**Solución**:
1. Abre la consola del navegador (F12)
2. Ve a la pestaña Network
3. Busca la petición a `/api/ventas`
4. Revisa el error específico

## 📝 Mantenimiento

### Backup de la Base de Datos

Desde phpMyAdmin:
1. Selecciona la base de datos `saslas`
2. Click en "Exportar"
3. Método: Rápido
4. Formato: SQL
5. Click "Continuar"

### Limpiar logs antiguos

```sql
USE sas;
DELETE FROM logs_actividad WHERE fecha < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

## ✅ Checklist de Instalación

- [ ] Base de datos `sas` creada
- [ ] Script `schema.sql` ejecutado
- [ ] Carpeta `api/` subida al servidor
- [ ] Archivo `database.php` configurado
- [ ] API responde en: https://gsanz.crisdev.fun/api/rifas
- [ ] GitHub Pages activado
- [ ] Admin funciona: https://cbatero.github.io/gsanz/admin
- [ ] Página pública funciona: https://cbatero.github.io/gsanz
- [ ] Contraseña del admin cambiada

## 🎉 ¡Listo!

Tu sistema está funcionando con:
- ✅ Base de datos MySQL profesional
- ✅ API REST en tu servidor
- ✅ Frontend en GitHub Pages (gratis)
- ✅ Guardado automático en base de datos
- ✅ Sin pérdida de datos
- ✅ Escalable y robusto

## 📞 Soporte

Para ayuda con la instalación:
- WhatsApp: +57 313 533 0859
- Instagram: @gsanzjoyeria
