Template.settings.onCreated(function () {
  var self = this;
  Meteor.setTimeout(function () {
    self.subscribe('userData');
  }, 250);
});

Template.settings.events({
  'click [data-action=logout]': function (event) {
    event.preventDefault();
    Meteor.logout(function () {
      Router.go('index')
      return throwSuccess('You\'ve logged out!');
    });
  },
  'blur input[type=text]': function (event, template) {
    event.preventDefault();
    event.target.blur();
    var username = template.$('[name=username]').val();
    if (username != '') {
      Meteor.call('updateUser', username, function (error, result) {
        if (error) {
          return throwError(error);
        } 
        if (result.userUpdated) {
          return throwSuccess('Username Updated');
        }
      });
    } else {
      // $('input').val((Meteor.user().username));
      return throwError('Username Updated');
    }
  }
});

