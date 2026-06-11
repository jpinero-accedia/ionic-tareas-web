// vim: set ft=javascript noet ts=3 sw=3:

const form =
   document.querySelector("#form-tarea");

const titulo =
   document.querySelector("#titulo");

const codigo =
   document.querySelector("#codigo");

const fechaLimite =
   document.querySelector("#fechaLimite");

const estimacionHoras =
   document.querySelector("#estimacionHoras");

const responsableEmail =
   document.querySelector("#responsableEmail");

if (
   form &&
   titulo &&
   codigo &&
   fechaLimite &&
   estimacionHoras &&
   responsableEmail
) {

   const hoy =
      new Date()
         .toISOString()
         .split("T")[0];

   fechaLimite.min =
      hoy;

   titulo.addEventListener(
      "input",
      () => {

         titulo.setCustomValidity("");

         if (
            titulo.value
               .toLowerCase()
               .includes("urgente")
         ) {

            titulo.setCustomValidity(
               "No escribas 'urgente' en el título. Usa la prioridad alta."
            );

         }

      }
   );

   codigo.addEventListener(
      "input",
      () => {

         codigo.setCustomValidity("");

         const patron =
            /^TAR-[0-9]{3}$/;

         if (
            codigo.value &&
            !patron.test(
               codigo.value
            )
         ) {

            codigo.setCustomValidity(
               "El código debe tener el formato TAR-001."
            );

         }

      }
   );

   fechaLimite.addEventListener(
      "input",
      () => {

         fechaLimite.setCustomValidity("");

         if (
            fechaLimite.value &&
            fechaLimite.value < hoy
         ) {

            fechaLimite.setCustomValidity(
               "La fecha límite no puede ser anterior a hoy."
            );

         }

      }
   );

   estimacionHoras.addEventListener(
      "input",
      () => {

         estimacionHoras.setCustomValidity("");

         const horas =
            Number(
               estimacionHoras.value
            );

         if (
            Number.isNaN(
               horas
            ) ||
            horas < 0.5 ||
            horas > 40
         ) {

            estimacionHoras.setCustomValidity(
               "La estimación debe estar entre 0.5 y 40 horas."
            );

         }

      }
   );

   responsableEmail.addEventListener(
      "input",
      () => {

         responsableEmail.setCustomValidity("");

         if (
            responsableEmail.validity.typeMismatch
         ) {

            responsableEmail.setCustomValidity(
               "Introduce un email válido."
            );

         }

      }
   );

   form.addEventListener(
      "submit",
      event => {

         titulo.dispatchEvent(
            new Event("input")
         );

         codigo.dispatchEvent(
            new Event("input")
         );

         fechaLimite.dispatchEvent(
            new Event("input")
         );

         estimacionHoras.dispatchEvent(
            new Event("input")
         );

         responsableEmail.dispatchEvent(
            new Event("input")
         );

         if (
            !form.checkValidity()
         ) {

            event.preventDefault();

            form.reportValidity();

         }

      }
   );

}