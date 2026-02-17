# 🔄 Sistema de Sincronización GSanz Rifas

## 📊 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                    PANEL DE ADMINISTRACIÓN                   │
│                      (admin/index.html)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 1. Admin marca números vendidos
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              GESTIÓN DE NÚMEROS (admin/admin.js)            │
│  • Click en número → toggleNumero()                         │
│  • Actualiza array: numerosOcupados                         │
│  • Guarda en localStorage                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 2. Click en "📥 Exportar Datos"
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              FUNCIÓN exportarDatos()                        │
│  • Crea objeto JSON con toda la configuración              │
│  • Incluye: rifa, contacto, numerosOcupados, lastUpdate    │
│  • Genera archivo descargable: rifa-data.json              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 3. Descarga automática
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  ARCHIVO DESCARGADO                         │
│                   rifa-data.json                            │
│  {                                                          │
│    "encrypted": false,                                      │
│    "rifa": {                                                │
│      "numerosOcupados": [1, 5, 10, 15],                    │
│      "numeroInicio": 1,                                     │
│      "numeroFin": 100,                                      │
│      ...                                                    │
│    }                                                        │
│  }                                                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 4. ACCIÓN MANUAL: Reemplazar archivo
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              ARCHIVO COMPARTIDO                             │
│            data/rifa-data.json                              │
│  • Ubicación central de datos                              │
│  • Leído por página pública                                │
│  • Actualizado manualmente desde admin                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 5. Lectura automática cada 30s
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  PÁGINA PÚBLICA                             │
│                   (index.html)                              │
│                                                             │
│  cargarConfiguracionRifa() {                                │
│    fetch('data/rifa-data.json')                             │
│    → Actualiza numerosOcupados                              │
│    → Regenera tablero de números                            │
│    → Marca números como "Reservado"                         │
│  }                                                          │
│                                                             │
│  setInterval(cargarConfiguracionRifa, 30000)                │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Flujo de Datos Detallado

### 1️⃣ Admin Marca Números
```javascript
// admin/admin.js
function toggleNumero(numero, elemento) {
    if (numerosOcupados.includes(numero)) {
        // Desmarcar
        numerosOcupados.splice(index, 1);
    } else {
        // Marcar como ocupado
        numerosOcupados.push(numero);
    }
    guardarNumerosOcupados();
}
```

### 2️⃣ Exportar Datos
```javascript
// admin/admin.js
function exportarDatos() {
    const dataToExport = {
        encrypted: false,
        rifa: config.rifa,
        contacto: config.contacto,
        lastUpdate: Date.now()
    };
    
    // Crear blob y descargar
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)]);
    // ... descarga automática
}
```

### 3️⃣ Reemplazar Archivo (MANUAL)
```
Descargas/rifa-data.json  →  data/rifa-data.json
```

### 4️⃣ Página Pública Lee Datos
```javascript
// script.js
async function cargarConfiguracionRifa() {
    const response = await fetch('data/rifa-data.json?t=' + Date.now());
    const data = await response.json();
    
    numerosOcupados = data.rifa.numerosOcupados || [];
    NUMERO_INICIO = data.rifa.numeroInicio;
    NUMERO_FIN = data.rifa.numeroFin;
    
    generarTablero(); // Regenera con números actualizados
}

// Actualizar cada 30 segundos
setInterval(cargarConfiguracionRifa, 30000);
```

## ✅ Ventajas del Sistema Actual

1. **Simple**: No requiere backend ni base de datos
2. **Seguro**: Los datos no se modifican automáticamente
3. **Control**: El admin decide cuándo sincronizar
4. **Portable**: Funciona en cualquier servidor web estático
5. **Sin dependencias**: Solo HTML, CSS, JavaScript

## ⚠️ Limitaciones

1. **Manual**: Requiere reemplazar el archivo manualmente
2. **No tiempo real**: Actualización cada 30 segundos
3. **Sin validación**: No hay confirmación de venta real
4. **Concurrencia**: Múltiples admins pueden causar conflictos

## 🚀 Para Producción (Futuro)

### Opción 1: Backend Simple (Node.js)
```javascript
// server.js
app.post('/api/numeros', (req, res) => {
    const { numerosOcupados } = req.body;
    fs.writeFileSync('data/rifa-data.json', JSON.stringify(data));
    res.json({ success: true });
});
```

### Opción 2: Firebase Realtime Database
```javascript
// Escritura desde admin
firebase.database().ref('rifa').set({
    numerosOcupados: [1, 5, 10]
});

// Lectura en tiempo real desde público
firebase.database().ref('rifa').on('value', (snapshot) => {
    actualizarNumeros(snapshot.val());
});
```

### Opción 3: API REST + MySQL
```
Admin → POST /api/numeros → MySQL → GET /api/numeros → Público
```

## 📝 Notas Técnicas

### Cache Busting
```javascript
fetch('data/rifa-data.json?t=' + Date.now())
```
El parámetro `?t=` evita que el navegador use caché antiguo.

### Validación de Datos
```javascript
if (data.encrypted) {
    console.error('Datos encriptados');
    return;
}
```
Verifica que los datos no estén encriptados antes de usarlos.

### Rango Dinámico
```javascript
NUMERO_INICIO = rifaConfig.numeroInicio;
NUMERO_FIN = rifaConfig.numeroFin;
TOTAL_NUMEROS = NUMERO_FIN - NUMERO_INICIO + 1;
```
El rango se configura dinámicamente desde el archivo JSON.

## 🔧 Troubleshooting

### Problema: Los cambios no se reflejan
**Solución**: 
1. Verifica que reemplazaste el archivo correcto
2. Limpia caché: Ctrl + F5
3. Espera 30 segundos

### Problema: Error al cargar JSON
**Solución**:
1. Valida el JSON en jsonlint.com
2. Verifica que no haya caracteres especiales
3. Asegúrate de que el archivo esté en UTF-8

### Problema: Números duplicados
**Solución**:
1. Abre data/rifa-data.json
2. Busca el array numerosOcupados
3. Elimina duplicados manualmente
4. Guarda el archivo

## 📞 Soporte

Para implementar sincronización automática o resolver problemas:
- WhatsApp: +57 313 533 0859
- Instagram: @gsanzjoyeria
