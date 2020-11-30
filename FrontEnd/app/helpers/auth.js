import Helper from '@ember/component/helper';
import {inject as service} from "@ember/service";

export default class Auth extends Helper {
  @service("session") session;

  compute(){
    return !!this.session.getAttr("jwt");
  }
}
