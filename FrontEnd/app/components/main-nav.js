import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {inject as service} from "@ember/service";
import { action } from '@ember/object';

export default class MainNavComponent extends Component {
  @service("session") session;
  @service router;

  @tracked loginLinkName = this.session.isLoggedIn ? "Dashboard" : "Login";
  @tracked loginLinkHref = this.session.isLoggedIn ? "/dashboard" : "/login";

  @tracked isLoggedIn = this.session.isLoggedIn

  @action
  logout(){
    this.session.unset("jwt")
    //this.router.transitionTo("/")
    window.location.reload(true)
  }
}
