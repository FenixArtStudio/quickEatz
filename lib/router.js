var OnBeforeActions;

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

OnBeforeActions = {
  loginRequired: function () {
    if (!(Meteor.userId() || Meteor.loggingIn())) {
      this.render('login');
    } else {
      this.next();
    }
  },
  authenticated: function () {
    if(Meteor.userId()) {
      Router.go('restaurants');
    } else {
      this.next();
    }
  }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
  only: ['restaurants', 'businessPage', 'favorites', 'settings']
});

Router.onBeforeAction(OnBeforeActions.authenticated, {
  only: ['index', 'login', 'signup', 'forgot-password', 'reset-password']
});

Router.onBeforeAction('dataNotFound', {only: 'businessPage'});

Router.map(function() {
  this.route('index', {path: '/'});
  this.route('login', {path: '/login'});
  this.route('signup', {path: '/signup'});
  this.route('forgot-password', {path: '/forgot-password'});
  this.route('reset-password', {path: '/reset-password'});
  this.route('settings', {path: '/settings'});
  this.route('restaurants', {path: '/restaurants', template: 'businessesList'});
  this.route('favorites', {path: '/favorites'});
});



Router.route('/restaurants/:_id', {
  name: 'businessPage'
});
