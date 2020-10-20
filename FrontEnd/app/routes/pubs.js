import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";
import fetch from "fetch"

export default class PubsRoute extends Route {
  @service store;

  model(){
    return this.store.findAll("pub").then(function (v){
      return v;
    }, function (reason){
      return reason;
    })

    /*
    const apiResponse = await fetch("http://localhost:3000/pubs")
    return apiResponse.json()
     */
  }
}
