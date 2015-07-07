Template.businessesList.helpers({
  results: function () {
    return Results.find().fetch();
  }
});

Template.businessesList.events({
  'click [data-action=getResults]': function () {
    event.preventDefault();
    getLocation();
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        IonPopup.alert({
          title: 'Alert',
          template: 'Geolocation is not supported by this browser.',
          okText: 'Ok.'
        });
      }
    }
    function showPosition(position) {        
      var long, lat; 
      lat = position.coords.latitude;
      long = position.coords.longitude; 
      Meteor.subscribe('results', lat, long);
    }
  },
  'keyup #filter': function (event, tpl) {
    event.preventDefault();
    var filter = tpl.$('[name=search]').val(), count = 0;
    var resultsCount = document.getElementById('results-count');
    var regex = new RegExp(filter, 'i');
    $('.results-list').each(function () {
      if ($(this).text().search(regex) < 0) {
        $(this).hide();
      } else {
        $(this).show();
        count++
        $('#results-count').text('Results ' + count);
      }
    });
  },
  'click [data-action=logout]': function (event) {
    event.preventDefault();
    Meteor.logout(function () {
      Router.go('index')
    });
  }
});
