# 📘 Guía para GitHub Pages - GSanz Rifas

## 🎯 Cómo Funciona

Este sistema está diseñado para funcionar en GitHub Pages (hosting estático, sin backend).

### Arquitectura:

```
┌─────────────────┐
│  Panel Admin    │ ← Trabaja con localStorage (navegador)
│ (admin/index)   │
└────────┬────────┘
         │
         │ 1. Registra ventas
         │ 2. Guarda en localStorage
         │ 3. Descarga JSON
         ▼
┌─────────────────┐
│ rifa-data.json  │ ← Archivo en GitHub
│   (data/)       │
└────────┬────────┘
         │
         │ Lee cada 30s
         ▼
┌─────────────────┐
│ Página Pública  │ ← Muestra números actualizados
│   (index.html)  │
└─────────────────┘
```

## 🚀 Flujo de Trabajo

### 1. Registrar Venta

```
1. Abre: https://tuusuario.github.io/gsanz/admin
2. Login: usuario "cris", contraseña "1823"
3. Ve a "🎯 Gestión Números"
4. Click en número verde
5. Llena formulario
6. Click "Registrar Venta"
7. ✅ Se guarda en localStorage del navegador
```

### 2. Sincronizar con GitHub

```
8. Click en "📥 Descargar JSON"
9. Se descarga: rifa-data.json
10. Ve a tu repositorio GitHub
11. Navega a: data/rifa-data.json
12. Click "Edit" o "Upload"
13. Reemplaza el contenido
14. Commit changes
```

### 3. Verificar en Público

```
15. Abre: https://tuusuario.github.io/gsanz
16. Espera 30 segundos (o Ctrl + F5)
17. ✅ Número aparece como "Reservado"
```

## 💾 localStorage como Base de Datos

### ¿Qué es localStorage?
- Almacenamiento del navegador
- Persiste al recargar la página
- Solo se borra si limpias el navegador
- Capacidad: ~5-10MB

### Ventajas:
- ✅ Rápido
- ✅ No necesita servidor
- ✅ Funciona offline
- ✅ Gratis

### Desventajas:
- ❌ Solo en ese navegador
- ❌ Se pierde si limpias caché
- ❌ No sincroniza automáticamente

## 🔄 Opciones de Sincronización

### Opción 1: Manual (Recomendada)
```
Registrar venta → Descargar JSON → Subir a GitHub
```

**Pros:** Simple, seguro, control total
**Contras:** Manual

### Opción 2: GitHub API (Avanzada)
Puedes implementar sincronización automática usando GitHub API:
```javascript
// Requiere token de GitHub
fetch('https://api.github.com/repos/usuario/repo/contents/data/rifa-data.json', {
    method: 'PUT',
    headers: {
        'Authorization': 'token TU_TOKEN',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        message: 'Actualizar ventas',
        content: btoa(JSON.stringify(data))
    })
})
```

### Opción 3: Netlify/Vercel con Functions
Si usas Netlify o Vercel en lugar de GitHub Pages, puedes usar serverless functions.

## 📥 Botones del Admin

### 📥 Descargar JSON
- Descarga el archivo actualizado
- Incluye todas las ventas
- Listo para subir a GitHub

### 📤 Cargar JSON
- Importa un archivo JSON
- Útil para restaurar backups
- Sobrescribe datos locales

### 🔄 Sincronizar
- Lee el archivo de GitHub
- Actualiza localStorage
- Útil para sincronizar entre dispositivos

## 🔐 Seguridad

### localStorage es Seguro?
- ✅ Solo accesible desde tu dominio
- ✅ No se envía al servidor
- ❌ Visible en DevTools (F12)
- ❌ No encriptado por defecto

### Recomendaciones:
1. No guardes contraseñas en localStorage
2. Usa HTTPS siempre
3. Haz backups regulares
4. Limita acceso al admin

## 💡 Tips y Mejores Prácticas

### 1. Backup Regular
```
- Descarga JSON cada día
- Guarda en carpeta "backups"
- Nombra con fecha: rifa-2026-02-17.json
```

### 2. Múltiples Dispositivos
```
- Usa "🔄 Sincronizar" al abrir admin
- Descarga JSON antes de cerrar
- Sube a GitHub inmediatamente
```

### 3. Trabajo en Equipo
```
- Solo una persona a la vez
- Sincroniza antes de trabajar
- Sube cambios inmediatamente
- Comunica cuando termines
```

### 4. Recuperación de Datos
```
Si perdiste datos:
1. Ve a GitHub
2. Busca commits anteriores
3. Descarga versión anterior
4. Usa "📤 Cargar JSON"
```

## 🆘 Solución de Problemas

### Problema: "Registré venta pero se perdió al recargar"
**Causa:** localStorage se borró
**Solución:**
```
1. Verifica que no limpiaste caché
2. Usa "🔄 Sincronizar" para recuperar
3. Descarga JSON después de cada venta
```

### Problema: "No puedo subir a GitHub"
**Causa:** Permisos o archivo muy grande
**Solución:**
```
1. Verifica que tienes permisos de escritura
2. El archivo debe ser < 1MB
3. Usa GitHub Desktop si falla en web
```

### Problema: "Página pública no se actualiza"
**Causa:** Caché de GitHub Pages
**Solución:**
```
1. Espera 1-2 minutos
2. Presiona Ctrl + Shift + R
3. Verifica que subiste el archivo correcto
```

### Problema: "Perdí todos los datos"
**Causa:** localStorage borrado
**Solución:**
```
1. Ve a GitHub
2. Descarga data/rifa-data.json
3. Usa "📤 Cargar JSON" en admin
4. Datos restaurados
```

## 📊 Comparación de Soluciones

| Característica | GitHub Pages | Con Backend |
|----------------|--------------|-------------|
| Costo | Gratis | $5-20/mes |
| Configuración | Simple | Compleja |
| Sincronización | Manual | Automática |
| Velocidad | Rápida | Rápida |
| Escalabilidad | Limitada | Alta |
| Mantenimiento | Bajo | Alto |

## 🎓 Conceptos Clave

### Hosting Estático
- Solo archivos HTML, CSS, JS
- No ejecuta código del servidor
- GitHub Pages, Netlify, Vercel

### localStorage
- Base de datos del navegador
- Clave-valor
- Persistente

### JSON
- Formato de datos
- Legible por humanos
- Fácil de editar

## 📞 Soporte

Para dudas sobre GitHub Pages:
- WhatsApp: +57 313 533 0859
- Instagram: @gsanzjoyeria

## 🔮 Futuras Mejoras

Posibles mejoras sin backend:
- [ ] Sincronización con Google Sheets
- [ ] Integración con GitHub API
- [ ] PWA para trabajar offline
- [ ] Exportar a Excel automático
- [ ] Notificaciones por email (usando servicios externos)
