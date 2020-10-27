import Route from '@ember/routing/route';
import {inject as service} from "@ember/service";
import fetch from "fetch";
import ENV from "front-end/config/environment";
import $ from "jquery"

export default class DashboardRoute extends Route {
  @service("session") session;

  async beforeModel(){
    this.session.redirectIfUnauth(this)

    await fetch(ENV.APP.RAILS_API + "users", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
    })
      .then(_ => _.json())
      .then(data => {
        console.log(data)
      })
      .catch(() => this.errorMsg = "Your credentials did not match our records.")
  }
}
