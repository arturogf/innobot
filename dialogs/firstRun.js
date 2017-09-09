const builder = require('botbuilder');

module.exports = [
		  function( session ) {
		      builder.Prompts.text(session, `
¡Buenos días INNOVADOR(A)! Soy el chatbot de la Unidad de Innovación del Hospital Clínico San Carlos.
Si tienes una idea original u proyecto innovador mejoraría la calidad de vida,
la vivencia de la enfermedad, la experiencia asistencial o cualquier otro aspecto, cuéntanosla. Este
es tu lugar. Trabajamos para ti.

¿Puedes decirme como te llamas? Yo innobot, encantado de saludarte.
`);
  },
  function( session, results ) {
    session.userData.fullName = results.response;
    session.userData.name = results.response.split(' ')[0];
    builder.Prompts.confirm(session, `Hola ${session.userData.name}. ¿Eres del hospital?`);
  },
  function( session, results, next ) {
    if (results.response) {
      session.userData.isLocal = true;
      session.beginDialog('/local');
    } else {
	//session.beginDialog('/externo');
	session.send(`Por ahora estamos ofreciendo el servicio sólo a los profesionales del hospital. ¡Vuelve pronto, tendremos novedades!`);
    }
  }
];