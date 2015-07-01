Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function () {
  this.render('home')
})

Router.route('restaurants', {
  path: '/restaurants',
  onBeforeAction: function () {
    if (!Meteor.user()) {
      Router.go('/');
    } else {
      this.render('businessesList');
    }
  }
});
