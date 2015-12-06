ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
  //doc isn't null, and userId === doc.userId
}