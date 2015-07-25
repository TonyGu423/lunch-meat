Groups = new Mongo.Collection("groups");

Meteor.methods({
  joinGroup: function(groupName, driverName, peepName) {
    db.groups.update(
      { to: groupName, 'cars.driver': driverName },
      { $push: { 'cars.$.peeps' : { name: peepName }}})
  }
});
