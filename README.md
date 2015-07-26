This is done in terms of Mongo console.
In Meteor's ORM:
  db.groups
  -> Groups

# 
# MODEL
#

# Relationships are captured by way of subdocuments.
#   groups  [one-to-many] cars
#   cars    [one-to-many] peeps
Groups {
  to: %s,
  cars: [{
    driver: %s,
    capacity: %d,
    peeps: [{ name: %s }, ...] 
  }, ...],
  unassigned: [{ name: %s }, ...]
}

#
# CREATION
#

# Initializing a new group
db.groups.insert({ to: 'Mexican', car: [] })

# Example of a complete insert statement.
db.groups.insert({
  to: 'Thai',
  cars: [{
    driver: 'Dan',
    capacity: 4,
    peeps: [{ name: 'Forrest' }, { name: 'Trent' }]
  }, {
    driver: 'Abdul',
    capacity: 3,
    peeps: [{ name: 'Jerry' }]
  }],
  unassigned: [{ name: 'Blare' }]
})

#
# QUERY
#

# Find a single object.
db.groups.findOne({ to: 'Thai' })
=> Object

# ... which is the same as:
db.groups.find({ to: 'Thai' })[0]
=> Object

# Therefore, find simply returns an JavaScript Array of all results.
db.groups.find({})
=> Array

# Find a car whose driver is 'Dan'.
db.groups.findOne({ 'cars.driver': 'Dan' })
=> Object

# Get the driver's name (as a String).
db.groups.findOne({ 'cars.driver': 'Dan' }).cars[0].driver
=> 'Dan'

# Get an Array of peeps.
db.groups.findOne({ 'cars.driver': 'Dan' }).cars[1].peeps
=> Array
[{ 'name': 'Jerry' }]

# Get unassigned peeps.
db.groups.findOne({ to: 'Thai' }).unassigned

#
# UPDATE
#

# Add a new car to an existing group.
db.groups.update({ to: 'Thai' }, { $push: { 'cars' : { driver: 'Bob', capacity: 2, peeps: []}}})

# Add a new peep to an existing car.
db.groups.update({ to: 'Thai', 'cars.driver': 'Dan' }, { $push: { 'cars.$.peeps' : { name: 'Larry' }}})

# Add unassigned peep.
db.groups.update({ to: 'Thai' }, { $push: { unassigned: { name: 'Barry' }}})

# Remove an existing car.
db.groups.update({ to: 'Thai' }, { $pull: { cars: { driver: 'Bob' }}})

# Remove an existing peep from a car.
db.groups.update({ to: 'Thai', 'cars.driver': 'Dan' }, { $pull: { 'cars.$.peeps': { name: 'Trent' }}})

# Remove unassigned peep.
db.groups.update({ to: 'Thai' }, { $pull: { unassigned: { name: 'Barry' }}})

# Update the capacity of a car to an arbitrary value.
db.groups.update({ to: 'Thai', 'cars.driver': 'Abdul' }, { $set: { 'cars.$.capacity' : 5}})

# ... or decrement the capacity by an arbitrary value.
db.groups.update({ to: 'Thai', 'cars.driver': 'Abdul' }, { $inc: { 'cars.$.capacity' : -1}})

# ... or increment the capacity by an arbitrary value.
db.groups.update({ to: 'Thai', 'cars.driver': 'Abdul' }, { $inc: { 'cars.$.capacity' : 1}})