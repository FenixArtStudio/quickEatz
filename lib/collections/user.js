Meteor.methods({
  updateUser: function (username) {
    check(username, String);
    var user = Meteor.users.update(this.userId, {$set: {username: username}});
    return {
      userUpdated: true
    };
  },
  uploadUserAvatar: function (avatar) {
    var user = Meteor.users.update(this.userId, {$set: {avatar: avatar}});
    return {
      userUpdated: true
    };
  }
});
