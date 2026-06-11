// vim: set ft=javascript noet ts=3 sw=3:

function validateTaskFunction (task) {

   const errores = [];

   const prioridadesValidas = [
      "baja",
      "media",
      "alta"
   ];

   const estadosValidos = [
      "pendiente",
      "en-proceso",
      "completada"
   ];

   const etiquetasValidas = [
      "html",
      "express",
      "validacion"
   ];

   if (
      !task.titulo ||
      task.titulo.trim().length < 3
   ) {
      errores.push(
         "El título debe tener al menos 3 caracteres."
      );
   }

   if (
      task.titulo &&
      task.titulo.length > 60
   ) {
      errores.push(
         "El título no puede superar los 60 caracteres."
      );
   }

   if (
      task.titulo &&
      task.titulo.toLowerCase().includes("urgente")
   ) {
      errores.push(
         "No escribas 'urgente' en el título. Usa la prioridad alta."
      );
   }

   if (
      task.descripcion &&
      task.descripcion.length > 300
   ) {
      errores.push(
         "La descripción no puede superar los 300 caracteres."
      );
   }

   if (
      !/^TAR-[0-9]{3}$/.test(
         task.codigo ?? ""
      )
   ) {
      errores.push(
         "El código debe tener formato TAR-001."
      );
   }

   if (
      !prioridadesValidas.includes(
         task.prioridad
      )
   ) {
      errores.push(
         "La prioridad no es válida."
      );
   }

   if (
      !estadosValidos.includes(
         task.estado
      )
   ) {
      errores.push(
         "El estado no es válido."
      );
   }

   const fechaLimite =
      new Date(
         task.fechaLimite
      );

   const hoy = new Date();

   hoy.setHours(
      0,
      0,
      0,
      0
   );

   if (
      Number.isNaN(
         fechaLimite.getTime()
      )
   ) {
      errores.push(
         "La fecha límite no es válida."
      );
   }
   else if (
      fechaLimite < hoy
   ) {
      errores.push(
         "La fecha límite no puede ser anterior a hoy."
      );
   }

   const estimacion =
      Number(
         task.estimacionHoras
      );

   if (
      Number.isNaN(
         estimacion
      ) ||
      estimacion < 0.5 ||
      estimacion > 40
   ) {
      errores.push(
         "La estimación debe estar entre 0.5 y 40 horas."
      );
   }

   if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
         task.responsableEmail ?? ""
      )
   ) {
      errores.push(
         "El email del responsable no es válido."
      );
   }

   const etiquetasRecibidas =
      Array.isArray(
         task.etiquetas
      )
         ? task.etiquetas
         : task.etiquetas
            ? [
                 task.etiquetas
              ]
            : [];

   const hayEtiquetaInvalida =
      etiquetasRecibidas.some(
         etiqueta =>
            !etiquetasValidas.includes(
               etiqueta
            )
      );

   if (
      hayEtiquetaInvalida
   ) {
      errores.push(
         "Alguna etiqueta no es válida."
      );
   }

   if (
      task.confirmacion !== "on"
   ) {
      errores.push(
         "Debes confirmar que los datos son correctos."
      );
   }

   return errores;

}

export default validateTaskFunction; 