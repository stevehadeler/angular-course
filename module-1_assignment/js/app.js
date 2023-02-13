(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchStatus = "";
  $scope.lunchList = "";
  $scope.lunchItemCount=0;
  $scope.emptyLunchItemFlag=0;
  $scope.lunchMessage="";
  $scope.lunchMessage2="";
  $scope.lunchMessageStyle="form-group message"

  $scope.checkLunchList = function() {
    //take list from text input, trim white space, and get rid of any empty items and create array
    var lunchArray = $scope.cleanLunchArray($scope.trimLunchArray($scope.lunchList.split(',')));
    //set lunch item count by getting array length
    $scope.lunchItemCount = lunchArray.length;

    //debugging output here, ingore
    //console.log(lunchArray.toString());
    //console.log("Valid Lunch Items: " + $scope.lunchItemCount)
    //console.log("Empty items:" + $scope.emptyLunchItemFlag.toString());

    //repopulate text box with cleaned and filtered lunch list
    $scope.lunchList = lunchArray.join(", ");

    //generate messages based on count of lunch items
    $scope.reviewLunchItems();

  };

  //trim white space characters from input list items
  $scope.trimLunchArray = function(lunchArray) {
    var trimmedArray = lunchArray.map(item => {
        return item.trim();
    });
    return trimmedArray;
  };

  //filter out any items that have a zero length after white space characters are removed
  $scope.cleanLunchArray = function(lunchArray) {
    var itemCount = lunchArray.length;
    //filter out any items that have a zero length
    var cleanedLunchArray = lunchArray.filter(function(value, index, arr){
      return (value.trim()).length > 1;
    });
    //set lunch item count flag to display message regarding empty items
    $scope.emptyLunchItemFlag=(itemCount==cleanedLunchArray.length) ? 0 : 1;
    return cleanedLunchArray;
  };

  //generate messages based on count of lunch items
  $scope.reviewLunchItems = function() {
    if($scope.lunchItemCount > 3) {
      $scope.lunchMessage="Too much!"
      if($scope.emptyLunchItemFlag == 1) {
        $scope.lunchMessage2="(You have more than three items, in addition to the empty item(s) you added. Remember empty items don't count.)"
      }
      else {
        $scope.lunchMessage2="(You have more than three items)"
      }
    }
    else if($scope.lunchItemCount <= 3 && $scope.lunchItemCount > 0) {
      $scope.lunchMessage="Enjoy!"
      if($scope.emptyLunchItemFlag == 1) {
        $scope.lunchMessage2="(Btw, at least one of the items you entered were empty. Remember, empty items don't count.)";
      }
      else {
        $scope.lunchMessage2="";
      }
    }
    else {
      $scope.lunchMessage="Please enter data first";
      $scope.lunchMessage2="";
    }
  };

}
})();
