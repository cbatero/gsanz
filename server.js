const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Ruta del archivo de datos
const DATA_FILE = path.join(__dirname, 'data', 'rifa-data.json');

// Leer datos
app.get('/api/data', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error al leer datos:', error);
        res.status(500).json({ error: 'Error al leer datos' });
    }
});

// Guardar datos
app.post('/api/data', (req, res) => {
    try {
        const data = req.body;
        data.lastUpdate = Date.now();
        
        // Crear backup antes de guardar
        const backupFile = path.join(__dirname, 'data', `backup-${Date.now()}.json`);
        if (fs.existsSync(DATA_FILE)) {
            fs.copyFileSync(DATA_FILE, backupFile);
        }
        
        // Guardar datos
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        
        console.log('✅ Datos guardados exitosamente');
        res.json({ success: true, message: 'Datos guardados correctamente' });
    } catch (error) {
        console.error('❌ Error al guardar datos:', error);
        res.status(500).json({ error: 'Error al guardar datos' });
    }
});

// Registrar venta
app.post('/api/ventas', (req, res) => {
    try {
        const venta = req.body;
        
        // Leer datos actuales
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        
        // Agregar venta
        if (!data.ventas) {
            data.ventas = [];
        }
        data.ventas.push(venta);
        
        // Actualizar números ocupados
        if (!data.rifa.numerosOcupados) {
            data.rifa.numerosOcupados = [];
        }
        venta.numeros.forEach(num => {
            if (!data.rifa.numerosOcupados.includes(num)) {
                data.rifa.numerosOcupados.push(num);
            }
        });
        
        data.lastUpdate = Date.now();
        
        // Guardar
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        
        console.log('✅ Venta registrada:', venta.numeros.join(', '));
        res.json({ success: true, message: 'Venta registrada correctamente', data });
    } catch (error) {
        console.error('❌ Error al registrar venta:', error);
        res.status(500).json({ error: 'Error al registrar venta' });
    }
});

// Eliminar venta
app.delete('/api/ventas/:id', (req, res) => {
    try {
        const ventaId = parseInt(req.params.id);
        
        // Leer datos actuales
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        
        // Encontrar venta
        const venta = data.ventas.find(v => v.id === ventaId);
        if (!venta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        
        // Remover números de ocupados
        venta.numeros.forEach(num => {
            const index = data.rifa.numerosOcupados.indexOf(num);
            if (index > -1) {
                data.rifa.numerosOcupados.splice(index, 1);
            }
        });
        
        // Remover venta
        data.ventas = data.ventas.filter(v => v.id !== ventaId);
        data.lastUpdate = Date.now();
        
        // Guardar
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        
        console.log('✅ Venta eliminada:', ventaId);
        res.json({ success: true, message: 'Venta eliminada correctamente', data });
    } catch (error) {
        console.error('❌ Error al eliminar venta:', error);
        res.status(500).json({ error: 'Error al eliminar venta' });
    }
});

// Actualizar configuración
app.put('/api/config', (req, res) => {
    try {
        const config = req.body;
        
        // Leer datos actuales
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        
        // Actualizar configuración
        data.rifa = { ...data.rifa, ...config };
        data.lastUpdate = Date.now();
        
        // Guardar
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        
        console.log('✅ Configuración actualizada');
        res.json({ success: true, message: 'Configuración actualizada', data });
    } catch (error) {
        console.error('❌ Error al actualizar configuración:', error);
        res.status(500).json({ error: 'Error al actualizar configuración' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   🎯 Servidor GSanz Rifas Iniciado        ║
╠════════════════════════════════════════════╣
║   Puerto: ${PORT}                            ║
║   URL Admin: http://localhost:${PORT}/admin ║
║   URL Público: http://localhost:${PORT}     ║
║   API: http://localhost:${PORT}/api         ║
╚════════════════════════════════════════════╝
    `);
});
