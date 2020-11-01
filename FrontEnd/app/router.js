import EmberRouter from '@ember/routing/router';
import config from 'front-end/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('pubs', function() {});
  this.route('login');
  this.route('dashboard', function() {
    this.route('pubs', function() {
      this.route('create');
    });
  });
});
