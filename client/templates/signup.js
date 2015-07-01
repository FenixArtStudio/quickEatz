Template.createUser.events({
  'submit #create-user': function (event, template) {
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
      console.log(error);
    });

    $(function () {
      // $('#myModal').modal('toggle');
      $('#create-user')[0].reset();
    });
  }
})