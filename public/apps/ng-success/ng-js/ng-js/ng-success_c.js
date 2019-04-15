//create a module
var app =angular.module("App",['ngRoute']);


//define the routes and link  different pages	and controllers
app.config(["$routeProvider",
			function($routeProvider){
				$routeProvider
				.when("/profile",{
						templateUrl:'apps/ng-success/html/profile.html',
						controller:'LoginController'
					})
				.when("/signup",{
						templateUrl:'apps/ng-success/html/signup.html',
						controller:'SignupController'
					})
                .when("/forgotPassword",{
						templateUrl:'apps/ng-success/html/forgotPassword.html',
						controller:'ForgotPasswordController'
					})

				.otherwise({
						templateUrl:'apps/ng-success/html/success.html',
						controller:'HomePageController'
					});

			}
		]);



//define all the controllers
//--------------------------------home page------------------------------
//home page
app.controller("HomePageController",function(){
		this.foo="Angular is awesome";

		});
//------------------------------forgot password page -----------------------
//forgot Password page
app.controller("ForgotPasswordController",function($scope,$http){
		this.foo="Angular is awesome";
		$scope.sendPassword = function(){
			$http.post("/forgotPassword",angular.toJson({username:$scope.username}))
			.then(function(res){
				$scope.server_response = res.data;
			})
		}

		});
//------------------------------------login page------------------------
//define the login controller it defines the behaviour of the login page
app.controller("LoginController",function($scope,$http,$window){
	//define a data holder for server response
    $scope.server_response='';
    //define the function for the login post 	for async data exchange
    $scope.logIn=function(){
    //when login button is clicked
        //post the data to the server and get the data async.ly and upload on the page
        $http.post('/login',angular.toJson({username:$scope.username,
                                       password:$scope.password,
                                       remember:$scope.remember}))
        .then(function(res){
            //if server respond with success message then redirect to profile page
            if (res.data=="success")$window.location.href='/home';
            //else show the server response
            else $scope.server_response=res.data;

        }
             );
    };

		});
//-----------------------------------------signup page--------------------------------------------
//code for the signup controller
app.controller("SignupController",function($scope,$http,$window,$location){

		$scope.signup=function(){

                $http.post("/signup",angular.toJson({
                                                     username:$scope.username,
                                                     password:$scope.password,
                                                     firstname:$scope.firstname,
                                                     lastname:$scope.lastname,
                                                     email:$scope.email,
                                                     mobileno:$scope.mobileno
                                                    }))
                .then(function(res){

                    if (res.data == "success") $location.path("/login");
                    else $scope.server_response=res.data;
                });
            }
        //helper to async.ly check availability of username
        $scope.signupHelper=function(){

                $http.get("/signupHelper?username=" +$scope.username)
                .then(function(res){
                    $scope.server_response=res.data;
                });
            }

		});
//----------------------------------------------------------------------------------------------------

//////////////////////////////////////////code for the dl-enter-key directive/////////////////////////////
//add the dl-enter-key directive
app.directive('dlEnterKey', function() {
    return function(scope, element, attrs) {

        element.bind("keydown keypress", function(event) {
            var keyCode = event.which || event.keyCode;

            // If enter key is pressed
            if (keyCode === 13) {
                scope.$apply(function() {
                        // Evaluate the expression
                    scope.$eval(attrs.dlEnterKey);
                });

                event.preventDefault();
            }
        });
    };
});
////////////////////////////////////////////////////////////////////////////////////////////////////////
