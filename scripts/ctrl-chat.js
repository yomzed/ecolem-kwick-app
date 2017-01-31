/* ----------------------
Utilisation de l'API Kwick
Contrôleur Chat
Ecole multimédia - 30/01/2017
Yoan Martinez
------------------------- */

app.controller('ChatCtrl', function($http, $rootScope, $localStorage, kwFactory){
	let chat = this;
	chat.messages = [];
	/* Récupération des messages du chat */
	chat.tec = kwFactory.recupJson("http://greenvelvet.alwaysdata.net/kwick/api/talk/list/"+$localStorage.token+"/1483290869");
	chat.tec.then(function(rep){
		chat.messages = rep.data.result.talk;
		for(let i = 0; i < chat.messages.length; i++){
			chat.messages[i].date = kwFactory.dateFormat(chat.messages[i].timestamp);
		}
	}).then(function(){
		kwFactory.scrollAuto();
	});

	/* Envoi d'un nouveau message */
	chat.send = function(){
		if(chat.newMess){
			let newMess = encodeURI(chat.newMess);
			let url = "http://greenvelvet.alwaysdata.net/kwick/api/say/"+$localStorage.token+"/"+$localStorage.user.id+"/"+newMess;
			kwFactory.recupJson(url);
		}
		kwFactory.scrollAuto();
	}

});