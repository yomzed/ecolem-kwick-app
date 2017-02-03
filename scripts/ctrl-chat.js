/* ----------------------
Utilisation de l'API Kwick
Contrôleur Chat
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

/* Contrôleur du chat */
app.controller('ChatCtrl', ['$http', '$scope', '$rootScope', '$localStorage', '$interval', 'kwFactory', 'kwConst', function($http, $scope, $rootScope, $localStorage, $interval, kwFactory, kwConst){
	let chat 				 = this;
	chat.messages 	 = [];
	chat.membersList = [];

	/* Scroll auto */
	chat.glue = true;

	/* Update auto */
	chat.tec = function(){
		chat.members(); // Mise à jour de la liste des membres
		chat.content(); // Mise à jour des messages
	}

	/* Update auto si connecté */
	$scope.$watch(function(rootScope){ return rootScope.logStatus; },
								function(newValue, oldValue){
									if(newValue == true){
										$rootScope.interval = $interval(chat.tec, 2000);
									}
								});
		

	/* Récupération des messages du chat */
	chat.content = function(){
		let url = kwConst.url + "talk/list/" + $localStorage.token + "/1483290869";

		/* Appel API */
		$http.jsonp(url).then(function(rep){
			if(chat.messages.length == rep.data.result.talk.length){
				/* Pas d'update si pas de nouveaux messages */
				return false;
			} else {
				/* Injection des messages */
				chat.messages = rep.data.result.talk;

				/* Traitement de la date */
				chat.messages.forEach(function(elem){
					elem.date = kwFactory.dateFormat(elem.timestamp);
					/* Déclaration du paramètre en ligne ou non */
					elem.online = false;
				});

				/* Ajout d'un flag si membre connecté */
				$scope.$watch(chat.membersList,
											function(newValue, oldValue){
												chat.messages.forEach(function(elem){
													if(chat.membersList.indexOf(elem.user_name) != -1){
														elem.online = true;
													}
												});
											});	
			}
		});
	} /* Fin récupération des messages */

	/* Liste des membres actifs */
	chat.members = function(){
		let url = kwConst.url + "user/logged/" + $localStorage.token;

		/* Appel API */
		$http.jsonp(url).then(function(rep){
			if(rep.data.result.status == "done"){
				chat.membersList = rep.data.result.user;
			}
		});
	} /* Fin liste des membres */

	/* Envoi d'un nouveau message */
	chat.send = function(){
		if(chat.newMess){
			let newMess = encodeURI(chat.newMess);
			let url = kwConst.url + "say/" + $localStorage.token + "/" + $localStorage.user.id + "/" + newMess;

			/* Appel API */
			$http.jsonp(url).then(function(rep){
				let form = document.getElementById('formSend');
				form.reset();
				/* Update des messages */
				chat.tec();
			});
		}
	} /* Fin envoi de message */

}]);