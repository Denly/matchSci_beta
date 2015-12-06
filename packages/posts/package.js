Package.describe({
  name: 'matchsci:posts',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'This is the matchsci posts package',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  api.use('matchsci:base');
  //api.use(['templating'], 'client');
  api.addFiles([
    'both/namespace.js',
    'both/lib/post_config.js',

    //Collections
    'both/collections/posts.js'
  ]);

  api.addFiles([
    //Allows
    'server/allows/posts.js',

    //Seed
    'server/seed/posts.js'
  ], 'server');
  api.addFiles([
    'client/views/ProfilePosts/post_page/post_page.html',
    'client/views/ProfilePosts/post_page/post_page.js',
    'client/views/ProfilePosts/post_profile/post_profile.html',
    'client/views/ProfilePosts/post_profile/post_profile.js',
    'client/views/ProfilePosts/post_infoSheet/post_infoSheet.html',
    'client/views/ProfilePosts/post_infoSheet/post_infoSheet.js',
    'client/views/ProfilePosts/post_infoSheet/post_infoItem.html',
    'client/views/ProfilePosts/post_infoSheet/post_infoItem.js',
    'client/views/ProfilePosts/post_edit/post_edit.html',
    'client/views/ProfilePosts/post_edit/post_edit.js',
    'client/views/ProfilePosts/post_page/post_page__befriend.js',
    'client/views/ProfilePosts/post_page/post_page__filepicker.js',
    'client/views/ProfilePosts/post_page/post_page__location.js',
    'client/views/ProfilePosts/post_summary/post_summary.html',
    'client/views/ProfilePosts/post_summary/post_summary.js',
    'client/views/ProfilePosts/posts_buttoms/posts_buttoms.html',
    'client/views/ProfilePosts/posts_buttoms/posts_buttoms.js',
    ],'client');
});
