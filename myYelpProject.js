if (Meteor.isClient) {
  Meteor.subscribe('results');

  Template.businesses.helpers({
    counter: function () {
      
      return Results.findOne();
    }
  });

  Template.businesses.events({
    'click button': function () {
      var x = document.getElementById("demo");
      getLocation();
      function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
      function showPosition(position) {
        // x.innerHTML = "Latitude: " + position.coords.latitude + 
        // "<br>Longitude: " + position.coords.longitude;
        var long, lat; 
        lat = position.coords.latitude;
        long = position.coords.longitude; 
        Meteor.call('getResults', long, lat );
      }
      
      
      // Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
    
  Meteor.methods({
    'getResults': function (longitude, latitude) {
      console.log(longitude, latitude);
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
        // location:'San+Francisco',
        term: 'food',
        ll: latitude + ',' + longitude,
        sort: 2,
        oauth_token: auth.accessToken
      };

      var oauthBinding = new OAuth1Binding(config, 'http://api.yelp.com/v2/search');
      oauthBinding.accessTokenSecret = auth.accessTokenSecret;
      
      
      Results.insert(oauthBinding.call('GET', oauthBinding._urls, parameters));
    }
  });
  Meteor.publish('results', function () {
    return Results.find({});
  });
}
