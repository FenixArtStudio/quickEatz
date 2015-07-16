Template.signup.events({
  'submit': function (event, template) {
    event.preventDefault();

    var user = {
      username: template.$('[name=username]').val(),
      email: template.$('[name=email]').val(),
      password: template.$('[name=password]').val()
    };
    
    Accounts.createUser(user, function (error) {
      if (error) {
        return throwError(error);
      }  else {
        Router.go('restaurants')
      }
    });

  }
});