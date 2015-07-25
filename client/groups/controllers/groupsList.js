angular.module('lunchMeat').controller('GroupsCtrl', ['$scope', '$meteor', function($scope, $meteor) {
  $scope.groups = $meteor.collection(Groups);

  $scope.createGroup = function(group) {
    $scope.links.save(group);
  }

  $scope.removeLink = function(group) {
    if (confirm("Are you sure?"))
      $scope.links.remove(group);
  }
}]);
