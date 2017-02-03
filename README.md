# Kwick chat

## Introduction
*This is a school exercise.*  
The purpose was to use all the functions included in the [Kwick API](http://greenvelvet.alwaysdata.net/kwick/index.html) to display a live chatroom available with sign up and login.  

**I have no access to the back-end of the application so I cannot be held responsible for the content of the messages sent through the API and the users nicknames.**

## The application
**Kwick chat** is a simple AngularJS application. Using the [Kwick API](http://greenvelvet.alwaysdata.net/kwick/index.html), the user can register a nickname and password to enter the chatroom. Once logged, he can consult all messages sent this year (and still saved into the back-end) and see new messages as the chat refhreshes himself every two seconds.  
The members list displays all logged users also marked by a green circle into the chat window.  

**The app is in english to match the API callbacks, comments are in french.**

## Dependencies and credits
- API : [Kwick API](http://greenvelvet.alwaysdata.net/kwick/index.html) maintained by Thierry Tranchina for *Ecole Multimédia*
- [AngularJS](https://angularjs.org/) powered by Google
- ngStorage module [(Github)](https://github.com/gsklee/ngStorage) 
- Angularjs scroll glue [(Github)](https://github.com/Luegg/angularjs-scroll-glue)
- Normalize.css [(Github)](https://necolas.github.io/normalize.css/)
- [FontAwesome](http://fontawesome.io/)


The live demo is coming soon, if you want to test the app, don't forget to run `npm install` for dependencies.