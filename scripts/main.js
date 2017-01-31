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
app.factory('kwFactory', function($http) {
	return {
		/* Récupération des données de l'API */
		recupJson : function(url){
			return $http.jsonp(url);
		},
		/* Vérification de la validité du token */
		verifToken : function(token, url){
			if(token){
				$http.jsonp(url+token).then(function(rep){
					console.log(rep.data.result.status);
					let result = rep.data.result.status = "done" ? true : false;
					return result;
				});
			} else {
				console.log("No data");
				return false;
			}
		},
		/* Erreur et notification */
		error : function(mess){
			user.mess.status = true;
			user.mess.detail = ucfirst(mess);
			user.mess.nature = "error";
		},
		valid : function(mess){
			user.mess.status = true;
			user.mess.detail = ucfirst(mess);
			user.mess.nature = "valid";
		}
	}
});

/* Contrôleur principal */
app.controller('MainCtrl',function($http, $rootScope, $localStorage, kwFactory) {
	let main = this;

	/* Vérification de la validité du token */
	if(!$localStorage.token){$localStorage.token = 0;}
	$rootScope.status = kwFactory.verifToken($localStorage.token, "http://greenvelvet.alwaysdata.net/kwick/api/user/logged/");

}); /* Fin contrôleur principal */

/* ucfirst de PHP importé au JS */
function ucfirst(string){
	string += " ";
	let first = string.charAt(0).toUpperCase();
	return first + string.substr(1);
}
