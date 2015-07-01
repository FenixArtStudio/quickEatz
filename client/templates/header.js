Template.header.events({
  'click a': function () {
    $('#navigation').collapse('hide')
  },
  'click a.logout': function () {
    Meteor.logout(function () {
      Router.go('/')
    });
  }
})