const builder = require('botbuilder');

module.exports = [
		  function( session, results ) {
		      builder.Prompts.text(session,`Perfecto, ¿me podrías decir que tipo de profesional eres? (e.g. residente, enfermero/a, etc.)`);
		  },
		  function( session, results ) {
		      session.userData.type = results.response;
		      builder.Prompts.text(session, `¿Y en qué dirección de e-mail te podemos contactar?`);
		  },
		  function( session, results ) {
		      session.userData.email = results.response;
		      builder.Prompts.confirm(session, `A ver si lo adivino. ¿Quieres proponer una mejora dentro del hospital?`);
		  },
		  function( session, results ) {
		      if (results.response) {
		      session.userData.idea.type = "mejora";
		      session.beginDialog('/mejora');
		      } else {
			  session.send(`Uhm... entonces tendrás que esperar a una próxima versión de mi alma... :(`);
			 }
		  }
	       ];
		  