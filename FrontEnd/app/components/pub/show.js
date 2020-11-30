import Component from '@glimmer/component';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import fetch from "fetch";
import ENV from "front-end/config/environment";
import {inject as service} from "@ember/service";

export default class PubShowComponent extends Component {
  @service session;
}
