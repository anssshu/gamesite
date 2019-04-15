//create a module
var app =angular.module("App",['ngRoute']);


//define the routes and link  different pages	and controllers
app.config(["$routeProvider",
			function($routeProvider,$routeParams){
				$routeProvider
				.when("/settings",{
						templateUrl:'apps/ng-userprofile/html/settings.html',
						controller:'SettingsPageController'
					})

				.when("/lastplayed",{
						templateUrl:'apps/ng-userprofile/html/home.html',
						controller:'PlayedgamesPageController'
					})

				.otherwise({
							templateUrl:'apps/ng-userprofile/html/home.html',
							controller:'FavoutitesPageController'
						});

			}
		]);



//define all the controllers
//--------------------------------home page------------------------------
//home page
//define the login controller it defines the behaviour of the login page
app.controller("SettingsPageController",function($route,$scope,$http,$window,$routeParams){
	$scope.fn = true;
	$scope.ln = true;
	$scope.em = true;
	$scope.mob = true;
	$scope.pas = true;
			$scope.onFirstname = function(e){
					if ($scope.fn) $scope.fn = false;
					else $scope.fn = true;
			}

			$scope.onLastname = function(e){
					if ($scope.ln) $scope.ln = false;
					else $scope.ln = true;
			}
			$scope.onMob = function(e){
					if ($scope.mob) $scope.mob = false;
					else $scope.mob = true;
			}
			$scope.onEmail = function(e){
					if ($scope.em) $scope.em = false;
					else $scope.em = true;
			}
			$scope.onPas = function(e){
					if ($scope.pas) $scope.pas = false;
					else $scope.pas = true;
			}
			$scope.update = function(e){
					console.log("update",$scope.firstname)
					$http.post("/userprofile/settings",angular.toJson({
						firstname:$scope.firstname,
						lastname:$scope.lastname,
						email:$scope.email,
						mobileno:$scope.mobileno,
						password:$scope.password
					})
				)
				.then(function(res){
					console.log(res.data);
					if(res.data == "success") {
						$route.reload();
						//$window.location.href="/userprofile";
						//$window.location.href="/userprofile#/settings";
				}
				})

			}


	//define a data holder for server response
			$scope.data = $routeParams.page || "no page data";
			//get user data from the server
			$http.get("/userprofile/user_data")
			.then(function(res){
					$scope.data = res.data;
					//$scope.data.reverse();
			});
			//$scope.data = "data for test"
		});
app.controller("PlayedgamesPageController",function($scope,$routeParams,$http){
				$http.get("/userprofile/lastplayed")
				.then(function(res){
					console.log(res.data);
					$scope.data = res.data;
				});



				//$scope.data = ["nino","snake","bee","type"]//get the played games list from server and update here

		});
//------------------------------forgot password page -----------------------

//------------------------------------login page------------------------

//define the login controller it defines the behaviour of the login page
app.controller("FavoutitesPageController",function($scope,$http,$window){
	//define a data holder for server response
			//$scope.data = ["nino","type"]//get the favotite games list from server and update here
			$http.get("/userprofile/getfav")
			.then(function(res){
				$scope.data = res.data;
			});
		});












//define the login controller it defines the behaviour of the login page
app.controller("SavedgamesPageController",function($scope,$http,$window){
//define a data holder for server response

	});
//-----------------------------------------signup page--------------------------------------------

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
