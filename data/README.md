# 📊 Sincronización de Datos - GSanz Rifas

Este directorio contiene el archivo de datos compartido entre el panel de administración y la página pública.

## 📁 Archivo Principal

**`rifa-data.json`** - Contiene toda la configuración de la rifa actual

### Estructura:
```json
{
  "encrypted": false,
  "rifa": {
    "nombre": "Nombre del premio",
    "descripcion": "Descripción del premio",
    "valor": "Valor en COP",
    "imagen": "ruta/imagen.jpg",
    "caracteristicas": ["Lista", "de", "características"],
    "precioNumero": "Precio individual",
    "precioPromo": "Precio promocional",
    "numeroInicio": 1,
    "numeroFin": 100,
    "numerosOcupados": [1, 5, 10],
    "fechaSorteo": "YYYY-MM-DD",
    "juegoLoteria": "Nombre del juego",
    "estado": "activa",
    "ganador": null
  },
  "contacto": {
    "whatsapp": "573135330859",
    "instagram": "@gsanzjoyeria"
  },
  "lastUpdate": 1738022400000
}
```

## 🔄 Cómo Sincronizar

### Método 1: Exportar desde Admin (Recomendado)

1. Abre el panel admin: `admin/index.html`
2. Ve a "Gestión de Números"
3. Marca los números vendidos
4. Click en "📥 Exportar Datos"
5. Reemplaza `data/rifa-data.json` con el archivo descargado

### Método 2: Copiar desde Consola

1. Realiza cambios en el admin
2. Abre la consola del navegador (F12)
3. Copia el JSON que aparece
4. Pega en `data/rifa-data.json`

### Método 3: Edición Manual

1. Abre `data/rifa-data.json`
2. Edita los valores directamente
3. Guarda el archivo
4. La página pública se actualizará automáticamente

## ⚙️ Configuración de Números

### Rango de Números
- **numeroInicio**: Primer número de la rifa (ej: 1)
- **numeroFin**: Último número de la rifa (ej: 100)
- **Total de números**: Se calcula automáticamente

### Números Ocupados
- **numerosOcupados**: Array con los números vendidos
- Ejemplo: `[1, 5, 10, 15, 20]`
- Los números en este array aparecerán como "Reservado" en la página pública

## 🔄 Actualización Automática

La página pública verifica cambios cada 30 segundos:
- Lee `data/rifa-data.json`
- Actualiza números disponibles/ocupados
- Refleja cambios de configuración

## 📝 Notas Importantes

1. **Formato JSON**: Asegúrate de que el archivo sea JSON válido
2. **Números válidos**: Solo números dentro del rango (numeroInicio - numeroFin)
3. **Sin duplicados**: No repitas números en numerosOcupados
4. **Backup**: Guarda copias antes de hacer cambios importantes

## 🚀 Para Producción

En un entorno de producción real:
1. Implementa un backend (Node.js, PHP, Python)
2. Usa una base de datos (MySQL, MongoDB)
3. Crea una API REST para sincronización
4. Implementa autenticación en las peticiones
5. Usa WebSockets para actualizaciones en tiempo real

## 🔧 Troubleshooting

### Los cambios no se reflejan:
- Verifica que el archivo JSON sea válido
- Limpia la caché del navegador (Ctrl + F5)
- Revisa la consola del navegador por errores

### Números no aparecen correctamente:
- Verifica que numeroInicio y numeroFin sean correctos
- Asegúrate de que numerosOcupados contenga solo números válidos
- Revisa que no haya números duplicados

### Error al cargar:
- Verifica la ruta del archivo
- Asegúrate de que el servidor web esté corriendo
- Revisa permisos de lectura del archivo
