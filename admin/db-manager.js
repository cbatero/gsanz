// ============================================
// GESTOR DE BASE DE DATOS LOCAL
// Sistema sin backend para GitHub Pages
// ============================================

class DBManager {
    constructor() {
        this.DB_KEY = 'gsanz_rifa_db';
        this.init();
    }
    
    // Inicializar base de datos
    init() {
        const db = this.getDB();
        if (!db) {
            this.setDB(this.getDefaultData());
        }
    }
    
    // Obtener datos por defecto
    getDefaultData() {
        return {
            encrypted: false,
            rifa: {
                nombre: "Cadena Gucci",
                descripcion: "Cadena Gucci en oro laminado de 18k",
                valor: "650000",
                imagen: "cadena-premio.jpg",
                caracteristicas: [
                    "Oro Laminado 18k",
                    "Diseño Gucci Original",
                    "Garantía de 5 Años",
                    "Estuche de Presentación"
                ],
                precioNumero: "12000",
                precioPromo: "20000",
                numeroInicio: 1,
                numeroFin: 100,
                numerosOcupados: [],
                fechaSorteo: "",
                juegoLoteria: "",
                estado: "activa",
                ganador: null
            },
            ventas: [],
            contacto: {
                whatsapp: "573135330859",
                instagram: "@gsanzjoyeria"
            },
            lastUpdate: Date.now()
        };
    }
    
    // Obtener toda la base de datos
    getDB() {
        try {
            const data = localStorage.getItem(this.DB_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error al leer DB:', error);
            return null;
        }
    }
    
    // Guardar toda la base de datos
    setDB(data) {
        try {
            data.lastUpdate = Date.now();
            localStorage.setItem(this.DB_KEY, JSON.stringify(data));
            console.log('✅ Datos guardados en localStorage');
            return true;
        } catch (error) {
            console.error('❌ Error al guardar DB:', error);
            return false;
        }
    }
    
    // Registrar venta
    registrarVenta(venta) {
        const db = this.getDB();
        
        // Agregar venta
        db.ventas.push(venta);
        
        // Actualizar números ocupados
        venta.numeros.forEach(num => {
            if (!db.rifa.numerosOcupados.includes(num)) {
                db.rifa.numerosOcupados.push(num);
            }
        });
        
        this.setDB(db);
        return db;
    }
    
    // Eliminar venta
    eliminarVenta(ventaId) {
        const db = this.getDB();
        
        // Encontrar venta
        const venta = db.ventas.find(v => v.id === ventaId);
        if (!venta) return null;
        
        // Remover números de ocupados
        venta.numeros.forEach(num => {
            const index = db.rifa.numerosOcupados.indexOf(num);
            if (index > -1) {
                db.rifa.numerosOcupados.splice(index, 1);
            }
        });
        
        // Remover venta
        db.ventas = db.ventas.filter(v => v.id !== ventaId);
        
        this.setDB(db);
        return db;
    }
    
    // Actualizar configuración
    actualizarConfig(config) {
        const db = this.getDB();
        db.rifa = { ...db.rifa, ...config };
        this.setDB(db);
        return db;
    }
    
    // Exportar a JSON
    exportarJSON() {
        const db = this.getDB();
        const jsonString = JSON.stringify(db, null, 2);
        
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
        
        return true;
    }
    
    // Importar desde JSON
    importarJSON(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    this.setDB(data);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }
    
    // Cargar desde archivo data/rifa-data.json
    async cargarDesdeArchivo() {
        try {
            const response = await fetch('../data/rifa-data.json?t=' + Date.now());
            const data = await response.json();
            this.setDB(data);
            return data;
        } catch (error) {
            console.error('Error al cargar desde archivo:', error);
            return null;
        }
    }
    
    // Sincronizar: cargar desde archivo y guardar en localStorage
    async sincronizar() {
        const data = await this.cargarDesdeArchivo();
        if (data) {
            console.log('✅ Sincronizado con archivo');
            return data;
        }
        return null;
    }
}

// Instancia global
const dbManager = new DBManager();
