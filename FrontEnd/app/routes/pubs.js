import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";
import fetch from "fetch"

export default class PubsRoute extends Route {
  @service store;

  async model() {
    try {
      let records = await this.store.findAll("pub");
      return records;
    } catch (error) {
      return [error];
    }
  }
}
