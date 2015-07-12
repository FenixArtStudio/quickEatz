Template.login.events({
  'submit': function (event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();

    Meteor.loginWithPassword(email, password, function (error) {
      if (Meteor.user()) {
        Router.go('/restaurants')
      } else {
        var message = 'There was an error loggin in:' + error.reason;
      }
      return;
    })
    
  }
})