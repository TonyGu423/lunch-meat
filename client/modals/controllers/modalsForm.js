angular.module('lunchMeat').controller('ModalsCtrl', ['$scope', '$meteor', function($scope, $meteor) {
  $scope.groups = $meteor.collection(Groups);

  // Used to populate options in 'Join a Group' modal.
  $scope.cars = []

  $scope.createGroup = function(group) {
    var newGroup = {
      'to': group.to,
      'cars': [group.cars]}

    $scope.groups.save(newGroup);
  }

  $scope.getCars = function() {
    $meteor.call('getCars', $scope.to).then(
      function (data) {
        console.log('Success! [getCars]', data);
        $scope.cars = data;
      },
      function (error) {
        console.log('Failed! [getCars]', error);
      }
    );
  };

  $scope.joinGroup = function() {
    if ($scope.driver === 'Unassigned' && !$scope.can_drive) {  // Unassigned.
      $meteor.call('joinGroupAsUnassigned', $scope.to, $scope.name).then(
        function (data) {
          console.log('Success! [joinGroupAsUnassigned]', data);
        },
        function (error) {
          console.log('Failed! [joinGroupAsUnassigned]', error);
        }
      );
    } else if ($scope.driver === undefined && $scope.can_drive) {      // New driver joining.
      $meteor.call('joinGroupAsDriver', $scope.to, $scope.name, $scope.capacity).then(
        function (data) {
          console.log('Success! [joinGroupAsDriver]', data);
        },
        function (error) {
          console.log('Failed! [joinGroupAsDriver]', error);
        }
      );
    } else {                                                    // Join existing car.
      $meteor.call('joinGroup', $scope.to, $scope.driver, $scope.name).then(
        function (data) {
          console.log('Success! [joinGroup]', data);
        },
        function (error) {
          console.log('Failed! [joinGroup]', error);
        }
      );
    }
  };
}]);
