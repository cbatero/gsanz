# ⚡ Inicio Rápido - 3 Pasos

## 🚀 Paso 1: Instalar Node.js

Si no tienes Node.js instalado:
1. Ve a: https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Instala (Next, Next, Install)
4. Reinicia la computadora

## 📦 Paso 2: Instalar Dependencias

Abre la terminal en esta carpeta y ejecuta:

```bash
npm install
```

Espera a que termine (puede tardar 1-2 minutos).

## ▶️ Paso 3: Iniciar el Servidor

```bash
npm start
```

Verás:
```
╔════════════════════════════════════════════╗
║   🎯 Servidor GSanz Rifas Iniciado        ║
╠════════════════════════════════════════════╣
║   Puerto: 3000                            ║
║   URL Admin: http://localhost:3000/admin  ║
║   URL Público: http://localhost:3000      ║
╚════════════════════════════════════════════╝
```

## 🎯 Usar el Sistema

### Admin:
1. Abre: http://localhost:3000/admin
2. Login: usuario "cris", contraseña "1823"
3. Registra ventas normalmente
4. ✅ Se guarda automáticamente

### Público:
1. Abre: http://localhost:3000
2. Los números se actualizan automáticamente
3. Los clientes ven números reservados en tiempo real

## ✅ Ventajas del Nuevo Sistema

### Antes:
- ❌ Registrar venta
- ❌ Exportar archivo
- ❌ Reemplazar manualmente
- ❌ Actualizar página

### Ahora:
- ✅ Registrar venta
- ✅ Guardado automático
- ✅ Sincronización instantánea
- ✅ Sin pasos manuales

## 🔄 Flujo de Trabajo

```
1. Cliente llama: "Quiero el número 15"
2. Admin: Login → Gestión Números → Click 15
3. Llena formulario → Registrar Venta
4. ✅ Guardado automático en servidor
5. ✅ Número 15 aparece "Reservado" en público
6. ¡Listo! Sin exportar nada
```

## 📝 Notas Importantes

### Mantener el Servidor Corriendo
- El servidor debe estar corriendo para que funcione
- No cierres la terminal donde ejecutaste `npm start`
- Si cierras, vuelve a ejecutar `npm start`

### Detener el Servidor
- Presiona `Ctrl + C` en la terminal
- O cierra la terminal

### Backups Automáticos
- Cada cambio crea un backup en `data/backup-*.json`
- Si algo sale mal, puedes restaurar

## 🆘 Problemas Comunes

### "npm no se reconoce como comando"
→ Instala Node.js primero

### "Error: Cannot find module"
→ Ejecuta `npm install`

### "Port 3000 already in use"
→ Cierra otros programas que usen el puerto 3000

### No se guardan los cambios
→ Verifica que el servidor esté corriendo (terminal abierta)

## 📚 Más Información

- **INSTALACION.md** - Guía completa de instalación
- **SISTEMA-VENTAS.md** - Cómo usar el sistema de ventas
- **README.md** - Documentación completa

## 📞 Soporte

WhatsApp: +57 313 533 0859
Instagram: @gsanzjoyeria
