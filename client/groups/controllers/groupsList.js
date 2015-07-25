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
    if (confirm("Are you sure?"))
    {
      $scope.groups.remove(group);
      console.log("REMOVED GROUP");
      console.log(group);
    }
  }
}]);
