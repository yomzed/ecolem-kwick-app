/* ----------------------
Utilisation de l'API Kwick
Contrôleurs Angular
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

/* Contrôleur principal */
app.controller('MainCtrl',function($http, $rootScope, $localStorage, kwFactory) {
	let main = this;
	if(!$localStorage.token){$localStorage.token = 0;}

}) /* Fin contrôleur principal */

/* Contrôleur inscription/login */
.controller('UserCtrl', function($http, $rootScope, $localStorage, kwFactory) {
	let user = this;
	user.mess = {
								status : false, // Affichage d'une notif
								detail : "", 		// Texte de la notif
								nature : "" 		// "valid" ou "error"
							}; 
	user.signup = false; // Flag d'affichage inscription/connexion

	/* Login */
	user.login = function() {
		user.mess.status = false;
		let url = 'http://greenvelvet.alwaysdata.net/kwick/api/login/'+user.logname+'/'+user.logpass;

		/* Appel API */
		kwFactory.recupJson(url)
						 .then(function(data) {
						 	if(data.data.result.status == 'done'){

						 		/* Construction de la session */
						 		$localStorage.user = { id   : data.data.result.id,
																			 login: user.logname };
						 		$localStorage.token = data.data.result.token;

						 		/* Vidage du formulaire */
						 		let form = document.getElementById("loginForm");
							 	form.reset();

						 	} else if(data.data.result.status == 'failure'){
						 		kwFactory.error(data.data.result.message);
							}
						 });
	} /* Fin login */

	/* Inscription */
	user.signUp = function() {
		if(user.pass == user.pass2) {
			user.mess.status = false;
			let url = "http://greenvelvet.alwaysdata.net/kwick/api/signup/"+user.name+"/"+user.pass;

			/* Appel API */
			kwFactory.recupJson(url)
							 .then(function(data) {
							 	if(data.data.result.status == 'done'){

							 		/* Vidage du formulaire */
							 		let form = document.getElementById("loginForm");
							 		form.reset();
							 		/* Retour au login */
							 		user.signup = false;

							 	} else if(data.data.result.status == 'failure'){
							 		/* Affichage de l'erreur */
						 			kwFactory.error(data.data.result.message);
							 	}
							 	
							 });
		} else {
			/* Affichage de l'erreur */
			kwFactory.error("Password doesn't match");
		}
	} /* Fin inscription */

});

/* Réponse erreur token 
Object
kwick:
	completed_in : "0.160"
	status : "ok"
	version : "1.0"
	Object result :
		message : "wrong token. Access denied"
		status : "failure" */