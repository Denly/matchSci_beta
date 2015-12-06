Package.describe({
  name: 'matchsci:search',
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
  api.addFiles([
    'both/namespace.js',
]);
api.addFiles([
    'client/views/searchingList/post_item/post_item.html',
    'client/views/searchingList/post_item/post_item.js',
    'client/views/searchingList/posts_list/posts_list.html',
    'client/views/searchingList/posts_list/posts_list.js',
    'client/views/searchingList/searchBar/searchBar.html',
    'client/views/searchingList/searchBar/searchBar.js',
    'client/views/searchingList/search_filter/search_filter.html',
    'client/views/searchingList/search_filter/search_filter.js',
    'client/views/searchingList/search_filter/physical.html',
    'client/views/searchingList/search_filter/physical.js'

], 'client');

});
