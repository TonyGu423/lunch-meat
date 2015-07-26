Groups = new Mongo.Collection("groups");

Meteor.methods({
  joinGroup: function(groupName, driverName, peepName) {
    Groups.update(
      { to: groupName, 'cars.driver': driverName },
      { $push: { 'cars.$.peeps' : { name: peepName }}});
  },
  joinGroupAsUnassigned: function(groupName, peepName) {
    Groups.update(
      { to: groupName },
      { $push: { unassigned : { name: peepName }}});
  },
  joinGroupAsDriver: function(groupName, driverName, capacity) {
    Groups.update(
      { to: groupName },
      { $push: { 'cars': { driver: driverName, capacity: capacity, peeps: [] }}})
  },
  getCars: function(groupName) {
    return Groups.findOne({ to: groupName }).cars;
  },
  removeCar: function(groupName, driverName) {
    Groups.update(
      { to: groupName },
      { $pull: { cars: { driver: driverName }}})
  }
});
