# ⚡ Inicio Rápido - GSanz Rifas

## 🎯 Para Empezar en 3 Pasos

### 1️⃣ Accede al Admin
```
Abre: admin/login.html
Usuario: cris
Contraseña: 1823
```

### 2️⃣ Marca Números Vendidos
```
1. Ve a "Gestión de Números"
2. Click en los números vendidos (se ponen rojos)
3. Click en "📥 Exportar Datos"
4. Descarga el archivo
```

### 3️⃣ Actualiza la Página Pública
```
1. Reemplaza: data/rifa-data.json
2. Con el archivo descargado
3. ¡Listo! Los cambios se ven en 30 segundos
```

## 📱 Acceso Rápido

### Página Pública
- **URL**: `index.html`
- **Usuarios ven**: Números disponibles y reservados
- **Actualización**: Automática cada 30 segundos

### Panel Admin
- **URL**: `admin/login.html`
- **Acceso**: Solo con usuario y contraseña
- **Funciones**: Configurar, marcar números, sorteo

## 🔄 Flujo de Trabajo Diario

```
Cliente reserva → Confirmas pago → Marcas número en admin
→ Exportas datos → Reemplazas archivo → Cliente ve "Reservado"
```

## 📊 Secciones del Admin

| Sección | Función |
|---------|---------|
| 📊 Dashboard | Ver estadísticas y estado |
| ⚙️ Configuración | Editar premio, precios, rango |
| 🎯 Gestión Números | Marcar vendidos, exportar |
| 🎲 Realizar Sorteo | Registrar ganador |

## 💡 Tips Rápidos

✅ **Exporta después de cada venta** para mantener actualizado
✅ **Guarda backups** del archivo data/rifa-data.json
✅ **Verifica el rango** antes de iniciar (1-100, 1-50, etc.)
✅ **Limpia caché** si no ves cambios (Ctrl + F5)

## 🆘 Problemas Comunes

### No veo los cambios
→ Reemplazaste el archivo en `data/rifa-data.json`?
→ Espera 30 segundos o recarga (Ctrl + F5)

### No puedo marcar números
→ Verifica que estés logueado en admin
→ Recarga la página del admin

### Error al exportar
→ Permite descargas en tu navegador
→ Intenta con Chrome o Firefox

## 📞 Contacto

WhatsApp: +57 313 533 0859
Instagram: @gsanzjoyeria

## 📚 Documentación Completa

- `GUIA-ADMIN.md` - Guía detallada del panel
- `SINCRONIZACION.md` - Cómo funciona la sincronización
- `data/README.md` - Estructura de datos
- `admin/SECURITY.md` - Seguridad y encriptación
