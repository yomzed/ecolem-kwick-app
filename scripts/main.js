/* ----------------------
Utilisation de l'API Kwick
App config
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

// Création de l'application
let app = angular.module('kwick-app', []);

app.config(function($sceDelegateProvider){
	// Whitelist pour récupérer un JSONP sans problème
	 $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://greenvelvet.alwaysdata.net/**'
    ]);
});

// Service de vérification de l'état du serveur
app.service('Ping', ['$http', function($http){
		// Return true si le serveur est ok
		this.test = function(){
			var status = false;

			$http.jsonp('http://greenvelvet.alwaysdata.net/kwick/api/ping').then(function(rep){
				if(rep.data.result.ready){ status = true; }
				return status;
			});
			
		}
}]);