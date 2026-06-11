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


// Middleware para endender formularios POST html
app.use(express.urlencoded({
	extended: true,
	inflate: true,
   limit: "1mb",
   parameterLimit: 5000,
   type: "application/x-www-form-urlencoded",
}));


// ===== RUTAS =====
app.get('/', (req,res) => {
	res.render('index',{
		tareas: TAREAS.getAll(),
		datos: TAREAS.getEmptyTask(),
		errores: [],
	});
});


app.post('/tareas', (req,res) => {
	const errores = TAREAS.addTask(req.body);
	let ret;

	if (errores.length > 0 ) {
		ret = res.status(400).render('index',{
			tareas: TAREAS.getAll(),
			datos: req.body,
			errores
		});
	}
	else {
		ret = res.redirect('/');
	}

	return ret;
} );


app.post('/tareas/:taskId/delete', (req, res) => {
	const taskId = Number(req.params.taskId);
	TAREAS.deleteTask(taskId);

	return res.redirect('/');
});


// ====== ARRANCAR EL SERVIDOR ======
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Aplicación web Tareas escuchando en el puerto ${PORT}`);
});