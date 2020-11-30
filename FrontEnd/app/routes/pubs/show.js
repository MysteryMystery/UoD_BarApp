import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";
import fetch from "fetch"

export default class PubsShowRoute extends Route {
  @service store;
  @service("session") session;

  async model(params) {
    return await this.store.findRecord("pub", params.pub_id)
  }
}
