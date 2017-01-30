/* ----------------------
Utilisation de l'API Kwick
Contrôleurs Angular
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

// Contrôleur principal
app.controller('MainCtrl',function($http, $scope) {
	let main = this;

	$scope.token = 0; // Token de connexion

	// Test du ping de l'API
	$scope.pingTest = function() {
		var status = false;
		$http.jsonp('http://greenvelvet.alwaysdata.net/kwick/api/ping').then(function(rep){
			if(rep.data.result.ready){ return true; } else { return false; }
		});
	}

}) /* Fin contrôleur principal */

// Contrôleur inscription/login
.controller('UserCtrl', function($http, $scope, kwFactory) {
	let user = this;

	user.signup = false; // Flag d'affichage inscription/connexion

	// Login
	user.login = function() {
		let url = 'http://greenvelvet.alwaysdata.net/kwick/api/login/'+user.logname+'/'+user.logpass;

		/* Appel API */
		kwFactory.recupJson(url)
						 .then(function(data) {
						 	console.log(data.data);
						 });
	} /* Fin login */

	// Inscription
	user.signUp = function() {
		/* Vérification mdp */
		if(user.pass == user.pass2) {
			let url = "http://greenvelvet.alwaysdata.net/kwick/api/signup/"+user.name+"/"+user.pass;

			/* Appel API */
			kwFactory.recupJson(url)
							 .then(function(data) {
							 	/* some code here */
							 });
		} else {
			alert('Les mots de passe renseignés ne correspondent pas');
		} /* Fin vérification mdp */
	}

});