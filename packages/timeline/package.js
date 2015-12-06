Package.describe({
  name: 'matchsci:timeline',
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

    //Collections
    'both/collections/news.js',
    'both/collections/issue.js',
    'both/collections/ans.js'
  ]);

  api.addFiles([
    'client/views/timeline/newsItem/newsItem.html',
    'client/views/timeline/newsItem/newsItem.js',
    'client/views/timeline/newsPage/newsPage.html',
    'client/views/timeline/newsPage/newsPage.js',
    'client/views/timeline/newsPage/newsPage_pagination.js',
    'client/views/timeline/option/option.html',
    'client/views/timeline/option/option.js',
    'client/views/timeline/uploadNews/uploadOption.html',
    'client/views/timeline/uploadNews/uploadOption.js',
    'client/views/timeline/uploadNews/uploadNews.html',
    'client/views/timeline/uploadNews/uploadNews.js',
    'client/views/timeline/searching_issue/searching_issue.html',
    'client/views/timeline/searching_issue/searching_issue.js',
    'client/views/timeline/register-nologged/register-nologged.html',
    'client/views/timeline/register-nologged/register-nologged.css',
    'client/views/timeline/register-nologged/register-nologged.js',
    'client/views/timeline/register-nologged/steps/step1/step1.html',
    'client/views/timeline/register-nologged/steps/step1/step1.css',
    'client/views/timeline/register-nologged/steps/step1/step1.js',
    'client/views/timeline/register-nologged/steps/step2/step2.html',
    'client/views/timeline/register-nologged/steps/step2/step2.css',
    'client/views/timeline/register-nologged/steps/step2/step2.js',
    'client/views/timeline/register-nologged/steps/step3/step3.html',
    'client/views/timeline/register-nologged/steps/step3/step3.css',
    'client/views/timeline/register-nologged/steps/step3/step3.js',
    'client/views/timeline/register-nologged/steps/step4/step4.html',
    'client/views/timeline/register-nologged/steps/step4/step4.js',
    'client/views/timeline/register-nologged/steps/step5/step5.html',
    'client/views/timeline/register-nologged/steps/step5/step5.js',
    'client/views/timeline/register-nologged/steps/step6/step6.html',
    'client/views/timeline/register-nologged/steps/step6/step6.js',
    'client/views/timeline/register-nologged/steps/step7/step7.html',
    'client/views/timeline/register-nologged/steps/step7/step7.js',
  ], 'client')

  api.addAssets([
    'img/reg.png'
  ], 'client')
});
