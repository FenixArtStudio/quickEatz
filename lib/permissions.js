ownsDocument = function (userId, doc) {
  console.log('ownsDocument');
  return doc && doc.userId === userId;
};