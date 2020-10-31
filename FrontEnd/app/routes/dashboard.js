import Route from '@ember/routing/route';
import {inject as service} from "@ember/service";

export default class DashboardRoute extends Route {
  @service("session") session;

  async beforeModel(){
    this.session.redirectIfUnauth(this)
  }
}
