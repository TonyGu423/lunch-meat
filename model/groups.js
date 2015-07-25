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
  getCars: function(groupName) {
    return Groups.findOne({ to: groupName }).cars;
  }
});
