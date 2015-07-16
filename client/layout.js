Template.layout.rendered = function () {
  this.autorun(function () {
    var error = Errors.findOne();
    if (error) {
      Errors.remove(error._id);
      return IonPopup.alert({
        title: 'There was an error:',
        template: error.message.reason,
        okText: 'Ok.'
      });
    }
  });
};