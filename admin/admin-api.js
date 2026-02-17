/**
 * Gestor de API para Admin
 * Maneja toda la comunicación con el servidor MySQL
 */

// Configuración de la API
const API_URL = 'https://gsanz.crisdev.fun/api';

// Variables globales
let rifaActual = null;
let ventasActuales = [];
let numerosOcupadosActuales = [];

/**
 * Cargar rifa activa
 */
async function cargarRifaActiva() {
    try {
        const response = await fetch(`${API_URL}/rifas/1`);
        const result = await response.json();
        
        if (result.success) {
            rifaActual = result.data;
            return rifaActual;
        }
        
        throw new Error(result.message);
    } catch (error) {
        console.error('Error al cargar rifa:', error);
        throw error;
    }
}

/**
 * Cargar números ocupados
 */
async function cargarNumerosOcupados(rifaId = 1) {
    try {
        const response = await fetch(`${API_URL}/numeros/${rifaId}`);
        const result = await response.json();
        
        if (result.success) {
            numerosOcupadosActuales = result.data.numerosOcupados || [];
            return numerosOcupadosActuales;
        }
        
        throw new Error(result.message);
    } catch (error) {
        console.error('Error al cargar números:', error);
        throw error;
    }
}

/**
 * Cargar todas las ventas
 */
async function cargarVentas() {
    try {
        const response = await fetch(`${API_URL}/ventas`);
        const result = await response.json();
        
        if (result.success) {
            ventasActuales = result.data || [];
            return ventasActuales;
        }
        
        throw new Error(result.message);
    } catch (error) {
        console.error('Error al cargar ventas:', error);
        throw error;
    }
}

/**
 * Registrar nueva venta
 */
async function registrarVentaAPI(venta) {
    try {
        const response = await fetch(`${API_URL}/ventas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venta)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Recargar datos
            await cargarNumerosOcupados();
            await cargarVentas();
            return result;
        }
        
        throw new Error(result.message);
    } catch (error) {
        console.error('Error al registrar venta:', error);
        throw error;
    }
}

/**
 * Eliminar venta
 */
async function eliminarVentaAPI(ventaId) {
    try {
        const response = await fetch(`${API_URL}/ventas/${ventaId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Recargar datos
            await cargarNumerosOcupados();
            await cargarVentas();
            return result;
        }
        
        throw new Error(result.message);
    } catch (error) {
        console.error('Error al eliminar venta:', error);
        throw error;
    }
}

/**
 * Cargar estadísticas
 */
async function cargarEstadisticas(rifaId = 1) {
    try {
        const response = await fetch(`${API_URL}/estadisticas/${rifaId}`);
        const result = await response.json();
        
        if (result.success) {
            return result.data;
        }
        
        throw new Error(result.message);
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
        throw error;
    }
}

/**
 * Actualizar configuración de rifa
 */
async function actualizarRifaAPI(rifaId, datos) {
    try {
        const response = await fetch(`${API_URL}/rifas/${rifaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        
        const result = await response.json();
        
        if (result.success) {
            await cargarRifaActiva();
            return result;
        }
        
        throw new Error(result.message);
    } catch (error) {
        console.error('Error al actualizar rifa:', error);
        throw error;
    }
}

/**
 * Inicializar datos del admin
 */
async function inicializarDatosAdmin() {
    try {
        await cargarRifaActiva();
        await cargarNumerosOcupados();
        await cargarVentas();
        
        console.log('✅ Datos inicializados correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al inicializar datos:', error);
        alert('Error al conectar con el servidor. Verifica tu conexión.');
        return false;
    }
}
