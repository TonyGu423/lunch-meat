Groups = new Mongo.Collection("groups");

Meteor.methods({
  joinGroup: function(groupName, driverName, peepName) {
    Groups.update(
      { to: groupName, 'cars.driver': driverName },
      { $push: { 'cars.$.peeps' : { name: peepName }}})
  },
  getCars: function(groupName) {
    console.log(groupName);
    return Groups.findOne({ to: groupName }).cars
  }
});
