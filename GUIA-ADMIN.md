# 🎯 Guía Rápida - Panel de Administración GSanz

## 🚀 Inicio Rápido

### 1. Acceder al Panel Admin
- Abre: `admin/login.html`
- Usuario: `cris`
- Contraseña: `1823`

### 2. Configurar la Rifa

#### Dashboard
- Ve estadísticas en tiempo real
- Números vendidos, recaudado, disponibles
- Estado de la rifa

#### Configuración
- Nombre del premio
- Descripción y valor
- Características (una por línea)
- Rango de números (inicio - fin)
- Precios (individual y promoción)
- Fecha del sorteo
- Juego de lotería

#### Gestión de Números
- **Marcar números vendidos**: Click en el número
- **Marcar múltiples**: Botón "Marcar Múltiples" (ej: 1,5,10,15)
- **Desmarcar todos**: Botón "Desmarcar Todos"
- **Buscar número**: Campo de búsqueda
- **Exportar datos**: Botón "📥 Exportar Datos"

#### Realizar Sorteo
- Ingresa el número ganador
- Confirma el sorteo
- Registra información del ganador

## 🔄 Sincronización con Página Pública

### Flujo de Trabajo

1. **Marca los números vendidos** en "Gestión de Números"
2. **Click en "📥 Exportar Datos"**
3. **Descarga el archivo** `rifa-data.json`
4. **Reemplaza** el archivo en `data/rifa-data.json`
5. **Listo!** La página pública se actualiza automáticamente

### Verificación
- La página pública verifica cambios cada 30 segundos
- Los números marcados aparecen como "Reservado"
- Los cambios de configuración se reflejan inmediatamente

## 📋 Configuración de Números

### Rango Personalizado
Puedes configurar cualquier rango de números:
- Del 1 al 50
- Del 1 al 100
- Del 1 al 200
- Etc.

Solo configura en "Configuración":
- **Número Inicio**: Primer número (ej: 1)
- **Número Fin**: Último número (ej: 100)

### Números Ocupados
Los números marcados en el admin:
- Aparecen en rojo en el panel
- Aparecen como "Reservado" en la página pública
- No se pueden seleccionar por los usuarios

## 🔐 Seguridad

### Datos Encriptados
- Usuarios: Encriptados con AES-256
- Contraseñas: Hash SHA-256 con salt
- Sesiones: Tokens con expiración de 24 horas

### Cambiar Contraseña
1. Abre `admin/encrypt-data.html`
2. Ingresa el nuevo usuario/contraseña
3. Copia el JSON encriptado
4. Reemplaza en `admin/users.json`

## 💡 Consejos

### Flujo Recomendado
1. Configura la rifa una vez (nombre, premio, rango)
2. A medida que vendes, marca los números
3. Exporta y actualiza el archivo cada vez que vendas
4. Los clientes ven los números actualizados en tiempo real

### Backup
- Guarda copias del archivo `data/rifa-data.json`
- Especialmente antes de realizar el sorteo
- Puedes restaurar desde cualquier backup

### Nueva Rifa
1. Realiza el sorteo actual
2. Click en "Nueva Rifa" en la sección Sorteo
3. Configura el nuevo premio
4. Exporta y actualiza el archivo

## 🆘 Solución de Problemas

### Los cambios no se ven en la página pública
- Verifica que reemplazaste el archivo en `data/rifa-data.json`
- Limpia la caché del navegador (Ctrl + F5)
- Espera 30 segundos para la actualización automática

### Error al exportar
- Verifica que el navegador permita descargas
- Revisa la consola del navegador (F12)
- Intenta con otro navegador

### Números no se marcan
- Verifica que estés en el rango configurado
- Revisa que el número no esté ya marcado
- Recarga la página

## 📞 Contacto

Para soporte técnico o dudas:
- WhatsApp: +57 313 533 0859
- Instagram: @gsanzjoyeria
