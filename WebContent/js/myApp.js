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
xmlEntryApp.filter('range', function() {
	return function(input, total) {
		total = parseInt(total);
		for (var i=0; i<total; i++)
			input.push(i);
		return input;
	};
});
xmlEntryApp.controller('MyAppController', ['$scope', '$mdSidenav','$log',function($scope, $mdSidenav, $log) {
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

xmlEntryApp.config(['$routeProvider','$logProvider',function($routeProvider,$logProvider){
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
	$logProvider.debugEnabled(true);
}]);
xmlEntryApp.controller('FieldEntryController', ['$scope', '$mdSidenav','$mdToast',function($scope, $mdSidenav, $mdToast) {
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
		$mdToast.hide();
		$mdToast.show({
          position: "top left",
          hideDelay : 4000,
          template: "<md-toast>Added field"+fieldName+"</md-toast>"
          
        });
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

xmlEntryApp.controller('TableEntryController', ['$scope','$rootScope', '$mdSidenav','$log','$mdToast',function($scope, $rootScope,$mdSidenav, $log,$mdToast) {
	$scope.myAppController.title="Table Entry";
	$scope.boolActiveTab = "true";
	$scope.isButtonHidden = 'none'

	$rootScope.log = function(variable) {
		console.log(variable);
	};
	$rootScope.alert = function(text) {
		alert(text);
	};

	$scope.assignIndex = function(index, rowRCol) {
		$scope.isDisabled = 'none';
		$scope.isButtonHidden = 'block';
		switch(rowRCol) {
		case 'row':
		{ 
			$scope.rowIndex = index;
			break;
		}
		case 'col':
		{ 
			$scope.colIndex = index;
			break;
		}
		default:
		{
			$scope.rowIndex = -1;
			$scope.colIndex = -1;
			break;
		}
		
		}
	};
	$scope.boolSelected = function(rowIndex,colIndex)
	{
		if(rowIndex<$scope.rowIndex && colIndex< $scope.colIndex)
			{
				return true;
			}
		else
			return false;
	};
	$scope.$watchGroup(['rowIndex', 'colIndex'], function(newValues, oldValues) {
		
		if($scope.rowIndex >-1)
		{
			$mdToast.hide();
			$mdToast.show({
	          position: "top left",
	          hideDelay : 4000,
	          template: "<md-toast>Selected "+ $scope.rowIndex+" rows and "+$scope.colIndex+" columns for <strong>&nbsp;"+$scope.tableTinsert+'</strong></md-toast>'
	          
	        });
		}
	});
	
	$scope.clearAll = function()
	{
		$scope.rowIndex =-1;
		$scope.colIndex =-1;
		
		$scope.isDisabled = 'block';
		$scope.isButtonHidden = 'none';
		
		$mdToast.hide();
		$mdToast.show({
	          position: "top left",
	          hideDelay : 4000,
	          template: "<md-toast>add rows and columns again</md-toast>"
	        });
	}
	$scope.tableArray = ['Table1 ','Table2', 'Table3', 'Table4', 'Table5', 'Table6', 'Table7'];
}]);
xmlEntryApp.filter('startFrom', function() {
	return function(input, start) {
		if(input) {
			start = +start; //parse to int
			return input.slice(start);
		}
		return [];
	}
});
xmlEntryApp.directive('ngEnterKey', function() {
	return function(scope, element, attrs) {

		element.bind("keydown keypress", function(event) {
			var keyCode = event.which || event.keyCode;

			// If enter key is pressed
			if (keyCode === 13) {
				scope.$apply(function() {
					// Evaluate the expression
					scope.$eval(attrs.ngEnterKey);
				});

				event.preventDefault();
			}
		});
	};
});