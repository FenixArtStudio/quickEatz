Template.favorites.onCreated(function () {
  var self = this;
    self.subscribe('favorites');
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
