const app = angular.module('BurgerApp', []);

app.controller('MainController', ['$http',function($http) {
    const controller = this; //This is a controller variable
    this.indexOfEditFormToShow = null;
    this.loggedInUser = false;

    //This will clear the burger input form on submit
    this.clearburgers = function(){
      this.name = " ";
      this.location = " ";
      this.notes = "";
    }

    //This will clear the signup form fields after submit is clicked by assigning
    //empty strings to signupUsername and signupPassword
    this.clearsignup = function(){
      this.signupUsername = "";
      this.signupPassword = "";
    }

    //This will clear the login form fields after submit is clicked by assigning
    //empty strings to loginUsername and loginPassword
    this.clearlogin = function(){
      this.loginUsername = "";
      this.loginPassword = "";
    }

    //This function will run when user clicks on signup  button
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
      this.clearsignup();
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
      this.clearlogin();
    }


this.logout = function() {
  $http({
    url:'/sessions',
    method: 'DELETE'
  }).then(function(){
    controller.loggedInUser = false;
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
      this.clearburgers();
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

  $http({
    method: 'GET',
    url:'/sessions'
  }).then(function(response){
    if(response.data.username) {
      controller.loggedInUser = response.data;
    }
  });

}]);
