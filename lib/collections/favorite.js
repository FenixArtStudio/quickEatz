Favorite = new Mongo.Collection('favorite');

Favorite.allow({
  remove: function () {
    return true;
  }
});

Meteor.methods({
  addFavorite: function (business) {
    var userId = Meteor.userId();
    check(userId, String);
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
  }
});

