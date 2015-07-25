angular.module('lunchMeat', ['angular-meteor']);

if (Meteor.isClient) {
  Meteor.startup( function () {
    console.log("beep boop");
  });
}
