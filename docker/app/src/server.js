// vim: ft=javascript:  ts=3: sw=3: noet:

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import TAREAS  from './tareas.js';

// Para que __filename y __dirname funcionen en ES_MODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const PORT = 3000;
const app = express();


// Configuramos las templates
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


// Configurar donde guardamos los documentos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// ===== RUTAS =====
app.get('/', (req,res) => {
	res.render('index',{
		tareas: TAREAS.getAll(),
		datos: TAREAS.getEmptyTask(),
		errores: [],
	});
});


// ====== ARRANCAR EL SERVIDOR ======
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Aplicación web Tareas escuchando en el puerto ${PORT}`);
});