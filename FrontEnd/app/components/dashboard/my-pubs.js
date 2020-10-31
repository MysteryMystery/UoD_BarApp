import Component from '@glimmer/component';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import fetch from "fetch";
import ENV from "front-end/config/environment";
import {inject as service} from "@ember/service";

export default class DashboardMyPubsComponent extends Component {
  @service session;
  @service store;

  @tracked pubs = [];

  constructor(owner, args) {
    super(owner, args);

    this.getPubs()
  }

  async getPubs(){
    var pubs = [];
    await fetch(ENV.APP.RAILS_API + "users/pubs?jwt=" + this.session.getAttr("jwt"), {
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow"
    })
      .then(_ => _.json())
      .then(data => data.data.forEach(x => pubs.push(this.store.createRecord("pub", x.attributes))))
      .catch(_ => console.log(_))
    ;
    this.pubs = pubs;
  }
}
