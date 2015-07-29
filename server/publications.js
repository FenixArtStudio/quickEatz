Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(Meteor.settings.private.smtp.username) + ':' + encodeURIComponent(Meteor.settings.private.smtp.password) + '@' + encodeURIComponent(Meteor.settings.private.smtp.server) + ':' + Meteor.settings.private.port;
  if(!Accounts.loginServiceConfiguration.findOne({service: 'yelp'})) {
    Accounts.loginServiceConfiguration.insert({
      service: "yelp",
      consumerKey: Meteor.settings.private.yelp.consumerkey,
      consumerSecret: Meteor.settings.private.yelp.consumersecret,
      accessToken: Meteor.settings.private.yelp.accesstoken,
      accessTokenSecret: Meteor.settings.private.yelp.accesstokensecret,
      signatureMethod: "HMAC-SHA1"
    });
  }
});

Meteor.publish('search', function (latitude, longitude) {
  check(latitude, Number);
  check(longitude, Number);

  var self = this;

  var auth = Accounts.loginServiceConfiguration.findOne({service: 'yelp'});

  var config = {
    consumerKey: auth.consumerKey,
    secret: auth.consumerSecret,
  };

  var parameters = {
    term: 'food',
    ll: latitude + ',' + longitude,
    sort: 2,
    oauth_token: auth.accessToken
  };

  var oauthBinding = new OAuth1Binding(config, 'http://api.yelp.com/v2/search');
  oauthBinding.accessTokenSecret = auth.accessTokenSecret;

  var searchResults = oauthBinding.call('GET', oauthBinding._urls, parameters);
  _.each(searchResults.data.businesses, function (searchResult) {
    searchResult.distance_in_miles = (searchResult.distance * 0.000621371).toFixed(2);
    self.added('search', searchResult.id, searchResult);
  });

  self.ready();

});

Meteor.publish('favorites', function () {
  return Favorite.find({userId: this.userId});
});

Meteor.publish('business', function (id) {
  check(id, String);
  var self = this;

  var auth = Accounts.loginServiceConfiguration.findOne({service: 'yelp'});

  var config = {
    consumerKey: auth.consumerKey,
    secret: auth.consumerSecret,
  };

  var parameters = {
    oauth_token: auth.accessToken
  };

  var oauthBinding = new OAuth1Binding(config, 'http://api.yelp.com/v2/business/' + id);
  oauthBinding.accessTokenSecret = auth.accessTokenSecret;

  var businessResult = oauthBinding.call('GET', oauthBinding._urls, parameters);

  businessResult.data.original_image_url = businessResult.data.image_url.replace('ms.jpg', 'o.jpg');

  self.added('business', businessResult.data.id, businessResult.data);
  self.ready();
});

Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId});
  } else {
    this.ready();
  }
});
