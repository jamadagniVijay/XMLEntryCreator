xmlEntryApp=angular.module('XmlentryCreator', ['xeditable','ngRoute','ngMaterial']);

xmlEntryApp.run(function(editableOptions) {
	editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
xmlEntryApp.directive("allxmldata",function(){
	return {
		restrict: "E",
	    templateUrl: 'partials/fullxml.html'
	  };
});
xmlEntryApp.filter('textOrNumber', function ($filter) {
    return function (input, fractionSize) {
        if (isNaN(input)) {
            return input;
        } else {
            return $filter('number')(input, fractionSize);
        };
    };
});
xmlEntryApp.controller('MyAppController', ['$scope', '$mdSidenav',function($scope, $mdSidenav) {
	$scope.user = {
			name: 'awesome user'
	}; 
	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};
	
	init();
	function init()
	{
		$scope.myAppController = {};
		$scope.myAppController.title="";
		$scope.filedEntries=[];
		$scope.todos=[];
		$scope.todos=[{
			title:"Field Entry",
			pages:"fieldEntry"
		},
		{
			title:"Table Entry",
			pages:"tableEntry"
		}];
	}
}]);	

xmlEntryApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/fieldEntry', {
		templateUrl: 'partials/fieldEntry.html',
		controller: 'FieldEntryController'
	}).
	when('/tableEntry', {
		templateUrl: 'partials/tableEntry.html',
		controller: 'TableEntryController'
	}).
	otherwise({
		redirectTo: '/fieldEntry'
	});
}]);
xmlEntryApp.controller('FieldEntryController', ['$scope', '$mdSidenav',function($scope, $mdSidenav) {
	$scope.myAppController.title="Field Entry";
	$scope.counter = {};
	$scope.counter.i = 1;
	
	$scope.addFieldEntry = function()
	{	
		var filedEntry=new function() {
			this.fieldName="ExFORM_Field"+$scope.counter.i;
			this.sampleValue=  $scope.fieldSample;
		};		
		$scope.filedEntries.push(filedEntry);
		$scope.counter.i = $scope.counter.i+1;
		console.log($scope.counter.i);
	};
	$scope.removeFileldEntry = function(fieldName)
	{
		$.each($scope.filedEntries, function(index, result) {
		      if(result['fieldName'] == fieldName) {
		          //Remove from array
		    	  $scope.filedEntries.splice(index, 1);
		      }    
		   });
		if($scope.counter.i == 0)
			{
				$scope.counter.i = 1;
			}
		$scope.counter.i = $scope.filedEntries.length+1;
	};
		
}]);

xmlEntryApp.directive('slideToggle', function() {  
	  return {
	    restrict: 'A',      
	    scope:{
	      isOpen: "=slideToggle" // 'data-slide-toggle' in our html
	    },  
	    link: function(scope, element, attr) {
	      var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;      
	      
	      // Watch for when the value bound to isOpen changes
	      // When it changes trigger a slideToggle
	      scope.$watch('isOpen', function(newIsOpenVal, oldIsOpenVal){
	        if(newIsOpenVal !== oldIsOpenVal){ 
	          element.stop().slideToggle(slideDuration);
	        }
	      });
	      
	    }
	  };  
	});

xmlEntryApp.controller('TableEntryController', ['$scope', '$mdSidenav',function($scope, $mdSidenav) {
	$scope.myAppController.title="Table Entry";
	$scope.boolActiveTab = "true";
}]);
