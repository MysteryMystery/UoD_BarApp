import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import {inject as service} from "@ember/service";

export default class MainNavComponent extends Component {
  @service("session") session;

  @tracked loginLinkName = this.session.isLoggedIn ? "Dashboard" : "Login";
  @tracked loginLinkHref = this.session.isLoggedIn ? "/dashboard" : "/login";
}
