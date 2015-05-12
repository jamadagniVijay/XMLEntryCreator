xmlEntryApp=angular.module('XmlentryCreator', []);

xmlEntryApp.controller('MyAppController', function($scope) {
	$scope.exfromfieldtags = 
		[{
			name:"ExFormFiled1",
			value:"sample1"
		},
		{
			name:"ExFormFiled2",
			value:"sample1"
		},
		{
			name:"ExFormFiled3",
			value:"sample1"
		}];
	$scope.preDefTags = 
		[{
			name:"ExForm_Field1"
		},{
			name:"ExForm_Field2"
		},{
			name:"ExForm_Field3"
		},{
			name:"ExForm_Field4"
		},{
			name:"ExForm_Field5"
		},{
			name:"ExForm_Field6"
		},{
			name:"ExForm_Field7"
		}];
	$scope.addTag = function (){
		var newTag = new function() {
            this.name = $scope.selectedOpt.trim();
            this.value = $scope.sampleValue.trim();
        };
        console.log($scope.selectedOpt.trim()+" "+$scope.sampleValue.trim());
	    $scope.exfromfieldtags.push(newTag);
	  };
}).
directive('onelineentry', function() {
	return {
		restrict: 'A',
		templateUrl: './add.html'
			
	};
}).directive('allxmlentry', function() {
	return {
		template:'<h3><span class="label label-success">XML ENTRY</span></h3>'+
		'<code>'+
			'<div ng-repeat="exfromfieldtag in exfromfieldtags">'+
			'&lt;{{exfromfieldtag.name}}&gt;{{exfromfieldtag.value}}&lt;/{{exfromfieldtag.name}}&gt;'+
			'</div>'+
		'</code>'
	};
});