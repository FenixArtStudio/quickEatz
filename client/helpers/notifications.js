Errors = new Mongo.Collection(null);
Success = new Mongo.Collection(null);

throwError = function (message) {
  Errors.insert({message:message});
};

throwSuccess = function (message) {
  Success.insert({message:message});
};

Template.notifications.helpers({
  notifications: function() {
    return Success.find();
  }
});

Template.notifications.events({
  'click [data-action=dismiss-alert]': function () {
    $('.alert').hide();
  }
});

Template.notification.onRendered(function() {
  var self = this.data;
  Meteor.setTimeout(function () {
    Success.remove(self._id);
  }, 3000);
});

// Template.notifications.onRendered = function () {
//   this.autorun(function () {
//     var error = Errors.findOne();
//     if (error) {
//       Errors.remove(error._id);
//       return IonPopup.alert({
//         title: 'There was an error:',
//         template: error.message.reason,
//         okText: 'Ok.'
//       });
//     }
//   });
// };
