// Configuración
let TOTAL_NUMEROS = 100;
let PRECIO_UNITARIO = 12000;
let PRECIO_PROMO = 20000;
let NUMERO_INICIO = 1;
let NUMERO_FIN = 100;

// Configuración de la API
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000/api' 
    : '/api';

// Estado de la aplicación
let numerosOcupados = [];
let numerosSeleccionados = [];
let rifaConfig = {};

// Detectar si es dispositivo móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Inicializar tablero al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    cargarConfiguracionRifa();
    optimizarParaMovil();
    inicializarZoom();
    
    // Actualizar cada 30 segundos
    setInterval(cargarConfiguracionRifa, 30000);
});

// Cargar configuración desde el servidor
async function cargarConfiguracionRifa() {
    try {
        const response = await fetch(`${API_URL}/data?t=` + Date.now());
        const data = await response.json();
        
        if (data.encrypted) {
            console.error('Los datos están encriptados. Contacta al administrador.');
            return;
        }
        
        rifaConfig = data.rifa;
        
        // Actualizar configuración
        NUMERO_INICIO = rifaConfig.numeroInicio;
        NUMERO_FIN = rifaConfig.numeroFin;
        TOTAL_NUMEROS = NUMERO_FIN - NUMERO_INICIO + 1;
        PRECIO_UNITARIO = parseInt(rifaConfig.precioNumero);
        PRECIO_PROMO = parseInt(rifaConfig.precioPromo);
        numerosOcupados = rifaConfig.numerosOcupados || [];
        
        // Generar tablero con la configuración actualizada
        generarTablero();
        cargarNumerosOcupados();
        
        console.log('✅ Configuración cargada desde API');
        
    } catch (error) {
        console.error('❌ Error al cargar configuración:', error);
        // Usar valores por defecto si falla
        generarTablero();
        cargarNumerosOcupados();
    }
}

// Inicializar funcionalidad de zoom en imagen
function inicializarZoom() {
    const imageWrapper = document.getElementById('imageZoom');
    const mainImage = document.getElementById('mainImage');
    const modalZoom = document.getElementById('modalZoom');
    const imgZoom = document.getElementById('imgZoom');
    const closeZoom = document.querySelector('.zoom-close');
    
    if (imageWrapper && mainImage && modalZoom) {
        imageWrapper.addEventListener('click', function() {
            modalZoom.style.display = 'block';
            imgZoom.src = mainImage.src;
            document.body.style.overflow = 'hidden';
        });
        
        closeZoom.addEventListener('click', function() {
            modalZoom.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        modalZoom.addEventListener('click', function(e) {
            if (e.target === modalZoom) {
                modalZoom.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
}

// Optimizaciones para móvil
function optimizarParaMovil() {
    if (isMobile) {
        // Prevenir zoom en inputs en iOS
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
        });
        
        // Mejorar scroll suave en móvil
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// Generar tablero de números
function generarTablero() {
    const tablero = document.getElementById('tableroNumeros');
    if (!tablero) return;
    
    tablero.innerHTML = '';
    
    for (let i = NUMERO_INICIO; i <= NUMERO_FIN; i++) {
        const numeroDiv = document.createElement('div');
        numeroDiv.className = 'numero-item disponible';
        numeroDiv.textContent = i;
        numeroDiv.dataset.numero = i;
        
        // Verificar si está ocupado
        if (numerosOcupados.includes(i)) {
            numeroDiv.classList.remove('disponible');
            numeroDiv.classList.add('ocupado');
        } else {
            // Usar touchstart para mejor respuesta en móvil
            if (isMobile) {
                numeroDiv.addEventListener('touchstart', function(e) {
                    e.preventDefault();
                    toggleNumero(i, numeroDiv);
                }, { passive: false });
            } else {
                numeroDiv.addEventListener('click', () => toggleNumero(i, numeroDiv));
            }
        }
        
        tablero.appendChild(numeroDiv);
    }
}

// Cargar números ocupados desde el servidor (simulado)
function cargarNumerosOcupados() {
    // Los números ocupados ya vienen de la configuración cargada
    actualizarTablero();
}

// Toggle selección de número
function toggleNumero(numero, elemento) {
    const index = numerosSeleccionados.indexOf(numero);
    
    if (index > -1) {
        // Deseleccionar
        numerosSeleccionados.splice(index, 1);
        elemento.classList.remove('seleccionado');
        elemento.classList.add('disponible');
    } else {
        // Seleccionar
        numerosSeleccionados.push(numero);
        elemento.classList.remove('disponible');
        elemento.classList.add('seleccionado');
        
        // Feedback háptico en móvil (si está disponible)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
    
    actualizarCarrito();
}

// Actualizar carrito flotante
function actualizarCarrito() {
    const carrito = document.getElementById('carritoFlotante');
    const count = document.getElementById('carritoCount');
    
    if (numerosSeleccionados.length > 0) {
        carrito.style.display = 'block';
        count.textContent = numerosSeleccionados.length;
    } else {
        carrito.style.display = 'none';
    }
}

// Actualizar tablero
function actualizarTablero() {
    const numeros = document.querySelectorAll('.numero-item');
    numeros.forEach(num => {
        const numero = parseInt(num.dataset.numero);
        if (numerosOcupados.includes(numero)) {
            num.classList.remove('disponible', 'seleccionado');
            num.classList.add('ocupado');
            num.style.pointerEvents = 'none';
        }
    });
}

// Abrir modal de reserva
function abrirModal() {
    if (numerosSeleccionados.length === 0) {
        mostrarAlerta('Por favor selecciona al menos un número');
        return;
    }
    
    const modal = document.getElementById('modalReserva');
    const numerosDisplay = document.getElementById('numerosSeleccionados');
    const totalPagar = document.getElementById('totalPagar');
    
    // Ordenar números seleccionados
    numerosSeleccionados.sort((a, b) => a - b);
    
    // Mostrar números seleccionados
    numerosDisplay.innerHTML = `Números: <strong>${numerosSeleccionados.join(', ')}</strong>`;
    
    // Calcular total
    let total = calcularTotal();
    
    totalPagar.textContent = `$${total.toLocaleString('es-CO')}`;
    
    modal.style.display = 'block';
    
    // Prevenir scroll del body en móvil cuando el modal está abierto
    if (isMobile) {
        document.body.style.overflow = 'hidden';
    }
}

// Calcular total con promoción
function calcularTotal() {
    let total = 0;
    if (numerosSeleccionados.length === 2) {
        total = PRECIO_PROMO;
    } else if (numerosSeleccionados.length % 2 === 0 && numerosSeleccionados.length > 0) {
        // Aplicar promo por cada par
        const pares = Math.floor(numerosSeleccionados.length / 2);
        total = pares * PRECIO_PROMO;
    } else {
        // Calcular con promo para pares y precio normal para el resto
        const pares = Math.floor(numerosSeleccionados.length / 2);
        const sueltos = numerosSeleccionados.length % 2;
        total = (pares * PRECIO_PROMO) + (sueltos * PRECIO_UNITARIO);
    }
    return total;
}

// Mostrar alerta personalizada
function mostrarAlerta(mensaje) {
    // Puedes personalizar esto con un modal más elegante
    alert(mensaje);
}

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('modalReserva');
    modal.style.display = 'none';
    
    // Restaurar scroll del body
    if (isMobile) {
        document.body.style.overflow = '';
    }
}

document.querySelector('.modal-close').addEventListener('click', cerrarModal);

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modalReserva');
    if (event.target === modal) {
        cerrarModal();
    }
});

// Manejar envío del formulario
document.getElementById('formReserva').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!nombre || !telefono) {
        mostrarAlerta('Por favor completa todos los campos requeridos');
        return;
    }
    
    // Aquí enviarías los datos a tu backend
    const reserva = {
        nombre: nombre,
        telefono: telefono,
        email: email,
        numeros: numerosSeleccionados,
        total: calcularTotal(),
        fecha: new Date().toISOString()
    };
    
    console.log('Reserva:', reserva);
    
    // Simular envío exitoso
    const mensaje = `¡Reserva exitosa!\n\nHola ${nombre}, has reservado los números: ${numerosSeleccionados.join(', ')}\n\nTotal: $${calcularTotal().toLocaleString('es-CO')}\n\nTe contactaremos al ${telefono} para confirmar el pago.`;
    
    mostrarAlerta(mensaje);
    
    // Marcar números como ocupados
    numerosOcupados.push(...numerosSeleccionados);
    
    // Limpiar selección
    numerosSeleccionados = [];
    actualizarCarrito();
    generarTablero();
    
    // Cerrar modal y limpiar formulario
    cerrarModal();
    this.reset();
    
    // Scroll suave al inicio en móvil
    if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Smooth scroll mejorado para móvil
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = isMobile ? 60 : 80; // Menos offset en móvil
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Actualizar números ocupados periódicamente (simulado)
// En producción, esto haría polling a tu backend
setInterval(() => {
    cargarConfiguracionRifa();
}, 30000); // Cada 30 segundos

// Prevenir zoom accidental en móvil al hacer doble tap
if (isMobile) {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Optimizar rendimiento en scroll para móvil
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Ocultar indicador flotante cuando estés en la sección de números
            ocultarIndicadorEnNumeros();
            ticking = false;
        });
        ticking = true;
    }
});

// Ocultar indicador flotante cuando el usuario está en la sección de números
function ocultarIndicadorEnNumeros() {
    const indicador = document.getElementById('indicadorFlotante');
    const seccionNumeros = document.getElementById('numeros');
    
    if (!indicador || !seccionNumeros) return;
    
    const rect = seccionNumeros.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Si la sección de números está visible en la pantalla
    if (rect.top < windowHeight && rect.bottom > 0) {
        indicador.classList.add('hidden');
    } else {
        indicador.classList.remove('hidden');
    }
}
