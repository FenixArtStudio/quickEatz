Template.businessPage.onRendered(function () {
  var favoriteExists = Favorite.findOne({userId: Meteor.user()._id, businessId: this.data._id});
  if (favoriteExists) {
    $('.favorite-button').addClass('favorite-active');
  }
});

Template.businessPage.events({
  'click [data-action=favorite]': function (event, template) {
    Meteor.call('addFavorite', this, function (error, result) {
      if (error) {
        console.log(error);
      }
      if (result.favoriteExists) {
        $('.favorite-button').removeClass('favorite-active');  
      } else {
        $('.favorite-button').addClass('favorite-active');  
      }
      
    });
  },  
  'click [data-action=directions]': function (event, template) {
    var self = this;
    IonActionSheet.show({
      titleText: 'Directions',
      buttons: [
        { text: 'Google Maps' },
        { text: 'Apple Maps' }
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          window.open(
            'https://maps.google.com?saddr=Current+Location&daddr=' + self.location.address, 
            '_blank'
          );
        }
        if (index === 1) {
          window.open(
            'http://maps.apple.com/maps?saddr=Current+Location&daddr=' + self.location.address
          );
        }
        return true;
      }
    });
  },  
  'click [data-action=share]': function (event, template) {
    var self = this;
    IonActionSheet.show({
      titleText: 'Share',
      buttons: [
        { text: 'Email <i class="icon ion-email"></i>' },
        { text: 'Text <i class="icon ion-android-chat"></i>' },
        { text: 'Twitter <i class="icon ion-social-twitter"></i>' },
        { text: 'Facebook <i class="icon ion-social-facebook"></i>' }
      ],
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        if (index === 0) {
          window.location.href = self.phone;
        }
        if (index === 1) {
          window.open(
            'https://maps.google.com?saddr=Current+Location&daddr=' + self.location.address, 
            '_blank'
          );
        }
        if (index === 2) {
          window.open(
            'http://maps.apple.com/maps?saddr=Current+Location&daddr=' + self.location.address
          );
        }
        if (index === 3) {
          window.open(
            'http://maps.apple.com/maps?saddr=Current+Location&daddr=' + self.location.address
          );
        }
        return true;
      }
    });
  }
});