/* ----------------------
Utilisation de l'API Kwick
Contrôleur principal
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

/* Contrôleur principal */
app.controller('MainCtrl', ['$http', '$rootScope', '$localStorage', '$interval', 'kwFactory', 'kwConst', function($http, $rootScope, $localStorage, $interval, kwFactory, kwConst) {
	let main = this;
	$rootScope.mess = {
								status : false, // Affichage d'une notif
								detail : "", 		// Texte de la notif
								nature : false 		// "valid" ou "error"
							};

	/* Test de réponse du serveur */
	if(kwFactory.testPing() == false){
		kwFactory.error("API connection is broken. Please try later.");
	}

	/* Vérification de la validité du token */
	if(!$localStorage.token){$localStorage.token = 0;}
	kwFactory.verifToken($localStorage.token);

	/* Déconnexion */
	main.logOut = function(){
		let url = kwConst.url + "logout/" + $localStorage.token + "/ "+ $localStorage.user.id;
		$http.jsonp(url).then(function(rep){
			/* Stop de l'update auto */
			$interval.cancel($rootScope.interval);

			/* Destruction de session */
			$localStorage.user = {};
			$localStorage.token = 0;

			/* Retour au login */
			$rootScope.showWindow = false;
			$rootScope.logStatus = false;
			kwFactory.valid("You quit the chat successfully");
			$rootScope.showWindow = true;
		});
	} /* Fin déconnexion */

	/* Toggle de la liste des membres */
	main.toggle = function(){
		let div = document.getElementById('memberList');
		let content = document.getElementById('opacityId');
		let value = div.offsetWidth;

		if(value == 0){
			content.style.opacity = "1";
			div.style.width = "50%";
		} else {
			div.style.width = "0%";
			content.style.opacity = "0";
		}

	}

}]); /* Fin contrôleur principal */