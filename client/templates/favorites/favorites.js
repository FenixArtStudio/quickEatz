Template.favorites.helpers({
  favorites: function () {
    return Favorite.find({userId: Meteor.userId()})
  }
})