# 🚀 Guía de Instalación - GSanz Rifas con Backend

## ✅ Sistema Mejorado

Ahora el sistema guarda automáticamente en el archivo JSON sin necesidad de exportar manualmente. Todo se sincroniza automáticamente entre el admin y la página pública.

## 📋 Requisitos

- Node.js (versión 14 o superior)
- npm (viene con Node.js)

## 🔧 Instalación

### Paso 1: Instalar Node.js

#### Windows:
1. Descarga Node.js desde: https://nodejs.org/
2. Ejecuta el instalador
3. Sigue las instrucciones (Next, Next, Install)
4. Reinicia la computadora

#### Verificar instalación:
```bash
node --version
npm --version
```

### Paso 2: Instalar Dependencias

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

Esto instalará:
- express (servidor web)
- cors (para permitir peticiones)

### Paso 3: Iniciar el Servidor

```bash
npm start
```

Verás este mensaje:
```
╔════════════════════════════════════════════╗
║   🎯 Servidor GSanz Rifas Iniciado        ║
╠════════════════════════════════════════════╣
║   Puerto: 3000                            ║
║   URL Admin: http://localhost:3000/admin  ║
║   URL Público: http://localhost:3000      ║
║   API: http://localhost:3000/api          ║
╚════════════════════════════════════════════╝
```

## 🎯 Uso

### Acceder al Sistema

1. **Página Pública:**
   - Abre: http://localhost:3000
   - Los clientes ven números disponibles/reservados

2. **Panel Admin:**
   - Abre: http://localhost:3000/admin
   - Login: usuario "cris", contraseña "1823"

### Registrar una Venta

```
1. Login en admin
2. Ve a "🎯 Gestión Números"
3. Click en número verde
4. Llena formulario
5. Click "Registrar Venta"
6. ✅ Se guarda automáticamente
7. ✅ Aparece inmediatamente en página pública
```

## 🔄 Sincronización Automática

### Antes (Manual):
```
Registrar venta → Exportar → Reemplazar archivo → Actualizar página
```

### Ahora (Automático):
```
Registrar venta → ✅ Guardado automático → ✅ Sincronización instantánea
```

## 📊 Cómo Funciona

### Arquitectura:

```
┌─────────────────┐
│  Panel Admin    │
│ (admin/index)   │
└────────┬────────┘
         │
         │ POST /api/ventas
         ▼
┌─────────────────┐
│  Servidor Node  │
│   (server.js)   │
└────────┬────────┘
         │
         │ Escribe en
         ▼
┌─────────────────┐
│ rifa-data.json  │
│   (data/)       │
└────────┬────────┘
         │
         │ GET /api/data
         ▼
┌─────────────────┐
│ Página Pública  │
│   (index.html)  │
└─────────────────┘
```

### Flujo de Datos:

1. **Admin registra venta** → Envía a API
2. **API guarda en JSON** → Actualiza archivo
3. **Página pública lee API** → Muestra actualizado
4. **Todo automático** → Sin exportar manualmente

## 🔐 Seguridad

### Backups Automáticos
Cada vez que se guarda, se crea un backup:
```
data/backup-1708185600000.json
data/backup-1708189200000.json
```

### Restaurar Backup
Si algo sale mal:
```
1. Ve a data/
2. Busca el backup más reciente
3. Renómbralo a rifa-data.json
4. Reinicia el servidor
```

## 🛠️ Comandos Útiles

### Iniciar servidor:
```bash
npm start
```

### Iniciar con auto-reinicio (desarrollo):
```bash
npm run dev
```

### Detener servidor:
```
Presiona Ctrl + C en la terminal
```

### Ver logs:
Los logs aparecen en la terminal donde ejecutaste `npm start`

## 🌐 Desplegar en Producción

### Opción 1: Servidor Propio

1. Sube los archivos al servidor
2. Instala Node.js en el servidor
3. Ejecuta `npm install`
4. Ejecuta `npm start`
5. Configura un dominio

### Opción 2: Heroku (Gratis)

```bash
# Instalar Heroku CLI
heroku login
heroku create gsanz-rifas
git push heroku main
```

### Opción 3: Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel
vercel
```

## 📝 Variables de Entorno

Para producción, crea un archivo `.env`:

```
PORT=3000
NODE_ENV=production
```

## 🆘 Solución de Problemas

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error: "Port 3000 already in use"
Cambia el puerto en server.js:
```javascript
const PORT = 3001; // Cambiar a otro puerto
```

### Error: "EACCES: permission denied"
En Linux/Mac:
```bash
sudo npm start
```

### No se guardan los cambios
1. Verifica que el servidor esté corriendo
2. Revisa la consola del navegador (F12)
3. Verifica que la URL de la API sea correcta

### Página pública no se actualiza
1. Presiona Ctrl + F5 para forzar recarga
2. Verifica que el servidor esté corriendo
3. Revisa la consola del navegador

## 📞 Soporte

Para ayuda con la instalación:
- WhatsApp: +57 313 533 0859
- Instagram: @gsanzjoyeria

## 🎉 ¡Listo!

Ahora tienes un sistema completo con:
- ✅ Guardado automático
- ✅ Sincronización instantánea
- ✅ Sin exportar manualmente
- ✅ Backups automáticos
- ✅ API REST funcional
