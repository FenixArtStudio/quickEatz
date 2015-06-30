Template.businessesList.helpers({
  counter: function () {
    
    return Results.findOne();
  }
});
Template.businessesList.events({
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
      var long, lat; 
      lat = position.coords.latitude;
      long = position.coords.longitude; 
      Meteor.call('getResults', long, lat );
    }
  },
  'keyup #filter': function (e, tpl) {
    e.preventDefault();
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
  }
});
