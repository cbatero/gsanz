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
        const response = await fetch('config.json');
        const encryptedData = await response.json();
        
        // Desencriptar si es necesario
        if (encryptedData.encrypted) {
            config = decryptFile(encryptedData);
            if (!config) {
                throw new Error('Error al desencriptar configuración');
            }
        } else {
            config = encryptedData;
        }
        
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
        
    } catch (error) {
        console.error('Error al cargar configuración:', error);
        alert('Error al cargar la configuración');
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
        // Encriptar y guardar configuración
        const encryptedConfig = encryptFile(config);
        
        // En producción, esto debería guardar en el backend
        console.log('Configuración encriptada:', encryptedConfig);
        
        // Simular guardado en localStorage (encriptado)
        localStorage.setItem('rifaConfig', JSON.stringify(encryptedConfig));
        
        alert('Configuración guardada y encriptada exitosamente');
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

// Toggle número
function toggleNumero(numero, elemento) {
    const index = numerosOcupados.indexOf(numero);
    
    if (index > -1) {
        // Desmarcar
        numerosOcupados.splice(index, 1);
        elemento.classList.remove('ocupado');
        elemento.classList.add('disponible');
    } else {
        // Marcar como ocupado
        numerosOcupados.push(numero);
        elemento.classList.remove('disponible');
        elemento.classList.add('ocupado');
    }
    
    config.rifa.numerosOcupados = numerosOcupados;
    const encryptedConfig = encryptFile(config);
    localStorage.setItem('rifaConfig', JSON.stringify(encryptedConfig));
    actualizarDashboard();
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
    const encryptedConfig = encryptFile(config);
    localStorage.setItem('rifaConfig', JSON.stringify(encryptedConfig));
    generarGridNumeros();
    actualizarDashboard();
}

// Desmarcar todos
function desmarcarTodos() {
    if (confirm('¿Estás seguro de desmarcar todos los números?')) {
        numerosOcupados = [];
        config.rifa.numerosOcupados = [];
        const encryptedConfig = encryptFile(config);
        localStorage.setItem('rifaConfig', JSON.stringify(encryptedConfig));
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
