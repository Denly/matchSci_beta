Package.describe({
  name: 'matchsci:message',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('matchsci:base');
  //api.use('templating', 'client');

  api.addFiles([
    'both/namespace.js',
    'both/message.js',
    'both/messageList.js',
    ]);

  api.addFiles([
    'client/views/message/message_bar/message_bar.html',
    'client/views/message/message_bar/message_bar.js',
    'client/views/message/message_dropdown/message_dropdown.html',
    'client/views/message/message_dropdown/message_dropdown.js',
    'client/views/message/message_list/message_list.html',
    'client/views/message/message_list/message_list.js',
    'client/views/message/message_send/message_send.html',
    'client/views/message/message_send/message_send.js',
    'client/views/message/message_talk/message_talk.html',
    'client/views/message/message_talk/message_talk.js',
    'client/views/message/message_talk/pagination.js'
    ],'client');


  if (api.export)
    //api.export('Message');
    api.export('MessageList');
});
