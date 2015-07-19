Meteor.methods({
  updateUser: function (username) {
    check(username, String);
    var userId = Meteor.userId();
    var user = Meteor.users.update(Meteor.userId(), {$set: {username: username}});
    return {
      userUpdated: true
    };
  }
});

