Package.describe({
  name: 'matchsci:base',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});
var core = [
  'accounts-base',
  'accounts-facebook',
  'accounts-google',
  'accounts-password',
  'coffeescript',
  'email',
  'facebook',
  'fastclick',
  'geojson-utils',
  'google',
  'jquery',
  'meteor-platform',
  'mobile-status-bar',
  'npm-bcrypt',
  'reactive-dict',
  'reactive-var',
  'service-configuration',
  'audit-argument-checks'
];

var thirdParty= [
 'ian:accounts-ui-bootstrap-3@1.2.71',
 'iron:router@1.0.9',
 'copleykj:stripe-sync@2.0.3',
 'chrismbeckett:toastr@2.1.0',
 'denly:errorsthrow@1.0.1',
 'manuelschoebel:wait-on-lib@0.3.0',
 'mizzao:user-status@0.6.5',
 'natestrauser:filepicker-plus@2.0.0',
 'sacha:spin@2.3.1',
 'twbs:bootstrap@3.3.5',
 'momentjs:moment@2.10.3',
 'matb33:collection-hooks@0.8.0'
];

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use(core);
  api.imply(core);
  api.use(thirdParty);
  api.imply(thirdParty);
  api.addFiles([
   'both/namespace.js'
  ]);
  api.export('MS');
});
