angular.module('lunchMeat').controller('ModalsCtrl', ['$scope', '$meteor', function($scope, $meteor) {
  $scope.groups = $meteor.collection(Groups);

  // Used to populate options in 'Join a Group' modal.
  $scope.cars = []

  $scope.createGroup = function(group) {
    //TODO: Need some sort of notification system to be passed back to UI about
    //      what input/option needs to be selected.
    if ( group == undefined )
    {
      return false;
    }
    else if ( group.to == undefined || group.cars == undefined )
    {
      return false;
    }

    var newGroup = {
      'to': group.to,
      'cars': [group.cars]}

    $scope.groups.save(newGroup);
    resetCloseModal();
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
          if (data != false)
          {
            console.log('Success! [joinGroupAsUnassigned]', data);
            resetCloseModal();
          }
        }, 
        function(error) {
            console.log('Failed! [joinGroupAsUnassigned] error', error);
        }
      );
    } else if ($scope.driver === undefined && $scope.can_drive) {      // New driver joining.
      $meteor.call('joinGroupAsDriver', $scope.to, $scope.name, $scope.capacity).then(
        function (data) {
          if (data != false)
          {
            console.log('Success! [joinGroupAsDriver]', data);
            resetCloseModal();
          }
        }, 
        function(error) {
            console.log('Failed! [joinGroupAsUnassigned] error', error);
        }
      );
    } else {                                                    // Join existing car.
      $meteor.call('joinGroup', $scope.to, $scope.driver, $scope.name).then(
        function (data) {
          if (data != false)
          {
            console.log('Success! [joinGroup]', data);
            resetCloseModal();
          }
        }, 
        function(error) {
            console.log('Failed! [joinGroupAsUnassigned] error', error);
        }
      );
    }


  };

  resetCloseModal = function() {
    //TODO: make the data reset.
    //      Currently, add resets because of extra ='' in click but join needs reset.

    //hide popup
    $("#join-group").modal('hide');
    $("#add-group").modal('hide');
  };

  $scope.submitSelf = function() {
    console.log('join button clicked.');
  };
}]);
