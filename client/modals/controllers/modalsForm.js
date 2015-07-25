angular.module('lunchMeat').controller('ModalsCtrl', ['$scope', '$meteor', function($scope, $meteor) {
  $scope.groups = $meteor.collection(Groups);
  $scope.cars = []

  $scope.getDrivers = function() {
    $meteor.call('getCars', $scope.to).then(
      function (data) {
        console.log('Success [getDrivers]!', data);
        $scope.cars = data;
      },
      function (error) {
        console.log('Failed [getDrivers]!', error);
      }
    );
  };

  $scope.joinGroup = function() {
    $meteor.call('joinGroup', $scope.to, $scope.driver, $scope.name).then(
      function (data) {
        console.log('Success [joinGroup]!', data);
      },
      function (error) {
        console.log('Failed [joinGroup]!', error);
      }
    );
  };
}]);
