import Component from '@glimmer/component';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import fetch from "fetch";
import ENV from "front-end/config/environment";
import {inject as service} from "@ember/service";

export default class PubBookingComponent extends Component {
  @service("session") session;

  pub = this.args.pub

  @tracked bookings;
  @tracked date = this.initDate()

  constructor() {
    super(...arguments);
    this.requestBookings()
  }

  async requestBookings(date = null){
    await fetch(ENV.APP.RAILS_API + "pubs/" + this.pub.id + "/bookings" + (date ? ("/" + date) : "") + "?jwt=" + this.session.getAttr("jwt"), {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
    })
      .then(_ => _.json())
      .then(data => this.bookings = data)
  }

  @action
  updateTable(event){
    this.requestBookings(event.target.value)
  }

  @action
  setDate(event){
    this.date = event.target.value;
  }

  initDate(){
    let x;
    const date = new Date()
    return date.getFullYear() + "-" + ((x = date.getMonth()).length < 2 ? ("0" + x) : x) + "-" + ((x = date.getDate()).length < 2 ? ("0" + x) : x);
  }

  auth() {
    return this.session.isLoggedIn
  }
}
