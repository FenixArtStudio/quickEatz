 Meteor.publish('results', function () {
  return Results.find();
});