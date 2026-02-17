# 💰 Sistema de Registro de Ventas - GSanz Rifas

## 🎯 Nuevas Funcionalidades

### ✅ Registro Completo de Compradores
Ahora puedes registrar toda la información del comprador:
- Nombre completo
- Teléfono
- Email (opcional)
- Notas adicionales

### ✅ Sistema de Descuentos Personalizados
- Aplica descuentos individuales a cada venta
- El sistema calcula automáticamente el total
- Registra el descuento aplicado para reportes

### ✅ Gestión Completa de Ventas
- Ver todas las ventas en una tabla organizada
- Buscar ventas por nombre, teléfono o número
- Ver detalles completos de cada venta
- Eliminar ventas si es necesario
- Exportar a CSV para Excel

## 🚀 Cómo Usar

### 1. Registrar una Venta

#### Paso 1: Ir a Gestión de Números
- Click en "🎯 Gestión Números" en el menú lateral
- Verás el grid con todos los números

#### Paso 2: Click en un Número Disponible
- Click en cualquier número verde (disponible)
- Se abrirá el modal de registro de venta

#### Paso 3: Llenar el Formulario
```
Número(s): 15 (o múltiples: 15,20,25)
Nombre: Juan Pérez
Teléfono: 3001234567
Email: juan@ejemplo.com (opcional)
Precio Base: $12,000 (automático)
Descuento: $2,000 (si aplica)
Total: $10,000 (calculado automáticamente)
Notas: Cliente frecuente, pago en efectivo
```

#### Paso 4: Registrar
- Click en "Registrar Venta"
- El número se marca como ocupado (rojo)
- La venta aparece en la tabla

### 2. Ver Información de una Venta

#### Opción A: Desde Gestión de Números
- Click en un número rojo (ocupado)
- Se muestra toda la información de la venta
- Opción para eliminar si es necesario

#### Opción B: Desde la Tabla de Ventas
- Ve a "💰 Ventas" en el menú
- Click en el ícono 👁️ para ver detalles
- Click en 🗑️ para eliminar

### 3. Aplicar Descuentos

El sistema calcula automáticamente con promociones:

#### Sin Descuento:
```
1 número = $12,000
2 números = $20,000 (promoción)
3 números = $32,000 (1 promo + 1 normal)
```

#### Con Descuento Personalizado:
```
Cliente compra 2 números:
Precio Base: $20,000
Descuento: $3,000
Total: $17,000
```

### 4. Buscar Ventas

En la sección "💰 Ventas":
- Usa el campo de búsqueda
- Busca por: nombre, teléfono, número
- Los resultados se filtran en tiempo real

### 5. Exportar Ventas

#### Exportar a CSV (Excel):
- Ve a "💰 Ventas"
- Click en "📊 Exportar CSV"
- Se descarga un archivo con todas las ventas
- Abre en Excel para análisis

#### Exportar para Sincronización:
- Ve a "🎯 Gestión Números"
- Click en "📥 Exportar Datos"
- Reemplaza `data/rifa-data.json`
- La página pública se actualiza

## 📊 Información Registrada

### Por Cada Venta:
```json
{
  "id": 1708185600000,
  "fecha": "2026-02-17T19:00:00.000Z",
  "numeros": [15, 20],
  "comprador": {
    "nombre": "Juan Pérez",
    "telefono": "3001234567",
    "email": "juan@ejemplo.com"
  },
  "precio": {
    "base": 20000,
    "descuento": 3000,
    "total": 17000
  },
  "notas": "Cliente frecuente",
  "estado": "pagado"
}
```

## 📈 Estadísticas Disponibles

### En Dashboard:
- Números vendidos
- Total recaudado
- Números disponibles
- Estado de la rifa

### En Sección Ventas:
- Total de ventas realizadas
- Total recaudado
- Total de descuentos aplicados

## 🔄 Flujo de Trabajo Completo

### Escenario 1: Venta Simple
```
1. Cliente llama: "Quiero el número 15"
2. Admin abre panel → Gestión Números
3. Click en número 15
4. Llena formulario:
   - Nombre: María García
   - Teléfono: 3109876543
   - Total: $12,000
5. Registrar Venta
6. Exportar Datos
7. Reemplazar archivo
8. Cliente ve número 15 como "Reservado"
```

### Escenario 2: Venta con Descuento
```
1. Cliente: "Quiero 2 números, ¿hay descuento?"
2. Admin: "Sí, 2 números por $20,000"
3. Cliente: "¿Me das $2,000 de descuento?"
4. Admin acepta
5. Registra venta:
   - Números: 25,30
   - Precio Base: $20,000
   - Descuento: $2,000
   - Total: $18,000
6. Sistema registra todo
7. Exporta y sincroniza
```

### Escenario 3: Venta Múltiple
```
1. Cliente compra 5 números: 10,11,12,13,14
2. Admin registra:
   - Números: 10,11,12,13,14
   - Precio Base: $52,000 (2 promos + 1 normal)
   - Descuento: $5,000 (cliente especial)
   - Total: $47,000
3. Los 5 números se marcan automáticamente
4. Exporta y sincroniza
```

## 🗑️ Eliminar Ventas

### Cuándo Eliminar:
- Cliente cancela la compra
- Error en el registro
- Devolución de dinero
- Número vendido por error

### Cómo Eliminar:
1. Click en el número ocupado
2. Ver información de la venta
3. Confirmar eliminación
4. Los números vuelven a estar disponibles
5. Exportar y sincronizar

## 📱 Información Visible para Clientes

En la página pública, los clientes ven:
- ✅ Números disponibles (verde)
- ❌ Números reservados (rojo con "Reservado")
- NO ven información del comprador (privacidad)

## 💡 Tips y Mejores Prácticas

### Registro de Ventas:
✅ Registra inmediatamente después de confirmar el pago
✅ Verifica el teléfono antes de guardar
✅ Agrega notas útiles (método de pago, referencia, etc.)
✅ Exporta después de cada venta para mantener sincronizado

### Descuentos:
✅ Define políticas claras de descuentos
✅ Registra siempre el motivo en las notas
✅ Revisa el total antes de confirmar
✅ Mantén registro de descuentos para análisis

### Gestión:
✅ Revisa la tabla de ventas diariamente
✅ Exporta CSV semanalmente para backup
✅ Verifica que los números coincidan
✅ Mantén actualizada la página pública

## 🆘 Solución de Problemas

### No puedo registrar una venta
- Verifica que el número esté disponible (verde)
- Asegúrate de llenar todos los campos requeridos
- Revisa que el número esté en el rango configurado

### El descuento no se aplica
- Ingresa el descuento en el campo "Descuento ($)"
- El total se calcula automáticamente
- Verifica que el descuento no sea mayor al precio base

### No veo la venta en la tabla
- Ve a la sección "💰 Ventas"
- Usa el buscador si hay muchas ventas
- Recarga la página si es necesario

### Eliminé una venta por error
- No hay forma de recuperarla
- Debes registrarla nuevamente
- Mantén backups del archivo JSON

## 📞 Soporte

Para dudas o problemas:
- WhatsApp: +57 313 533 0859
- Instagram: @gsanzjoyeria

## 🔜 Próximas Mejoras

- [ ] Estados de pago (pendiente, pagado, cancelado)
- [ ] Recordatorios de pago
- [ ] Integración con WhatsApp
- [ ] Reportes automáticos
- [ ] Historial de cambios
- [ ] Backup automático
