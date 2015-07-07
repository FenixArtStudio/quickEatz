var OnBeforeActions;

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

OnBeforeActions = {
  loginRequired: function () {
    if (!Meteor.userId()) {
      this.render('login')
    } else {
      this.next();
    }
  }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  only: ['restaurants', 'businessPage']
})
Router.route('index', {
  path: '/'
});

Router.route('login', function () {
  path:'/login'
  this.render('login')
});

Router.route('signup', function () {
  path: 'signup',
  this.render('signup')
});

Router.route('restaurants', function () {
  path: '/restaurants',
  this.render('businessesList');
});

Router.route('businessPage', {
  path: '/restaurants/:_id',
  data: function () {
    return Results.findOne(this.params._id);
  }
});
