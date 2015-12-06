Errors = {
  // Local (client-only) collection
  collection: new Mongo.Collection(null),

  throw: function(message) {
    Errors.collection.insert({message: message, type: 'alert-danger', seen: false})
  },
  success: function(message) {
    Errors.collection.insert({message: message, type: 'alert-success', seen: false})
  },
  info: function(message) {
    Errors.collection.insert({message: message, type: 'alert-info', seen: false})
  },
  warning: function(message) {
    Errors.collection.insert({message: message, type: 'alert-warning', seen: false})
  }
};