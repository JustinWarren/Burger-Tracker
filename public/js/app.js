const app = angular.module('BurgerApp', []);

app.controller('MainController', ['$http',function($http) {
    const controller = this; //This is a controller variable
    this.indexOfEditFormToShow = null;
    this.loggedInUser = false;

    //This function will run when user clicks on submit button
    this.signup = function(){
      $http({
        url:'/users',
        method: 'POST',
        data: {
          username: this.signupUsername,
          password: this.signupPassword
        }
      }).then(function(response){
        controller.loggedInUser = response.data;
      })
    }

    //This function will run when user clicks on login button
    this.login = function() {
      $http({
        url: '/sessions',
        method: 'POST',
        data: {
          username: this.loginUsername,
          password: this.loginPassword
        }
      }).then(function(response){
        if(response.data.username){
          controller.loggedInUser = response.data;
        } else {
          controller.loginUsername = null;
          controller.loginPassword = null;
        }
      })
    }



//This function will delete a burger
    this.deleteBurger = function(burger) {
      $http({
        method: 'DELETE',
        url: '/burgers/' + burger._id
      }).then(
        function(response){
           controller.getBurgers();
        },
        function(error) {

        }
      );
    }

//This function will edit the burger
this.editBurger = function(burger) {
  $http({
    method: 'PUT',
    url: '/burgers/' + burger._id,
    data: {
      name: this.updatedBurger,
      location: this.updatedLocation,
      notes: this.updatedNotes
    }
  }).then(
    function(response){
      controller.getBurgers();
    },
    function(error){

    }
  );
}


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
