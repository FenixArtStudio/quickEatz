Template.login.events({
  'submit': function (event, template) {
    event.preventDefault();
    
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();

    Meteor.loginWithPassword(email, password, function (error) {
      if (error) {
        return throwError(error);
      } else {
        Router.go('/restaurants');
      }
    });
    
  }
});