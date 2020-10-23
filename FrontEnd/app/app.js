import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'front-end/config/environment';
import Ember from "ember";

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  LOG_RESOLVER = true;
  LOG_TRANSITIONS = true;
  LOG_TRANSITIONS_INTERNAL = true;
}

loadInitializers(App, config.modulePrefix);
