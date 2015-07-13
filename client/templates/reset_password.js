Template.forgotPassword.events({
  'submit': function (event, template) {
    event.preventDefault();
    var email = $.trim(template.$('[name=reset-password]').val().toLowerCase());
    if (email) {
      Accounts.forgotPassword({email:email}, function (error) {
        if (error) {
          IonPopup.alert({
            title: 'There was an error reseting your password:',
            template: error.reason,
            okText: 'Ok.'
          });
        } else {
          IonPopup.alert({
            title: 'Success',
            template: 'An email has just been sent to ' + email,
            okText: 'Ok.'
          });
        }
      }); 
    }
  }
});

if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken)
}

Template.resetPassword.helpers({
  resetPassword: function () {
    return Session.get('resetPassword');
  }
});