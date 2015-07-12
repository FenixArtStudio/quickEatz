var OnBeforeActions;

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
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
  only: ['restaurants', 'businessPage']
});

Router.onBeforeAction(OnBeforeActions.authenticated, {
  only: ['index', 'login', 'signup']
});

Router.onBeforeAction('dataNotFound', {only: 'businessPage'});

Router.route('index', {
  path: '/'
});

Router.route('login', function () {
  path:'/login'
  this.render('login')
});

Router.route('signup', function () {
  path: '/signup',
  this.render('signup')
});

Router.route('restaurants', function () {
  path: '/restaurants',
  this.render('businessesList');
});

Router.route('businessPage', {
  path: '/restaurants/:_id',
  waitOn: function () {
    return Meteor.subscribe('business', this.params._id);
  },
  data: function () {return Business.findOne(this.params._id);} 
});
