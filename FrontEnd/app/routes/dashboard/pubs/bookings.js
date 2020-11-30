import Route from '@ember/routing/route';
import {inject as service} from "@ember/service";

export default class PubsBookingsRoute extends Route {
  @service("session") session;
  @service store;

  async beforeModel(){
    this.session.redirectIfUnauth(this)
  }

  async model(params) {
    return await this.store.findRecord("pub", params.pub_id)
  }
}
