# ✅ Lista de Verificación - Sistema GSanz Rifas

## 🧪 Pruebas de Funcionalidad

### 1. Página Pública (index.html)

#### Visualización
- [ ] La página carga correctamente
- [ ] El logo GSanz se muestra
- [ ] La imagen del premio (cadena) se ve completa
- [ ] El diseño se ve elegante con colores dorados
- [ ] Responsive en móvil y desktop

#### Funcionalidad de Números
- [ ] Se muestran 100 números (1-100)
- [ ] Los números disponibles están en verde
- [ ] Se pueden seleccionar números (click)
- [ ] Los números seleccionados cambian a dorado
- [ ] El contador flotante muestra la cantidad seleccionada

#### Modal de Reserva
- [ ] Se abre al hacer click en el carrito flotante
- [ ] Muestra los números seleccionados
- [ ] Calcula el total correctamente
  - 1 número = $12,000
  - 2 números = $20,000 (promo)
  - 3 números = $32,000 (1 promo + 1 normal)
- [ ] El formulario valida campos requeridos
- [ ] Se puede cerrar el modal

#### Zoom de Imagen
- [ ] Click en la imagen abre el zoom
- [ ] La imagen ampliada se ve bien
- [ ] Se puede cerrar el zoom

### 2. Panel de Administración

#### Login (admin/login.html)
- [ ] La página de login carga
- [ ] Usuario: `cris` funciona
- [ ] Contraseña: `1823` funciona
- [ ] Credenciales incorrectas muestran error
- [ ] Redirecciona al panel después del login

#### Dashboard
- [ ] Muestra estadísticas correctas
  - Números vendidos
  - Total recaudado
  - Números disponibles
  - Estado de la rifa
- [ ] Preview del premio se muestra
- [ ] Los datos coinciden con la configuración

#### Configuración
- [ ] Todos los campos se cargan con datos actuales
- [ ] Se puede editar el nombre del premio
- [ ] Se puede cambiar el rango de números
- [ ] Se puede modificar precios
- [ ] Se puede configurar fecha y juego de lotería
- [ ] El botón "Guardar" funciona
- [ ] Muestra mensaje de confirmación

#### Gestión de Números
- [ ] Se muestra el grid de números
- [ ] Los números disponibles están en verde
- [ ] Click en un número lo marca como ocupado (rojo)
- [ ] Click nuevamente lo desmarca
- [ ] "Marcar Múltiples" funciona (ej: 1,5,10)
- [ ] "Desmarcar Todos" limpia todos los números
- [ ] "Buscar Número" filtra correctamente
- [ ] Botón "📥 Exportar Datos" descarga el archivo

#### Realizar Sorteo
- [ ] Muestra información del sorteo
- [ ] Se puede ingresar número ganador
- [ ] Valida que el número esté vendido
- [ ] Registra el ganador correctamente
- [ ] Cambia el estado a "Finalizada"
- [ ] "Nueva Rifa" reinicia el sistema

### 3. Sincronización

#### Flujo Completo
1. [ ] Abre el admin y marca números (ej: 1, 5, 10)
2. [ ] Click en "📥 Exportar Datos"
3. [ ] Se descarga `rifa-data.json`
4. [ ] Reemplaza `data/rifa-data.json` con el descargado
5. [ ] Abre/recarga la página pública
6. [ ] Los números 1, 5, 10 aparecen como "Reservado"
7. [ ] No se pueden seleccionar esos números

#### Actualización Automática
- [ ] Deja la página pública abierta
- [ ] Marca más números en el admin
- [ ] Exporta y reemplaza el archivo
- [ ] Espera 30 segundos
- [ ] La página pública se actualiza sola
- [ ] Los nuevos números aparecen como reservados

#### Configuración Dinámica
- [ ] Cambia el rango en admin (ej: 1-50)
- [ ] Exporta y reemplaza
- [ ] La página pública muestra solo 50 números
- [ ] Cambia precios en admin
- [ ] Los nuevos precios se reflejan en público

### 4. Seguridad

#### Encriptación
- [ ] Los usuarios en `admin/users.json` están encriptados
- [ ] La sesión se guarda encriptada en sessionStorage
- [ ] El token de sesión expira después de 24 horas
- [ ] No se puede acceder al admin sin login

#### Validaciones
- [ ] No se pueden marcar números fuera del rango
- [ ] No se puede realizar sorteo sin número ganador
- [ ] No se puede sortear número no vendido
- [ ] Los formularios validan campos requeridos

### 5. Responsive y UX

#### Móvil
- [ ] El diseño se adapta a pantalla pequeña
- [ ] Los números son fáciles de tocar
- [ ] El modal ocupa toda la pantalla
- [ ] El scroll es suave
- [ ] No hay zoom accidental

#### Desktop
- [ ] El diseño se ve bien en pantalla grande
- [ ] El grid de números tiene buen espaciado
- [ ] El hover en números funciona
- [ ] La navegación es intuitiva

### 6. Rendimiento

- [ ] La página carga rápido (< 3 segundos)
- [ ] Las animaciones son fluidas
- [ ] No hay lag al seleccionar números
- [ ] El scroll es suave
- [ ] Las imágenes cargan correctamente

## 🐛 Problemas Conocidos

### Limitaciones Actuales
1. **Sincronización manual**: Requiere reemplazar archivo manualmente
2. **Sin validación de pago**: No verifica pagos reales
3. **Sin notificaciones**: No hay alertas automáticas
4. **Concurrencia**: Múltiples admins pueden causar conflictos

### Soluciones Temporales
1. **Sincronización**: Exportar después de cada venta
2. **Validación**: Confirmar pago antes de marcar número
3. **Notificaciones**: Usar WhatsApp manualmente
4. **Concurrencia**: Un solo admin a la vez

## 📊 Casos de Prueba

### Caso 1: Venta Simple
```
1. Cliente selecciona número 15
2. Admin confirma pago
3. Admin marca número 15
4. Admin exporta datos
5. Reemplaza archivo
6. Cliente ve número 15 como "Reservado"
```

### Caso 2: Venta con Promoción
```
1. Cliente selecciona números 20 y 21
2. Total = $20,000 (promoción)
3. Admin confirma pago
4. Admin marca números 20 y 21
5. Sincroniza
6. Ambos números aparecen reservados
```

### Caso 3: Cambio de Rango
```
1. Admin cambia rango a 1-50
2. Exporta configuración
3. Reemplaza archivo
4. Página pública muestra solo 50 números
5. Números 51-100 no existen
```

### Caso 4: Realizar Sorteo
```
1. Todos los números vendidos
2. Admin va a "Realizar Sorteo"
3. Ingresa número ganador (ej: 42)
4. Confirma sorteo
5. Sistema registra ganador
6. Estado cambia a "Finalizada"
```

## ✅ Checklist de Producción

Antes de lanzar en producción:

- [ ] Cambiar credenciales de admin
- [ ] Cambiar clave de encriptación
- [ ] Configurar backup automático
- [ ] Probar en múltiples navegadores
- [ ] Probar en múltiples dispositivos
- [ ] Verificar velocidad de carga
- [ ] Configurar dominio y hosting
- [ ] Configurar SSL/HTTPS
- [ ] Probar flujo completo de venta
- [ ] Capacitar al equipo admin

## 📞 Reporte de Bugs

Si encuentras algún problema:
1. Anota el error exacto
2. Captura de pantalla si es posible
3. Pasos para reproducir
4. Navegador y dispositivo usado
5. Contacta: WhatsApp +57 313 533 0859

## 🎯 Próximas Mejoras

### Corto Plazo
- [ ] Backend para sincronización automática
- [ ] Notificaciones por email/WhatsApp
- [ ] Historial de ventas
- [ ] Reportes en PDF

### Largo Plazo
- [ ] Integración con pasarelas de pago
- [ ] App móvil nativa
- [ ] Sistema de referidos
- [ ] Múltiples rifas simultáneas
