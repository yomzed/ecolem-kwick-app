/* ----------------------
Utilisation de l'API Kwick
App config
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

// Création de l'application
let app = angular.module('kwick-app', []);

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

	}
});
