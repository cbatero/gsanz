# 🔄 Sincronización Rápida - Paso a Paso

## ⚠️ IMPORTANTE: Cómo Funciona la Sincronización

El sistema tiene DOS partes separadas:

1. **Panel Admin** (`admin/index.html`) - Donde registras ventas
2. **Página Pública** (`index.html`) - Donde los clientes ven números

Estas dos partes NO se comunican automáticamente. Debes sincronizarlas manualmente.

## 📋 Flujo Completo de Venta

### Paso 1: Registrar Venta en Admin
```
1. Abre: admin/index.html
2. Login: usuario "cris", contraseña "1823"
3. Ve a "🎯 Gestión Números"
4. Click en un número VERDE (disponible)
5. Llena el formulario:
   - Nombre del comprador
   - Teléfono
   - Email (opcional)
   - Descuento (si aplica)
6. Click "Registrar Venta"
```

**Resultado:** El número se marca ROJO en el admin ✅

### Paso 2: Exportar Datos
```
7. Verás un mensaje preguntando si deseas exportar
8. Click "Aceptar" (o click en "📥 Exportar Datos")
9. Se descarga el archivo: rifa-data.json
```

**Resultado:** Tienes el archivo actualizado en Descargas 📥

### Paso 3: Reemplazar Archivo
```
10. Ve a la carpeta del proyecto
11. Abre la carpeta: data/
12. Reemplaza el archivo rifa-data.json
    (Copia el de Descargas y pégalo aquí)
```

**Resultado:** El archivo está actualizado en el servidor 💾

### Paso 4: Verificar en Página Pública
```
13. Abre: index.html (o recarga si ya está abierta)
14. Espera 30 segundos (actualización automática)
    O presiona Ctrl + F5 para forzar recarga
15. El número debe aparecer ROJO con "Reservado"
```

**Resultado:** Los clientes ven el número como vendido ✅

## 🎯 Ejemplo Completo

### Escenario: Cliente compra número 15

**EN EL ADMIN:**
```
1. Login en admin/index.html
2. Gestión Números → Click en número 15
3. Formulario:
   Nombre: María García
   Teléfono: 3001234567
   Total: $12,000
4. Registrar Venta
5. ¡Número 15 ahora es ROJO en admin!
```

**SINCRONIZAR:**
```
6. Click "Aceptar" en el mensaje
7. Se descarga rifa-data.json
8. Ir a: proyecto/data/
9. Reemplazar rifa-data.json
```

**EN LA PÁGINA PÚBLICA:**
```
10. Abrir index.html
11. Esperar 30 segundos
12. ¡Número 15 ahora dice "Reservado"!
```

## ⚡ Indicadores Visuales

### En el Admin:
- **Número VERDE** = Disponible (click para vender)
- **Número ROJO** = Ocupado (click para ver info)
- **Botón con punto rojo pulsante** = Hay cambios sin sincronizar

### En la Página Pública:
- **Número VERDE** = Disponible (se puede seleccionar)
- **Número ROJO "Reservado"** = Vendido (no se puede seleccionar)

## 🔍 Verificar Sincronización

### ¿Cómo saber si está sincronizado?

**Método 1: Verificar el archivo**
```
1. Abre: data/rifa-data.json
2. Busca: "numerosOcupados"
3. Debe incluir el número vendido
   Ejemplo: "numerosOcupados": [15, 20, 25]
```

**Método 2: Verificar en la página**
```
1. Abre index.html
2. Busca el número vendido
3. Debe estar ROJO con "Reservado"
```

**Método 3: Consola del navegador**
```
1. En index.html presiona F12
2. Ve a Console
3. Busca: "Configuración cargada"
4. Verifica numerosOcupados
```

## ❌ Problemas Comunes

### Problema 1: "Registré venta pero no aparece en público"
**Causa:** No exportaste y reemplazaste el archivo
**Solución:**
```
1. Ve a admin → Gestión Números
2. Click "📥 Exportar Datos"
3. Reemplaza data/rifa-data.json
4. Recarga la página pública (Ctrl + F5)
```

### Problema 2: "El número está rojo en admin pero verde en público"
**Causa:** El archivo no está sincronizado
**Solución:**
```
1. Exporta desde admin
2. Verifica que reemplazaste el archivo correcto
3. Ruta: data/rifa-data.json (no otro lugar)
4. Recarga página pública
```

### Problema 3: "Exporté pero sigue sin aparecer"
**Causa:** Caché del navegador
**Solución:**
```
1. Presiona Ctrl + Shift + Delete
2. Limpia caché del navegador
3. O usa Ctrl + F5 para forzar recarga
4. Espera 30 segundos
```

### Problema 4: "No sé dónde está el archivo descargado"
**Causa:** Se descargó en carpeta Descargas
**Solución:**
```
1. Ve a: C:\Users\TuUsuario\Downloads\
2. Busca: rifa-data.json
3. Cópialo
4. Pégalo en: proyecto/data/rifa-data.json
```

## 📝 Checklist de Sincronización

Después de cada venta, verifica:

- [ ] Número está ROJO en admin
- [ ] Venta aparece en tabla de ventas
- [ ] Exportaste el archivo (📥 Exportar Datos)
- [ ] Reemplazaste data/rifa-data.json
- [ ] Recargaste la página pública
- [ ] Número aparece como "Reservado" en público

## 🚀 Tips para Agilizar

### Tip 1: Exporta después de cada venta
No esperes a vender varios números. Exporta inmediatamente.

### Tip 2: Ten la carpeta data/ abierta
Mantén abierta la carpeta data/ para reemplazar rápido.

### Tip 3: Usa el mensaje de confirmación
Cuando registres venta, acepta exportar inmediatamente.

### Tip 4: Verifica siempre
Después de sincronizar, abre la página pública y verifica.

## 🔮 Futuras Mejoras

En una versión futura con backend:
- ✅ Sincronización automática
- ✅ Sin necesidad de exportar manualmente
- ✅ Actualización en tiempo real
- ✅ Múltiples admins simultáneos

Por ahora, sigue este proceso manual para garantizar que todo funcione correctamente.

## 📞 Soporte

Si tienes problemas con la sincronización:
- WhatsApp: +57 313 533 0859
- Instagram: @gsanzjoyeria
