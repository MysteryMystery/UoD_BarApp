import Component from '@glimmer/component';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import fetch from "fetch";
import ENV from "front-end/config/environment";
import {inject as service} from "@ember/service";

export default class LoginFormComponent extends Component {
  @service("session") session;
  @service router;

  @tracked email;
  @tracked password;
  @tracked errorMsg;

  @action
  async submit() {
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
        this.session.jwt = data.data.attributes.jwt
        this.router.transitionTo("dashboard")
      })
      .catch(() => this.errorMsg = "Your credentials did not match our records.")
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
