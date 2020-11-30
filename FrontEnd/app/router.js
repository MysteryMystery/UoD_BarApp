import EmberRouter from '@ember/routing/router';
import config from 'front-end/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('pubs', function() {
    this.route('show', {path: "/:pub_id"});
  });
  this.route('login');
  this.route('dashboard', function() {
    this.route('pubs', function() {
      this.route('create');
      this.route('bookings', {path: "/:pub_id/bookings"});
      this.route('edit', {path: "/:pub_id/edit"});
    });
  });
});
