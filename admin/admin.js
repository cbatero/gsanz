// Configuración de la API
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000/api' 
    : '/api';

// Verificar autenticación con encriptación
function verificarAutenticacion() {
    const encryptedSession = sessionStorage.getItem('adminSession');
    if (!encryptedSession) {
        window.location.href = 'login.html';
        return null;
    }
    
    try {
        const sessionData = decryptData(encryptedSession);
        
        if (!sessionData) {
            sessionStorage.removeItem('adminSession');
            window.location.href = 'login.html';
            return null;
        }
        
        // Validar token de sesión
        if (!validateSessionToken(sessionData.token, sessionData.username, sessionData.timestamp)) {
            sessionStorage.removeItem('adminSession');
            window.location.href = 'login.html';
            return null;
        }
        
        return sessionData;
    } catch (error) {
        console.error('Error al verificar autenticación:', error);
        sessionStorage.removeItem('adminSession');
        window.location.href = 'login.html';
        return null;
    }
}

// Cargar usuario
const currentUser = verificarAutenticacion();
if (currentUser) {
    document.getElementById('userName').textContent = currentUser.name;
}

// Configuración global
let config = {};
let numerosOcupados = [];

// Navegación
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Actualizar navegación activa
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Mostrar sección correspondiente
        const section = this.dataset.section;
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(section).classList.add('active');
        
        // Actualizar título
        const titles = {
            'dashboard': 'Dashboard',
            'ventas': 'Registro de Ventas',
            'configuracion': 'Configuración',
            'numeros': 'Gestión de Números',
            'sorteo': 'Realizar Sorteo'
        };
        document.getElementById('pageTitle').textContent = titles[section];
    });
});

// Cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        sessionStorage.removeItem('adminSession');
        window.location.href = 'login.html';
    }
}

// Cargar configuración con desencriptación
async function cargarConfiguracion() {
    try {
        // Intentar cargar desde la API primero
        let response = await fetch(`${API_URL}/data`);
        let data = await response.json();
        
        config = data;
        
        // Cargar ventas
        ventas = config.ventas || [];
        
        // Actualizar dashboard
        actualizarDashboard();
        
        // Cargar formulario de configuración
        document.getElementById('nombrePremio').value = config.rifa.nombre;
        document.getElementById('descripcionPremio').value = config.rifa.descripcion;
        document.getElementById('valorPremio').value = config.rifa.valor;
        document.getElementById('imagenPremio').value = config.rifa.imagen;
        document.getElementById('caracteristicas').value = config.rifa.caracteristicas.join('\n');
        document.getElementById('numeroInicio').value = config.rifa.numeroInicio;
        document.getElementById('numeroFin').value = config.rifa.numeroFin;
        document.getElementById('precioNumero').value = config.rifa.precioNumero;
        document.getElementById('precioPromo').value = config.rifa.precioPromo;
        document.getElementById('fechaSorteo').value = config.rifa.fechaSorteo;
        document.getElementById('juegoLoteria').value = config.rifa.juegoLoteria;
        
        numerosOcupados = config.rifa.numerosOcupados || [];
        
        // Generar grid de números
        generarGridNumeros();
        
        // Actualizar info de sorteo
        actualizarInfoSorteo();
        
        // Actualizar tabla de ventas
        actualizarTablaVentas();
        
        console.log('✅ Configuración cargada desde API');
        
    } catch (error) {
        console.error('❌ Error al cargar configuración:', error);
        alert('Error al cargar la configuración. Asegúrate de que el servidor esté corriendo.');
    }
}

// Actualizar dashboard
function actualizarDashboard() {
    const totalNumeros = config.rifa.numeroFin - config.rifa.numeroInicio + 1;
    const vendidos = numerosOcupados.length;
    const disponibles = totalNumeros - vendidos;
    const recaudado = vendidos * parseInt(config.rifa.precioNumero);
    
    document.getElementById('numerosVendidos').textContent = vendidos;
    document.getElementById('numerosDisponibles').textContent = disponibles;
    document.getElementById('totalRecaudado').textContent = `$${recaudado.toLocaleString('es-CO')}`;
    document.getElementById('estadoRifa').textContent = config.rifa.estado === 'activa' ? 'Activa' : 'Finalizada';
    
    // Preview del premio
    document.getElementById('premioImagenPreview').src = config.rifa.imagen;
    document.getElementById('premioNombrePreview').textContent = config.rifa.nombre;
    document.getElementById('premioDescripcionPreview').textContent = config.rifa.descripcion;
    document.getElementById('premioValorPreview').textContent = parseInt(config.rifa.valor).toLocaleString('es-CO');
}

// Guardar configuración
document.getElementById('configForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const caracteristicasText = document.getElementById('caracteristicas').value;
    const caracteristicas = caracteristicasText.split('\n').filter(c => c.trim() !== '');
    
    config.rifa = {
        ...config.rifa,
        nombre: document.getElementById('nombrePremio').value,
        descripcion: document.getElementById('descripcionPremio').value,
        valor: document.getElementById('valorPremio').value,
        imagen: document.getElementById('imagenPremio').value,
        caracteristicas: caracteristicas,
        numeroInicio: parseInt(document.getElementById('numeroInicio').value),
        numeroFin: parseInt(document.getElementById('numeroFin').value),
        precioNumero: document.getElementById('precioNumero').value,
        precioPromo: document.getElementById('precioPromo').value,
        fechaSorteo: document.getElementById('fechaSorteo').value,
        juegoLoteria: document.getElementById('juegoLoteria').value
    };
    
    try {
        // Guardar configuración
        const dataToSave = {
            encrypted: false,
            rifa: config.rifa,
            contacto: config.contacto || {
                whatsapp: "573135330859",
                instagram: "@gsanzjoyeria"
            },
            lastUpdate: Date.now()
        };
        
        // En producción, esto debería guardar en el backend
        console.log('Configuración a guardar:', dataToSave);
        
        // Simular guardado en localStorage y archivo compartido
        localStorage.setItem('rifaConfig', JSON.stringify(dataToSave));
        
        // Mostrar JSON para copiar manualmente al archivo
        console.log('Copia este JSON a data/rifa-data.json:');
        console.log(JSON.stringify(dataToSave, null, 2));
        
        alert('Configuración guardada exitosamente.\n\nIMPORTANTE: Para que los cambios se reflejen en la página pública, copia el JSON de la consola a data/rifa-data.json');
        
        actualizarDashboard();
        generarGridNumeros();
        actualizarInfoSorteo();
        
    } catch (error) {
        console.error('Error al guardar:', error);
        alert('Error al guardar la configuración');
    }
});

// Generar grid de números
function generarGridNumeros() {
    const grid = document.getElementById('numerosGrid');
    grid.innerHTML = '';
    
    for (let i = config.rifa.numeroInicio; i <= config.rifa.numeroFin; i++) {
        const numeroDiv = document.createElement('div');
        numeroDiv.className = numerosOcupados.includes(i) ? 'numero-admin ocupado' : 'numero-admin disponible';
        numeroDiv.textContent = i;
        numeroDiv.dataset.numero = i;
        
        numeroDiv.addEventListener('click', function() {
            toggleNumero(i, this);
        });
        
        grid.appendChild(numeroDiv);
    }
}

// Toggle número - Ahora abre modal de venta
function toggleNumero(numero, elemento) {
    const index = numerosOcupados.indexOf(numero);
    
    if (index > -1) {
        // Si está ocupado, mostrar información de la venta
        mostrarInfoVenta(numero);
    } else {
        // Si está disponible, abrir modal para registrar venta
        abrirModalVenta(numero);
    }
}

// Guardar números ocupados
function guardarNumerosOcupados() {
    const dataToSave = {
        encrypted: false,
        rifa: config.rifa,
        ventas: ventas,
        contacto: config.contacto || {
            whatsapp: "573135330859",
            instagram: "@gsanzjoyeria"
        },
        lastUpdate: Date.now()
    };
    
    localStorage.setItem('rifaConfig', JSON.stringify(dataToSave));
    
    // Mostrar en consola para actualización manual
    console.log('Números actualizados. Copia a data/rifa-data.json:');
    console.log(JSON.stringify(dataToSave, null, 2));
}

// Marcar múltiples números
function marcarMultiples() {
    const numeros = prompt('Ingresa los números separados por comas (ej: 1,5,10,15):');
    if (!numeros) return;
    
    const numerosArray = numeros.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    
    numerosArray.forEach(num => {
        if (num >= config.rifa.numeroInicio && num <= config.rifa.numeroFin && !numerosOcupados.includes(num)) {
            numerosOcupados.push(num);
        }
    });
    
    config.rifa.numerosOcupados = numerosOcupados;
    guardarNumerosOcupados();
    generarGridNumeros();
    actualizarDashboard();
}

// Desmarcar todos
function desmarcarTodos() {
    if (confirm('¿Estás seguro de desmarcar todos los números?')) {
        numerosOcupados = [];
        config.rifa.numerosOcupados = [];
        guardarNumerosOcupados();
        generarGridNumeros();
        actualizarDashboard();
    }
}

// Buscar número
function buscarNumero() {
    const busqueda = document.getElementById('buscarNumero').value;
    const numeros = document.querySelectorAll('.numero-admin');
    
    numeros.forEach(num => {
        if (num.textContent.includes(busqueda)) {
            num.style.display = 'flex';
            num.style.transform = 'scale(1.1)';
            num.style.boxShadow = '0 0 15px rgba(201, 169, 97, 0.6)';
        } else {
            num.style.display = busqueda ? 'none' : 'flex';
            num.style.transform = 'scale(1)';
            num.style.boxShadow = 'none';
        }
    });
}

// Actualizar info de sorteo
function actualizarInfoSorteo() {
    document.getElementById('sorteoFecha').textContent = config.rifa.fechaSorteo || 'No configurada';
    document.getElementById('sorteoJuego').textContent = config.rifa.juegoLoteria || 'No configurado';
    document.getElementById('sorteoRango').textContent = `${config.rifa.numeroInicio}-${config.rifa.numeroFin}`;
    document.getElementById('sorteoVendidos').textContent = numerosOcupados.length;
}

// Realizar sorteo
function realizarSorteo() {
    const numeroGanador = parseInt(document.getElementById('numeroGanador').value);
    
    if (!numeroGanador) {
        alert('Por favor ingresa el número ganador');
        return;
    }
    
    if (numeroGanador < config.rifa.numeroInicio || numeroGanador > config.rifa.numeroFin) {
        alert('El número debe estar dentro del rango configurado');
        return;
    }
    
    if (!numerosOcupados.includes(numeroGanador)) {
        alert('Este número no está vendido');
        return;
    }
    
    if (!confirm(`¿Confirmas que el número ganador es ${numeroGanador}?`)) {
        return;
    }
    
    // Registrar ganador
    config.rifa.ganador = {
        numero: numeroGanador,
        fecha: new Date().toISOString(),
        premio: config.rifa.nombre
    };
    config.rifa.estado = 'finalizada';
    
    const encryptedConfig = encryptFile(config);
    localStorage.setItem('rifaConfig', JSON.stringify(encryptedConfig));
    
    // Mostrar resultado
    document.getElementById('ganadorNumero').textContent = numeroGanador;
    document.getElementById('ganadorPremio').textContent = config.rifa.nombre;
    document.getElementById('ganadorFecha').textContent = new Date().toLocaleDateString('es-CO');
    document.getElementById('resultadoSorteo').style.display = 'block';
    
    actualizarDashboard();
}

// Nueva rifa
function nuevaRifa() {
    if (!confirm('¿Estás seguro de iniciar una nueva rifa? Esto reiniciará todos los números.')) {
        return;
    }
    
    numerosOcupados = [];
    config.rifa.numerosOcupados = [];
    config.rifa.ganador = null;
    config.rifa.estado = 'activa';
    
    const encryptedConfig = encryptFile(config);
    localStorage.setItem('rifaConfig', JSON.stringify(encryptedConfig));
    
    document.getElementById('resultadoSorteo').style.display = 'none';
    document.getElementById('numeroGanador').value = '';
    
    generarGridNumeros();
    actualizarDashboard();
    
    alert('Nueva rifa iniciada exitosamente');
}

// Inicializar
cargarConfiguracion();

// Exportar datos para sincronización
function exportarDatos() {
    const dataToExport = {
        encrypted: false,
        rifa: config.rifa,
        ventas: ventas,
        contacto: config.contacto || {
            whatsapp: "573135330859",
            instagram: "@gsanzjoyeria"
        },
        lastUpdate: Date.now()
    };
    
    const jsonString = JSON.stringify(dataToExport, null, 2);
    
    // Crear blob y descargar
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rifa-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Archivo descargado.\n\nPara sincronizar:\n1. Reemplaza el archivo en data/rifa-data.json\n2. Los cambios se verán en la página pública');
}


// ============================================
// SISTEMA DE REGISTRO DE VENTAS
// ============================================

let ventas = [];

// Abrir modal para registrar venta
function abrirModalVenta(numero) {
    const modal = document.getElementById('modalVenta');
    if (!modal) {
        crearModalVenta();
        return abrirModalVenta(numero);
    }
    
    document.getElementById('ventaNumero').value = numero;
    document.getElementById('ventaNombre').value = '';
    document.getElementById('ventaTelefono').value = '';
    document.getElementById('ventaEmail').value = '';
    document.getElementById('ventaPrecio').value = config.rifa.precioNumero;
    document.getElementById('ventaDescuento').value = '0';
    document.getElementById('ventaTotal').value = config.rifa.precioNumero;
    document.getElementById('ventaNotas').value = '';
    
    modal.style.display = 'block';
}

// Crear modal de venta
function crearModalVenta() {
    const modalHTML = `
        <div id="modalVenta" class="modal-venta">
            <div class="modal-venta-content">
                <span class="modal-venta-close" onclick="cerrarModalVenta()">&times;</span>
                <h2>Registrar Venta</h2>
                
                <form id="formVenta" onsubmit="registrarVenta(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Número(s) *</label>
                            <input type="text" id="ventaNumero" required placeholder="Ej: 1 o 1,5,10">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nombre del Comprador *</label>
                            <input type="text" id="ventaNombre" required placeholder="Nombre completo">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Teléfono *</label>
                            <input type="tel" id="ventaTelefono" required placeholder="3001234567">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="ventaEmail" placeholder="correo@ejemplo.com">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Precio Base</label>
                            <input type="number" id="ventaPrecio" readonly>
                        </div>
                        <div class="form-group">
                            <label>Descuento ($)</label>
                            <input type="number" id="ventaDescuento" value="0" min="0" onchange="calcularTotalVenta()">
                        </div>
                        <div class="form-group">
                            <label>Total a Pagar *</label>
                            <input type="number" id="ventaTotal" required readonly>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group full-width">
                            <label>Notas</label>
                            <textarea id="ventaNotas" rows="3" placeholder="Información adicional..."></textarea>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" onclick="cerrarModalVenta()">Cancelar</button>
                        <button type="submit" class="btn-primary">Registrar Venta</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Calcular total de venta
function calcularTotalVenta() {
    const numeros = document.getElementById('ventaNumero').value.split(',').filter(n => n.trim());
    const cantidadNumeros = numeros.length;
    const precioBase = parseInt(config.rifa.precioNumero);
    const precioPromo = parseInt(config.rifa.precioPromo);
    const descuento = parseInt(document.getElementById('ventaDescuento').value) || 0;
    
    let subtotal = 0;
    
    // Calcular con promoción si aplica
    if (cantidadNumeros === 2) {
        subtotal = precioPromo;
    } else if (cantidadNumeros % 2 === 0 && cantidadNumeros > 0) {
        const pares = Math.floor(cantidadNumeros / 2);
        subtotal = pares * precioPromo;
    } else {
        const pares = Math.floor(cantidadNumeros / 2);
        const sueltos = cantidadNumeros % 2;
        subtotal = (pares * precioPromo) + (sueltos * precioBase);
    }
    
    const total = Math.max(0, subtotal - descuento);
    
    document.getElementById('ventaPrecio').value = subtotal;
    document.getElementById('ventaTotal').value = total;
}

// Registrar venta
async function registrarVenta(event) {
    event.preventDefault();
    
    const numerosStr = document.getElementById('ventaNumero').value;
    const numeros = numerosStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    
    // Validar que los números estén en el rango
    const numerosInvalidos = numeros.filter(n => n < config.rifa.numeroInicio || n > config.rifa.numeroFin);
    if (numerosInvalidos.length > 0) {
        alert(`Números fuera de rango: ${numerosInvalidos.join(', ')}`);
        return;
    }
    
    // Validar que los números no estén ocupados
    const numerosYaVendidos = numeros.filter(n => numerosOcupados.includes(n));
    if (numerosYaVendidos.length > 0) {
        alert(`Números ya vendidos: ${numerosYaVendidos.join(', ')}`);
        return;
    }
    
    const venta = {
        id: Date.now(),
        fecha: new Date().toISOString(),
        numeros: numeros,
        comprador: {
            nombre: document.getElementById('ventaNombre').value,
            telefono: document.getElementById('ventaTelefono').value,
            email: document.getElementById('ventaEmail').value || ''
        },
        precio: {
            base: parseInt(document.getElementById('ventaPrecio').value),
            descuento: parseInt(document.getElementById('ventaDescuento').value) || 0,
            total: parseInt(document.getElementById('ventaTotal').value)
        },
        notas: document.getElementById('ventaNotas').value || '',
        estado: 'pagado'
    };
    
    try {
        // Guardar venta en la API
        const response = await fetch(`${API_URL}/ventas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Actualizar datos locales
            config = result.data;
            ventas = config.ventas;
            numerosOcupados = config.rifa.numerosOcupados;
            
            // Actualizar interfaz
            generarGridNumeros();
            actualizarDashboard();
            actualizarTablaVentas();
            
            cerrarModalVenta();
            
            alert(`✅ Venta registrada y guardada exitosamente!

📋 DETALLES:
Números: ${numeros.join(', ')}
Comprador: ${venta.comprador.nombre}
Total: $${venta.precio.total.toLocaleString('es-CO')}

✅ Los cambios ya están guardados en el servidor.
✅ La página pública se actualizará automáticamente.`);
            
            console.log('✅ Venta guardada en servidor');
        } else {
            throw new Error(result.error || 'Error al guardar venta');
        }
        
    } catch (error) {
        console.error('❌ Error al registrar venta:', error);
        alert('❌ Error al guardar la venta. Verifica que el servidor esté corriendo.');
    }
}

// Cerrar modal de venta
function cerrarModalVenta() {
    const modal = document.getElementById('modalVenta');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Mostrar información de venta
function mostrarInfoVenta(numero) {
    const venta = ventas.find(v => v.numeros.includes(numero));
    
    if (!venta) {
        if (confirm(`El número ${numero} está marcado como ocupado pero no tiene venta registrada.\n\n¿Deseas desmarcarlo?`)) {
            const index = numerosOcupados.indexOf(numero);
            if (index > -1) {
                numerosOcupados.splice(index, 1);
                config.rifa.numerosOcupados = numerosOcupados;
                guardarVentas();
                generarGridNumeros();
                actualizarDashboard();
            }
        }
        return;
    }
    
    const info = `
📋 INFORMACIÓN DE VENTA

Número(s): ${venta.numeros.join(', ')}
Fecha: ${new Date(venta.fecha).toLocaleString('es-CO')}

👤 COMPRADOR:
Nombre: ${venta.comprador.nombre}
Teléfono: ${venta.comprador.telefono}
Email: ${venta.comprador.email || 'No registrado'}

💰 PAGO:
Precio Base: $${venta.precio.base.toLocaleString('es-CO')}
Descuento: $${venta.precio.descuento.toLocaleString('es-CO')}
Total Pagado: $${venta.precio.total.toLocaleString('es-CO')}

📝 Notas: ${venta.notas || 'Sin notas'}

Estado: ${venta.estado.toUpperCase()}
    `;
    
    if (confirm(info + '\n\n¿Deseas eliminar esta venta?')) {
        eliminarVenta(venta.id);
    }
}

// Eliminar venta
async function eliminarVenta(ventaId) {
    const venta = ventas.find(v => v.id === ventaId);
    if (!venta) return;
    
    if (!confirm(`¿Estás seguro de eliminar esta venta?\n\nNúmeros: ${venta.numeros.join(', ')}\nComprador: ${venta.comprador.nombre}`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/ventas/${ventaId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Actualizar datos locales
            config = result.data;
            ventas = config.ventas;
            numerosOcupados = config.rifa.numerosOcupados;
            
            // Actualizar interfaz
            generarGridNumeros();
            actualizarDashboard();
            actualizarTablaVentas();
            
            alert('✅ Venta eliminada exitosamente');
            console.log('✅ Venta eliminada del servidor');
        } else {
            throw new Error(result.error || 'Error al eliminar venta');
        }
        
    } catch (error) {
        console.error('❌ Error al eliminar venta:', error);
        alert('❌ Error al eliminar la venta. Verifica que el servidor esté corriendo.');
    }
}

// Guardar ventas
function guardarVentas() {
    const dataToSave = {
        encrypted: false,
        rifa: config.rifa,
        ventas: ventas,
        contacto: config.contacto || {
            whatsapp: "573135330859",
            instagram: "@gsanzjoyeria"
        },
        lastUpdate: Date.now()
    };
    
    localStorage.setItem('rifaConfig', JSON.stringify(dataToSave));
    
    console.log('Datos actualizados. Copia a data/rifa-data.json:');
    console.log(JSON.stringify(dataToSave, null, 2));
}

// Actualizar tabla de ventas
function actualizarTablaVentas() {
    const tbody = document.getElementById('tablaVentasBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Ordenar ventas por fecha (más reciente primero)
    const ventasOrdenadas = [...ventas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    ventasOrdenadas.forEach(venta => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(venta.fecha).toLocaleDateString('es-CO')}</td>
            <td><strong>${venta.numeros.join(', ')}</strong></td>
            <td>${venta.comprador.nombre}</td>
            <td>${venta.comprador.telefono}</td>
            <td>$${venta.precio.total.toLocaleString('es-CO')}</td>
            <td><span class="badge badge-${venta.estado}">${venta.estado}</span></td>
            <td>
                <button class="btn-icon" onclick="mostrarInfoVenta(${venta.numeros[0]})" title="Ver detalles">👁️</button>
                <button class="btn-icon" onclick="eliminarVenta(${venta.id})" title="Eliminar">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Actualizar estadísticas
    const totalVentas = ventas.length;
    const totalRecaudado = ventas.reduce((sum, v) => sum + v.precio.total, 0);
    const totalDescuentos = ventas.reduce((sum, v) => sum + v.precio.descuento, 0);
    
    document.getElementById('totalVentas').textContent = totalVentas;
    document.getElementById('totalRecaudadoVentas').textContent = `$${totalRecaudado.toLocaleString('es-CO')}`;
    document.getElementById('totalDescuentos').textContent = `$${totalDescuentos.toLocaleString('es-CO')}`;
}

// Cargar ventas desde configuración
function cargarVentas() {
    if (config.ventas) {
        ventas = config.ventas;
        actualizarTablaVentas();
    }
}

// Exportar ventas a Excel (CSV)
function exportarVentas() {
    let csv = 'Fecha,Números,Comprador,Teléfono,Email,Precio Base,Descuento,Total,Estado,Notas\n';
    
    ventas.forEach(venta => {
        csv += `${new Date(venta.fecha).toLocaleDateString('es-CO')},`;
        csv += `"${venta.numeros.join(', ')}",`;
        csv += `"${venta.comprador.nombre}",`;
        csv += `${venta.comprador.telefono},`;
        csv += `${venta.comprador.email || ''},`;
        csv += `${venta.precio.base},`;
        csv += `${venta.precio.descuento},`;
        csv += `${venta.precio.total},`;
        csv += `${venta.estado},`;
        csv += `"${venta.notas || ''}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ventas-rifa-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Ventas exportadas a CSV');
}

// Buscar venta
function buscarVenta() {
    const busqueda = document.getElementById('buscarVenta').value.toLowerCase();
    const filas = document.querySelectorAll('#tablaVentasBody tr');
    
    filas.forEach(fila => {
        const texto = fila.textContent.toLowerCase();
        fila.style.display = texto.includes(busqueda) ? '' : 'none';
    });
}


// Indicador de cambios sin sincronizar
let cambiosSinSincronizar = false;

function marcarCambiosSinSincronizar() {
    cambiosSinSincronizar = true;
    const badge = document.getElementById('badgeSync');
    const btnExportar = document.getElementById('btnExportar');
    
    if (badge && btnExportar) {
        badge.style.display = 'inline';
        btnExportar.classList.add('btn-pulse');
        btnExportar.title = '¡Hay cambios sin sincronizar! Click para exportar';
    }
}

function limpiarIndicadorSincronizacion() {
    cambiosSinSincronizar = false;
    const badge = document.getElementById('badgeSync');
    const btnExportar = document.getElementById('btnExportar');
    
    if (badge && btnExportar) {
        badge.style.display = 'none';
        btnExportar.classList.remove('btn-pulse');
        btnExportar.title = 'Exportar datos para sincronizar';
    }
}

// Modificar guardarVentas para marcar cambios
const guardarVentasOriginal = guardarVentas;
guardarVentas = function() {
    guardarVentasOriginal();
    marcarCambiosSinSincronizar();
};

// Modificar exportarDatos para limpiar indicador
const exportarDatosOriginal = exportarDatos;
exportarDatos = function() {
    exportarDatosOriginal();
    limpiarIndicadorSincronizacion();
};
