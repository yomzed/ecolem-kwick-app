/* ----------------------
Utilisation de l'API Kwick
App config & main controller
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

// Création de l'application
let app = angular.module('kwick-app', ['ngStorage']);

app.config(function($sceDelegateProvider){
	// Whitelist pour accéder à l'API sans erreur dans la console
	 $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://greenvelvet.alwaysdata.net/**'
    ]);
});

/* Définition des vues */
app.directive('kwLogin', function(){
	return {
		restrict: 'E',
		templateUrl: 'partials/user.html'
	};
})
   .directive('kwChat', function(){
	   return {
		   restrict: 'E',
		   templateUrl: 'partials/chat.html',
	   };
});

// Stockage des fonctions
app.factory('kwFactory', function($http, $rootScope) {
	return {
		testPing : function(){
			$http.jsonp("http://greenvelvet.alwaysdata.net/kwick/api/ping")
					 .then(function(rep){
					 	return rep.data.result.ready;
					 });
		},
		/* Récupération des données de l'API */
		recupJson : function(url){
			return $http.jsonp(url);
		},
		/* Vérification de la validité du token */
		verifToken : function(token){
			if(token){
				$http.jsonp("http://greenvelvet.alwaysdata.net/kwick/api/user/logged/"+token)
						 .then(function(rep){
					var result = (rep.data.result.status == "done" ? true : false);
					$rootScope.logStatus = result;
					return result;
				});
			} else {
				$rootScope.logStatus = false;
				return false;
			}
		},
		/* Erreur et notification */
		error : function(mess){
			$rootScope.mess.status = true;
			$rootScope.mess.detail = ucfirst(mess);
			$rootScope.mess.nature = "error";
		},
		valid : function(mess){
			$rootScope.mess.status = true;
			$rootScope.mess.detail = ucfirst(mess);
			$rootScope.mess.nature = "valid";
		},
		/* Formatage du timestamp */
		dateFormat : function(timestamp){
			let date = new Date(timestamp*1000);
			return date.toLocaleString('fr');
		},
		scrollAuto : function(){
    let element = document.getElementById("scrollW");
    element.scrollTop = element.scrollHeight;
}
	}
});

/*app.run(function($localStorage, $rootScope, kwFactory){
	$rootScope.logStatus = false;
	if(!$localStorage.token){$localStorage.token = 0;}
	$rootScope.logStatus = kwFactory.verifToken($localStorage.token);
});*/

/* Contrôleur principal */
app.controller('MainCtrl',function($http, $rootScope, $localStorage, kwFactory) {
	let main = this;
	$rootScope.mess = {
								status : false, // Affichage d'une notif
								detail : "", 		// Texte de la notif
								nature : "" 		// "valid" ou "error"
							}; 

	/* Test de réponse du serveur */
	if(kwFactory.testPing() == false){
		kwFactory.error("API connection is broken. Please try later.");
	}

	/* Vérification de la validité du token */
	if(!$localStorage.token){$localStorage.token = 0;}
	kwFactory.verifToken($localStorage.token);

}); /* Fin contrôleur principal */

/* ucfirst de PHP importé au JS */
function ucfirst(string){
	string += " ";
	let first = string.charAt(0).toUpperCase();
	return first + string.substr(1);
}
