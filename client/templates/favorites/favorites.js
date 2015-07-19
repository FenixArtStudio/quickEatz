Template.favorites.onCreated(function () {
  var self = this;
  Meteor.setTimeout(function () {
    self.subscribe('favorites');  
  }, 250);
});

Template.favorites.helpers({
  favorites: function () {
    return Favorite.find();
  }
});

Template.favorites.events({
  'click [data-action=favorite]': function (event, template) {
    Meteor.call('removeFavorite', this._id, function (error, result) {
      if (error) {
        return throwError(error);
      } else {
        return throwSuccess('Favorite Removed');
      }
    });
  }
});