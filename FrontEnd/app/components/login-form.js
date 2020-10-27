import Component from '@glimmer/component';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import fetch from "fetch";
import ENV from "front-end/config/environment";
import {inject as service} from "@ember/service";
import $ from "jquery"

export default class LoginFormComponent extends Component {
  @service("session") session;
  @service router;

  @tracked email;
  @tracked password;
  @tracked errorMsg;

  @action
  async submit() {

    // eslint-disable-next-line ember/no-jquery
    $.ajax({
      url: ENV.APP.RAILS_API + "login",
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({"email": this.email, "password": this.password})
    })
      .done(data => {
        this.session.isLoggedIn = data.status === "ok"
        this.router.transitionTo("dashboard")
      })
      .fail(() => this.errorMsg = "Your credentials did not match our records.")

    /*
    await fetch(ENV.APP.RAILS_API + "login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify({"email": this.email, "password": this.password})
    })
      .then(_ => _.json())
      .then(data => {
        this.session.isLoggedIn = data.status === "ok"
        this.router.transitionTo("dashboard")
      })
      .catch(() => this.errorMsg = "Your credentials did not match our records.")
     */
  }

  @action
  setEmail(event){
    this.email = event.target.value
  }

  @action
  setPassword(event){
    this.password = event.target.value
  }
}
