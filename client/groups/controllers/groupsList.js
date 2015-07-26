angular.module('lunchMeat').controller('GroupsCtrl', ['$scope', '$meteor', function($scope, $meteor) {
  $scope.groups = $meteor.collection(Groups);

  $scope.createGroup = function(group) {
    var location = group.to;
    var cars = group.cars

    var newGroup = {'to':location, 
                    'cars': [
                            {'driver':cars.driver,
                             'capacity':cars.capacity
                            }
                     ]
                   }
    $scope.groups.save(newGroup);
    console.log("GROUP SAVED");
    console.log(newGroup);
  }

  $scope.removeGroup = function(group) {
    if (confirm("Remove group going to " + group.to + "?"))
    {
      $scope.groups.remove(group);
      console.log("REMOVED GROUP");
      console.log(group);
    }
  }

  $scope.removeCar = function(groupName, driverName) {
    $meteor.call('removeCar', groupName, driverName).then(
      function (data) {
        console.log('Success! [removeCar]', data);
      },
      function (error) {
        console.log('Failed! [removeCar]', error);
      }
    );
  }
}]);
