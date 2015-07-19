// function loadMap (business) {
//   function initialize() {
//
//     console.log(business);
//     var infoWindow = new google.maps.InfoWindow();
//     var mapOptions = {
//       center: { lat: business.location.coordinate.latitude, lng: business.location.coordinate.longitude},
//       zoom: 11
//     };
//     var location = new google.maps.LatLng(business.location.coordinate.latitude, business.location.coordinate.longitude);
//     var map = new google.maps.Map(document.getElementById('map-canvas'),
//         mapOptions);
//
//     var request = {
//       location: location,
//       radius: '20',
//       query: business._id
//     };
//     service = new google.maps.places.PlacesService(map);
//     service.textSearch(request, function (results, status) {
//       if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//           var place = results[i];
//           console.log(place);
//           createMarker(results[i]);
//           $('#open-now').append(place.opening_hours.open_now ? 'Open Now': 'Closed Now');
//         }
//       }
//     });
//
//     function createMarker(place) {
//       var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location,
//       });
//
//       google.maps.event.addListener(marker, 'click', function() {
//         service.getDetails(place, function(result, status) {
//           if (status != google.maps.places.PlacesServiceStatus.OK) {
//             alert(status);
//             return;
//           }
//           var content =
//           '<div id="content">'+
//           '<div id="siteNotice">'+
//           '</div>'+
//           '<h1 id="firstHeading" class="firstHeading">' + (result.name) +'</h1>'+
//           '<div id="bodyContent">'+
//             (result.opening_hours.open_now ? 'Open': 'Closed') +
//           '</div>'+
//           '</div>';
//
//
//           var infowindow = new google.maps.InfoWindow();
//           infoWindow.setContent(content);
//           infoWindow.open(map, marker);
//         });
//       });
//     }
//   }
//   google.maps.event.addDomListener(window, 'load', initialize());
// }



Template.businessPage.onCreated(function () {
  var self = this;
  Meteor.setTimeout(function () {
    self.subscribe('business', Router.current().params._id);
    self.subscribe('favorites');
  }, 250);
});

Template.businessPage.helpers({
  business: function () {
    // var business = Business.findOne({_id: Router.current().params._id});
    // loadMap();
    return Business.findOne({_id: Router.current().params._id});
  }
});

Template.businessPage.events({
  'click [data-action=favorite]': function (event, template) {
    Meteor.call('toggleFavorite', this, function (error, result) {
      if (error) {
        return throwError(error);
      }
      if (result.favoriteExists) {
        $('.favorite-button').removeClass('favorite-active');
        return throwSuccess('Favorite Removed');
      } else {
        $('.favorite-button').addClass('favorite-active');
        return throwSuccess('Favorite Added');
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
