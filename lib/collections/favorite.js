Favorite = new Mongo.Collection('favorite');

Meteor.methods({
  toggleFavorite: function (business) {
    var userId = Meteor.userId();

    var favoriteExists = Favorite.findOne({userId: userId, businessId: business._id});
    if (favoriteExists) {
      Favorite.remove({_id: favoriteExists._id});
      return {
        favoriteExists: true
      }
    }

    var favorite = {
      businessId: business._id,
      businessName: business.name,
      userId: userId,
      submitted: new Date()
    }

    var favoriteId = Favorite.insert(favorite);
    return {
      _id: favoriteId
    }
  },
  removeFavorite: function (favoriteId) {
    var userId = Meteor.userId();
    check(userId, String);
    if (favoriteId) {
      return Favorite.remove({_id: favoriteId});
    }
  }
});

