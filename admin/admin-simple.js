// ============================================
// ADMIN SIMPLIFICADO PARA GITHUB PAGES
// ============================================

// Cargar DBManager
let config = {};
let ventas = [];
let numerosOcupados = [];

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
});

// Cargar datos desde localStorage
function cargarDatos() {
    const db = dbManager.getDB();
    config = db;
    ventas = db.ventas || [];
    numerosOcupados = db.rifa.numerosOcupados || [];
    
    actualizarInterfaz();
}

// Actualizar toda la interfaz
function actualizarInterfaz() {
    actualizarDashboard();
    generarGridNumeros();
    actualizarTablaVentas();
    cargarFormularioConfig();
}

// Actualizar dashboard
function actualizarDashboard() {
    const totalNumeros = config.rifa.numeroFin - config.rifa.numeroInicio + 1;
    const vendidos = numerosOcupados.length;
    const disponibles = totalNumeros - vendidos;
    
    // Calcular recaudado real desde ventas
    const recaudado = ventas.reduce((sum, v) => sum + v.precio.total, 0);
    
    document.getElementById('numerosVendidos').textContent = vendidos;
    document.getElementById('numerosDisponibles').textContent = disponibles;
    document.getElementById('totalRecaudado').textContent = `$${recaudado.toLocaleString('es-CO')}`;
    document.getElementById('estadoRifa').textContent = config.rifa.estado === 'activa' ? 'Activa' : 'Finalizada';
}

// Generar grid de números
function generarGridNumeros() {
    const grid = document.getElementById('numerosGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    for (let i = config.rifa.numeroInicio; i <= config.rifa.numeroFin; i++) {
        const numeroDiv = document.createElement('div');
        numeroDiv.className = numerosOcupados.includes(i) ? 'numero-admin ocupado' : 'numero-admin disponible';
        numeroDiv.textContent = i;
        numeroDiv.dataset.numero = i;
        
        numeroDiv.addEventListener('click', function() {
            toggleNumero(i);
        });
        
        grid.appendChild(numeroDiv);
    }
}

// Toggle número - abre modal o muestra info
function toggleNumero(numero) {
    if (numerosOcupados.includes(numero)) {
        mostrarInfoVenta(numero);
    } else {
        abrirModalVenta(numero);
    }
}

// Abrir modal de venta
function abrirModalVenta(numero) {
    document.getElementById('ventaNumero').value = numero;
    document.getElementById('ventaNombre').value = '';
    document.getElementById('ventaTelefono').value = '';
    document.getElementById('ventaEmail').value = '';
    document.getElementById('ventaPrecio').value = config.rifa.precioNumero;
    document.getElementById('ventaDescuento').value = '0';
    document.getElementById('ventaTotal').value = config.rifa.precioNumero;
    document.getElementById('ventaNotas').value = '';
    
    document.getElementById('modalVenta').style.display = 'block';
}

// Registrar venta
function registrarVenta(event) {
    event.preventDefault();
    
    const numerosStr = document.getElementById('ventaNumero').value;
    const numeros = numerosStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    
    // Validaciones
    const numerosInvalidos = numeros.filter(n => n < config.rifa.numeroInicio || n > config.rifa.numeroFin);
    if (numerosInvalidos.length > 0) {
        alert(`Números fuera de rango: ${numerosInvalidos.join(', ')}`);
        return;
    }
    
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
    
    // Guardar en DB
    const db = dbManager.registrarVenta(venta);
    config = db;
    ventas = db.ventas;
    numerosOcupados = db.rifa.numerosOcupados;
    
    // Actualizar interfaz
    actualizarInterfaz();
    cerrarModalVenta();
    
    // Mostrar confirmación
    mostrarNotificacion(`✅ Venta registrada!
    
Números: ${numeros.join(', ')}
Comprador: ${venta.comprador.nombre}
Total: $${venta.precio.total.toLocaleString('es-CO')}

⚠️ IMPORTANTE: Click en "📥 Descargar JSON" para sincronizar con la página pública.`, 'success');
}

// Mostrar info de venta
function mostrarInfoVenta(numero) {
    const venta = ventas.find(v => v.numeros.includes(numero));
    
    if (!venta) {
        if (confirm(`El número ${numero} está marcado pero no tiene venta.\n¿Desmarcar?`)) {
            const index = numerosOcupados.indexOf(numero);
            if (index > -1) {
                numerosOcupados.splice(index, 1);
                config.rifa.numerosOcupados = numerosOcupados;
                dbManager.setDB(config);
                actualizarInterfaz();
            }
        }
        return;
    }
    
    const info = `📋 VENTA #${venta.id}

Números: ${venta.numeros.join(', ')}
Fecha: ${new Date(venta.fecha).toLocaleString('es-CO')}

👤 COMPRADOR:
${venta.comprador.nombre}
${venta.comprador.telefono}
${venta.comprador.email || 'Sin email'}

💰 PAGO:
Base: $${venta.precio.base.toLocaleString('es-CO')}
Descuento: $${venta.precio.descuento.toLocaleString('es-CO')}
Total: $${venta.precio.total.toLocaleString('es-CO')}

📝 ${venta.notas || 'Sin notas'}`;
    
    if (confirm(info + '\n\n¿Eliminar esta venta?')) {
        eliminarVenta(venta.id);
    }
}

// Eliminar venta
function eliminarVenta(ventaId) {
    const db = dbManager.eliminarVenta(ventaId);
    if (db) {
        config = db;
        ventas = db.ventas;
        numerosOcupados = db.rifa.numerosOcupados;
        actualizarInterfaz();
        mostrarNotificacion('✅ Venta eliminada', 'success');
    }
}

// Descargar JSON
function descargarJSON() {
    dbManager.exportarJSON();
    mostrarNotificacion('✅ Archivo descargado!\n\nAhora:\n1. Ve a tu repositorio GitHub\n2. Sube el archivo a data/rifa-data.json\n3. La página pública se actualizará', 'info');
}

// Cargar JSON
function cargarJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
        try {
            const file = e.target.files[0];
            const data = await dbManager.importarJSON(file);
            config = data;
            ventas = data.ventas;
            numerosOcupados = data.rifa.numerosOcupados;
            actualizarInterfaz();
            mostrarNotificacion('✅ Datos importados correctamente', 'success');
        } catch (error) {
            mostrarNotificacion('❌ Error al importar archivo', 'error');
        }
    };
    
    input.click();
}

// Sincronizar con archivo
async function sincronizarConArchivo() {
    const data = await dbManager.sincronizar();
    if (data) {
        config = data;
        ventas = data.ventas;
        numerosOcupados = data.rifa.numerosOcupados;
        actualizarInterfaz();
        mostrarNotificacion('✅ Sincronizado con data/rifa-data.json', 'success');
    } else {
        mostrarNotificacion('❌ No se pudo sincronizar', 'error');
    }
}

// Cerrar modal
function cerrarModalVenta() {
    document.getElementById('modalVenta').style.display = 'none';
}

// Calcular total de venta
function calcularTotalVenta() {
    const numeros = document.getElementById('ventaNumero').value.split(',').filter(n => n.trim());
    const cantidadNumeros = numeros.length;
    const precioBase = parseInt(config.rifa.precioNumero);
    const precioPromo = parseInt(config.rifa.precioPromo);
    const descuento = parseInt(document.getElementById('ventaDescuento').value) || 0;
    
    let subtotal = 0;
    
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

// Actualizar tabla de ventas
function actualizarTablaVentas() {
    const tbody = document.getElementById('tablaVentasBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (ventas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px; color: #999;">No hay ventas registradas</td></tr>';
        return;
    }
    
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
                <button class="btn-icon" onclick="mostrarInfoVenta(${venta.numeros[0]})" title="Ver">👁️</button>
                <button class="btn-icon" onclick="eliminarVenta(${venta.id})" title="Eliminar">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Actualizar estadísticas
    const totalVentas = ventas.length;
    const totalRecaudado = ventas.reduce((sum, v) => sum + v.precio.total, 0);
    const totalDescuentos = ventas.reduce((sum, v) => sum + v.precio.descuento, 0);
    
    if (document.getElementById('totalVentas')) {
        document.getElementById('totalVentas').textContent = totalVentas;
        document.getElementById('totalRecaudadoVentas').textContent = `$${totalRecaudado.toLocaleString('es-CO')}`;
        document.getElementById('totalDescuentos').textContent = `$${totalDescuentos.toLocaleString('es-CO')}`;
    }
}

// Cargar formulario de configuración
function cargarFormularioConfig() {
    if (!document.getElementById('nombrePremio')) return;
    
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
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'info') {
    alert(mensaje);
}
