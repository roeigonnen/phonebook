var AngolarScopeWrap;
var app = angular.module('phonebookApp', []);


jQuery(document).ready(function () {
    AngolarScopeWrap = angular.element(document.getElementById("wrapLayout")).scope();
});

class ContcatMode{
		name= "";
		phone = "";
}

app.controller('PhonebookController', function($scope) 
{
    $scope.contactsArray = [];
	$scope.newContact = new ContcatMode();

	$scope.AddNewContact = function()
	{
		$scope.contactsArray.push($scope.newContact);
		$scope.newContact = new ContcatMode();
		// $scope.$apply();
	}
});