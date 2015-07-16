Template.forgotPassword.events({
  'submit': function (event, template) {
    event.preventDefault();
    var email = $.trim(template.$('[name=reset-password]').val().toLowerCase());
    if (email) {
      Accounts.forgotPassword({email:email}, function (error) {
        if (error) {
          return throwError(error);
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
  Router.go('/reset-password')
}

Template.resetPassword.helpers({
  resetPassword: function () {
    return Session.get('resetPassword');
  }
});

Template.resetPassword.events({
  'submit': function (event, template) {
    event.preventDefault();
    var password = template.$('[name=password]').val();
    var passwordConfirmation = template.$('[name=password-confirmation]').val();
    if (password === passwordConfirmation) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function (error) {
        if (error) {
          return throwError(error);
        } else {
          Session.set('resetPassword', null);
          IonPopup.alert({
            title: 'Success',
            template: 'You successfully reset your password',
            okText: 'Ok.'
          });
        }
      }); 
    }
  }
});