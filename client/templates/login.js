Template.login.events({
  'submit #login': function (event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();

    Meteor.loginWithPassword(email, password, function (error) {
      if (Meteor.user()) {
        $(function () {
          $('#myModal').modal('toggle')
            .on('hidden.bs.modal', function (e) {
              $('#login')[0].reset();    
            });
        });
        Router.go('/restaurants')
      } else {
        var message = 'There was an error loggin in:' + error.reason;
        // template.find('#form-messages').html(message);
      }
      return;
    })
    
  }
})