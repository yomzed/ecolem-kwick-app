/* ----------------------
Utilisation de l'API Kwick
Contrôleur Login/Sign up
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

/* Contrôleur inscription/login */
app.controller('UserCtrl', function($http, $rootScope, $localStorage, kwFactory) {
	let user = this;
	
	user.signup = false; // Flag d'affichage inscription/connexion

	/* Login */
	user.login = function() {
		$rootScope.mess.status = false;
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
			$rootScope.mess.status = false;
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
							 		/* Affichage validation d'inscription */
							 		kwFactory.valid(data.data.result.message);

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