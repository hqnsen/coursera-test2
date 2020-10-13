(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckCntl', LunchCheckCntl);

LunchCheckCntl.$inject = ['$scope','$filter'];
function LunchCheckCntl($scope, $filter) {
  $scope.doIt = function() {
    resetColors();
    var inputStr = $scope.theList;
    // First, check that input is defined
    if (typeof inputStr == "undefined" || inputStr == "") {
      $scope.msgPlaceholder = "Please enter data first";
      $scope.msgClasses = "alert-danger";
      $scope.inputClasses = "alert-danger";
      return;
    }
    // Shows a message based on the number of items input
    var numItems = countValidItems(inputStr);
    if (numItems <= 3) {
      $scope.msgPlaceholder = "Enjoy!";
    } else {
      $scope.msgPlaceholder = "Too much!";
    }
    $scope.msgClasses = "alert-success";
    $scope.inputClasses = "alert-success";
    console.log(numItems);
  };
  var countValidItems = function(theInput) {
    const s1 = theInput.split(",");
    // Don't count empty items, i.e. "hello,world,," yields 2
    const s2 = s1.filter(item => item.trim() != "");
    console.log(s1);
    console.log(s2);
    return s2.length;
  };
  var resetColors = function() {
    $scope.msgClasses = "";
    $scope.inputClasses = "";
  };
  $scope.focusInput = function() {
    $scope.inputClasses = "";
  };
}
})();
