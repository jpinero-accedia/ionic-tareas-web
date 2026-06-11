// vim: ft=javascript:  ts=3: sw=3: noet:

class AlmacenTareas {
	constructor () {
		this.datos = [
			{
				id: 1,
				titulo: "Preparar clase",
				descripcion: "Revisar ejemplos de formularios en express.",
				codigo: 'TAR-001',
				prioridad: 'alta',
				estado: 'pendiente',
				fechaLimite: '2026-06-20',
				estimacionHoras: 2,
				responsableEmail: 'profesor@example.com',
				etiquetas: [
					'express',
					'validación'
				],
				publica: true
			},
			{
				id: 2,
				titulo: "Corregir ejercicios",
				descripcion: "Revisar las entregas del alumnado.",
				codigo: 'TAR-002',
				prioridad: 'media',
				estado: 'en-proceso',
				estimacionHoras: 3,
				responsableEmail: 'docente@example.com',
				fechaLimite: '2026-06-21',
				etiquetas: [
				   "html" 
				],
				publica: false
			},
		];

		this.nextId = 3;
	}

	getAll () {
		return this.datos;
	}

	getEmptyTask () {
		return {
			id: this.nextId,
			titulo: "",
			descripcion: "",
			codigo: '',
			prioridad: '',
			estado: 'pendiente',
			estimacionHoras: 0,
			responsableEmail: '',
			fechaLimite: '',
			etiquetas: [],
			publica: false,
			confirmacion: '',
		};
	}
};

const TAREAS = new AlmacenTareas();

export default TAREAS;
