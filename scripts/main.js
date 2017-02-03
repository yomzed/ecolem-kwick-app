/* ----------------------
Utilisation de l'API Kwick
App config
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

/* ucfirst de PHP importé au JS */
function ucfirst(string){
	string += " ";
	let first = string.charAt(0).toUpperCase();
	return first + string.substr(1);
}

/* Création de l'application */
let app = angular.module('kwick-app', ['ngStorage', 'luegg.directives']);

app.config(function($sceDelegateProvider){
	// Whitelist pour accéder à l'API sans erreur dans la console
	 $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://greenvelvet.alwaysdata.net/**'
    ]);
});

/* Constantes */
app.constant('kwConst', {
	"url" : "http://greenvelvet.alwaysdata.net/kwick/api/"
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

/* Stockage des fonctions */
app.factory('kwFactory', function($http, $rootScope, kwConst) {
	return {
		testPing : function(){
			$http.jsonp(kwConst.url+"ping")
					 .then(function(rep){
					 	return rep.data.result.ready;
					 });
		},
		/* Vérification de la validité du token */
		verifToken : function(token){
			if(token){
				$http.jsonp(kwConst.url+"user/logged/"+token)
						 .then(function(rep){
					var result = (rep.data.result.status == "done" ? true : false);
					$rootScope.logStatus = result;
					if(!$rootScope.showWindow){$rootScope.showWindow = true;}
					return result;
				});
			} else {
				$rootScope.logStatus = false;
				if(!$rootScope.showWindow){$rootScope.showWindow = true;}
				return false;
			}
		},
		/* Erreur et notification */
		error : function(mess){
			$rootScope.mess.status = true;
			$rootScope.mess.detail = ucfirst(mess);
			$rootScope.mess.nature = false;
		},
		valid : function(mess){
			$rootScope.mess.status = true;
			$rootScope.mess.detail = ucfirst(mess);
			$rootScope.mess.nature = true;
		},
		/* Formatage du timestamp */
		dateFormat : function(timestamp){
			let date = new Date(timestamp*1000);
			return date.toLocaleString('fr');
		},
		/* Auto-scroll down à l'envoi de message */
		scrollAuto : function(){
    let element = document.getElementById("scrollW");
    element.scrollTop = element.scrollHeight;
		}
	}
});