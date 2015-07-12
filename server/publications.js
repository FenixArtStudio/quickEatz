Meteor.startup(function () {
  if(!Accounts.loginServiceConfiguration.findOne({service: 'yelp'})) {
    Accounts.loginServiceConfiguration.insert({
      service: "yelp",
      consumerKey: YELP.CONSUMERKEY,
      consumerSecret: YELP.CONSUMERSECRET,
      accessToken: YELP.ACCESSTOKEN,
      accessTokenSecret: YELP.ACCESSTOKENSECRET,
      signatureMethod: "HMAC-SHA1"
    });
  }
});

Meteor.publish('search', function (latitude, longitude) {
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
  console.log(searchResults);
  _.each(searchResults.data.businesses, function (searchResult) {
    searchResult.distance_in_miles = (searchResult.distance * 0.000621371).toFixed(2);
    self.added('search', searchResult.id, searchResult);
  });

  self.ready();

});

Meteor.publish('business', function (id) {
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