Meteor.methods({
  'getResults': function (longitude, latitude) {
    if (Results.findOne()) {
      Results.remove({});
    }
    Accounts.loginServiceConfiguration.remove({service: "yelp"});
    Accounts.loginServiceConfiguration.insert({
      service: "yelp",
      consumerKey: YELP.CONSUMERKEY,
      consumerSecret: YELP.CONSUMERSECRET,
      accessToken: YELP.ACCESSTOKEN,
      accessTokenSecret: YELP.ACCESSTOKENSECRET,
      signatureMethod: "HMAC-SHA1"
    });

    var auth = Accounts.loginServiceConfiguration.findOne({service: 'yelp'});

    var config = {
      consumerKey: auth.consumerKey,
      secret: auth.consumerSecret,
    };

    var parameters = {
      location:'San+Francisco',
      term: 'food',
      // ll: latitude + ',' + longitude,
      radius_filter: 10,
      // open_now: 8439,
      sort: 2,
      oauth_token: auth.accessToken
    };
    var oauthBinding = new OAuth1Binding(config, 'http://api.yelp.com/v2/search');
    oauthBinding.accessTokenSecret = auth.accessTokenSecret;
    Results.insert(oauthBinding.call('GET', oauthBinding._urls, parameters));
  }
});
