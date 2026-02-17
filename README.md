# GSanz Joyería - Sistema de Rifas

Sistema web profesional para gestión de rifas de joyería con panel de administración y sincronización en tiempo real.

## 🎯 Características

### Sitio Público
- Diseño elegante con estética de joyería de lujo
- Visualización del premio con zoom
- Tablero interactivo de números disponibles
- Sistema de reserva en tiempo real
- Precios y promociones configurables
- Actualización automática cada 30 segundos
- Responsive (móvil y desktop)

### Panel de Administración
- Dashboard con estadísticas en tiempo real
- Sistema completo de registro de ventas
- Información detallada de compradores (nombre, teléfono, email)
- Sistema de descuentos personalizados
- Tabla de ventas con búsqueda y filtros
- Exportación a CSV para análisis
- Configuración completa de la rifa
- Gestión visual de números vendidos
- Sistema de sorteo con registro de ganadores
- Exportación de datos para sincronización
- Autenticación segura con encriptación AES-256

## 🚀 Inicio Rápido

### Ver el Sitio Público
1. Abre `index.html` en tu navegador
2. Explora los números disponibles
3. Selecciona y reserva números

### Acceder al Admin
1. Abre `admin/login.html`
2. Usuario: `cris`
3. Contraseña: `1823`

### Sincronizar Cambios
1. Marca números vendidos en el admin
2. Click en "📥 Exportar Datos"
3. Reemplaza `data/rifa-data.json` con el archivo descargado
4. Los cambios se reflejan automáticamente en el sitio público

## 📚 Documentación

- **[⚡ Inicio Rápido](INICIO-RAPIDO.md)** - Guía de 3 pasos para empezar
- **[🎯 Guía Admin](GUIA-ADMIN.md)** - Manual completo del panel de administración
- **[💰 Sistema de Ventas](SISTEMA-VENTAS.md)** - Registro de compradores y descuentos
- **[🔄 Sincronización](SINCRONIZACION.md)** - Cómo funciona la sincronización de datos
- **[📊 Datos](data/README.md)** - Estructura del archivo de datos
- **[🔐 Seguridad](admin/SECURITY.md)** - Encriptación y seguridad
- **[✅ Testing](TESTING.md)** - Lista de verificación y pruebas

## 🔐 Seguridad

- Contraseñas encriptadas con SHA-256 + salt
- Datos sensibles con AES-256
- Tokens de sesión con expiración de 24 horas
- Validación de sesión en cada operación

## 📁 Estructura del Proyecto

```
gsanz/
├── index.html                 # Página principal pública
├── styles.css                 # Estilos del sitio público
├── script.js                  # Lógica del sitio público
├── cadena-premio.jpg          # Imagen del premio
├── logo-gsanz.svg             # Logo de la joyería
│
├── data/                      # Datos compartidos
│   ├── rifa-data.json        # Configuración y números (sincronización)
│   └── README.md             # Documentación de datos
│
├── admin/                     # Panel de administración
│   ├── login.html            # Login del admin
│   ├── login.js              # Lógica de autenticación
│   ├── index.html            # Panel de administración
│   ├── admin.js              # Lógica del admin
│   ├── admin-styles.css      # Estilos del admin
│   ├── users.json            # Usuarios encriptados
│   ├── config.json           # Configuración local
│   ├── crypto-utils.js       # Utilidades de encriptación
│   ├── encrypt-data.html     # Herramienta de encriptación
│   └── SECURITY.md           # Documentación de seguridad
│
└── docs/                      # Documentación
    ├── README.md             # Este archivo
    ├── INICIO-RAPIDO.md      # Guía rápida
    ├── GUIA-ADMIN.md         # Manual del admin
    └── SINCRONIZACION.md     # Documentación técnica
```

## 🔄 Flujo de Sincronización

```
Admin marca números → Exporta datos → Reemplaza archivo
→ Página pública actualiza (30s) → Usuarios ven cambios
```

## 🎨 Tecnologías

- HTML5
- CSS3 (Grid, Flexbox, Animaciones)
- JavaScript (Vanilla ES6+)
- CryptoJS (AES-256, SHA-256)
- Google Fonts (Cormorant Garamond, Montserrat)

## 💡 Características Técnicas

### Frontend
- Diseño responsive mobile-first
- Optimizaciones para touch devices
- Cache busting para actualizaciones
- Lazy loading de imágenes
- Smooth scroll y animaciones CSS

### Seguridad
- Encriptación AES-256 para datos sensibles
- Hash SHA-256 con salt para contraseñas
- Tokens de sesión con expiración
- Validación de entrada en formularios

### Sincronización
- Polling cada 30 segundos
- Exportación manual de datos
- Validación de estructura JSON
- Manejo de errores y fallbacks

## 📱 Contacto

- WhatsApp: +57 313 533 0859
- Instagram: @gsanzjoyeria

## 📄 Licencia

© 2026 GSanz Joyería. Todos los derechos reservados.
