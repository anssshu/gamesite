//create a module
var app =angular.module("App",['ngRoute']);


//define the routes and link  different pages	and controllers
app.config(["$routeProvider",
			function($routeProvider){
				$routeProvider
				.when("/",{
						templateUrl:'apps/ng-success/html/home.html',
						controller:'HomePageController'
					})
					.when("/catagories",{
							templateUrl:'apps/ng-success/html/catagories.html',
							controller:'CatagoriesPageController'
						})
				.when("/search",{
							templateUrl:'apps/ng-success/html/search.html',
							controller:"SearchController"
						})
				.when("/search_error",{
									templateUrl:'apps/ng-success/html/search_error.html',
									//controller:"SearchController"
								})
				.otherwise({
						templateUrl:'apps/ng-success/html/home.html',
						controller:'HomePageController'
					});

			}
		]);



//define all the controllers
//--------------------------------home page------------------------------
//home page
app.controller("HomePageController",function($scope,$routeParams,$http){
		//get the page query from the href of nav tab
		var page = $routeParams.page;
		var data = "default data"
		//get the page data from the server
		$http.get("/success/serve_page?page="+page)
		.then(function(res){
			console.log(res.data)
			 $scope.data =res.data;
		});

		//$scope.data = data;

		});
//-------------------------------------------------------------------
//home page
app.controller("SearchController",function($scope,$http,$window,$routeParams){
	$scope.page = $routeParams.page;
		//get the page query from the href of nav tab
		$scope.search = function(){

			//get the name of all games  from the server
			$http.get("/success/serve_page?page="+"allgames")
			.then(function(res){
				//console.log(res.data)
				 var data =res.data;
				 var game = $scope.search_games.toLowerCase();
				 var test = false
				 for (var i = 0;i<data.length;i++){
					 if (data[i] == game){
					 test = true;
					 $scope.page = game;

				 }

				 }

				 if (test) {
					 $window.location.href='/success#/search?page='+game;
				 }

				 else{
					  $window.location.href='/success#/search_error';
					}

				 console.log(test);
			});

			console.log($scope.search_games);
		}




		//$scope.data = data;

		});

//-------------------------------------------------------------------
app.controller("CatagoriesPageController",function($scope,$routeParams,$http){
	//query server for catagories and update data
	$scope.data = ["type"]
	var cat = $routeParams.cat;
	var data = {
		"games":["ds","sd"],
		"allcats":["a","b"]
	}
	//get the page data from the server
	$http.get("/success/serve_cat?cat="+cat)
	.then(function(res){
		console.log(res.data)
		 $scope.data =res.data;
		 $scope.data.cat = cat;
	});


});
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
