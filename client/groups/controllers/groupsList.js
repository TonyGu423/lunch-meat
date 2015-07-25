angular.module('lunchMeat').controller('GroupsCtrl', ['$scope', '$meteor', function($scope, $meteor) {
  $scope.groups = $meteor.collection(Groups);

  $scope.createGroup = function(group) {
    $scope.groups.save(group);

    console.log("GROUP SAVED");
    console.log(group);
  }

  $scope.removeGroup = function(group) {
    if (confirm("Are you sure?"))
    {
      $scope.groups.remove(group);
      console.log("REMOVED GROUP");
      console.log(group);
    }
  }
}]);
