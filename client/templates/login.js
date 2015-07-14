Template.login.events({
  'submit': function (event, template) {
    event.preventDefault();
    
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();

    Meteor.loginWithPassword(email, password, function (error) {
      if (error) {
        IonPopup.alert({
          title: 'There was an error loging in:',
          template: error.reason,
          okText: 'Ok.'
        });
      } else {
        Router.go('/restaurants');
      }
    });
    
  }
});