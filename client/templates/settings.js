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
      Router.go('index');
      return throwSuccess('You\'ve logged out!');
    });
  },
  'submit': function (event, template) {
    event.preventDefault();
    var username = template.$('[name=username]').val();
    Meteor.call('updateUser', username, function (error, result) {
      if (error) {
        return throwError(error);
      }
      if (result.userUpdated) {
        return throwSuccess('Username Updated');
      }
    });
  },
  'change input:file': function (event, template) {
    event.preventDefault();
    var avatar = template.$('[name=avatar]')[0].files[0];

    var reader = new FileReader();
    reader.onload = function(e) {
      Meteor.call('uploadUserAvatar', e.target.result, function (error, result) {
        if (error) {
          return throwError(error);
        }
        if (result.userUpdated) {
          return throwSuccess('Username Updated');
        }
      });
    };
    reader.readAsDataURL(avatar);

  }
});
