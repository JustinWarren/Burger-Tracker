const app = angular.module('BurgerApp', []);


// Controllers control a certain area of the page. A controller can control it's own HTML element and the children inside of it.
//Cannot use an ES6 arrow function in Angularjs
app.controller('MainController', function(){
  this.hello = 'oh hai!';
});
