/* ----------------------
Utilisation de l'API Kwick
Contrôleurs Angular
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

// Contrôleur principal
app.controller('MainCtrl',function($http) {
	let main = this;

	// Test du ping
	main.test = function() {
		var status = false;
		$http.jsonp('http://greenvelvet.alwaysdata.net/kwick/api/ping').then(function(rep){
			if(rep.data.result.ready){ status = true; }
			return status;
		});
	}
	if(main.test){main.ok = true;}
});