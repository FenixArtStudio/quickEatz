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
  only: ['restaurants', 'businessPage', 'favorites']
});

Router.onBeforeAction(OnBeforeActions.authenticated, {
  only: ['index', 'login', 'signup']
});

Router.onBeforeAction('dataNotFound', {only: 'businessPage'});

Router.route('/', {
  name: 'index'
});

Router.route('/login', function () {
  this.render();
},{
  name:'login'
});

Router.route('/signup', function () {
  this.render();
},{
  name: 'signup',
});

Router.route('/restaurants', function () {
  this.render('businessesList');
},{
  name: 'restaurants',
});

Router.route('/favorites', function () {
  this.subscribe('favorites').wait();
  this.render();
},{
  name: 'favorites'
});

Router.route('/forgot-password', function () {
  this.render('forgotPassword');
},{ 
  name: 'password.forgot'
});

Router.route('/password-reset/:_id', function () {
  this.render('resetPassword');
},{
  name: 'password.reset'
});

Router.route('/settings', function () {
  this.render();
},{
  name: 'settings'
});


Router.route('/restaurants/:_id', {
  name: 'businessPage',
  waitOn: function () {
    return [
      Meteor.subscribe('business', this.params._id),
      Meteor.subscribe('favorites')
    ]
  },
  data: function () {return Business.findOne({_id: this.params._id});}
});
