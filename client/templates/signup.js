Template.signup.events({
  'submit': function (event, template) {
    event.preventDefault();
    var username = template.$('[name=username]').val();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    
    var user = {
      username: username,
      email: email,
      password: password
    };
    
    Accounts.createUser(user, function (error) {
      if (error) {
        console.log(error)
      }  else {
        Router.go('/restaurants')

      }
    });
  }
})