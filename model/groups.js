Groups = new Mongo.Collection("groups");

Meteor.methods({
  joinGroup: function(groupName, driverName, peepName) {
    //TODO: Need some sort of notification system to be passed back to UI about
    //      what input/option needs to be selected.
    if ( groupName, driverName == undefined )
    {
      return false;
    }
    else
    {
      Groups.update(
        { to: groupName, 'cars.driver': driverName },
        { $push: { 'cars.$.peeps' : { name: peepName }}});
    }
    
  },
  joinGroupAsUnassigned: function(groupName, peepName) {
    //TODO: Need some sort of notification system to be passed back to UI about
    //      what input/option needs to be selected.
    if ( groupName == undefined )
    {
      return false;
    }
    else   
    {
      Groups.update(
        { to: groupName },
        { $push: { unassigned : { name: peepName }}});
    }  
},
  joinGroupAsDriver: function(groupName, driverName, capacity) {
    //TODO: Need some sort of notification system to be passed back to UI about
    //      what input/option needs to be selected.
    if ( groupName, driverName == undefined )
    {
      return false;
    }
    else
    {
      Groups.update(
        { to: groupName },
        { $push: { 'cars': { driver: driverName, capacity: capacity, peeps: [] }}});
    }
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
