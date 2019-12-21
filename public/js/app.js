const app = angular.module('BurgerApp', []);

app.controller('MainController', ['$http',function($http) {
    const controller = this; //This is a controller variable

//This function creates a new burger and makes a post request to /burgers
    this.createBurger = function() {
      $http({
        method: 'POST',  //This is a request to post a new burger to DB
        url: '/burgers',
        data: {  //this data will be req.body in controller
          name: this.name,
          location: this.location,
          notes: this.notes
        }
      }).then(function(response) {
        controller.getBurgers(); //get all burgers when new burger is added
      }, function(){
        console.log('error');
      })
  }

//This function will make a get request to display all burgers
  this.getBurgers = function(){
    $http({
      method: 'GET', //This gets all entries from DB
      url: '/burgers',
    }).then(function(response){
       controller.burgers = response.data;
    }, function() {
      console.log('error');
    });
  };

  this.getBurgers(); //This will call function when controller is instantiated in body



}]);
