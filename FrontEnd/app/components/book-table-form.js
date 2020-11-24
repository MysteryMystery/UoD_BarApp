import Component from '@glimmer/component';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import fetch from "fetch";
import ENV from "front-end/config/environment";
import {inject as service} from "@ember/service";

export default class BookTableFormComponent extends Component {
  @tracked email = "";
  @tracked table_capacity = 2;
  @tracked date = this.initDate();
  @tracked pub = this.args.pub;

  @tracked booking_times = [];

  @action
  setField(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  async getBookingTimes(){
    console.log("uibivuo")

    //"pubs/:pub/:date/:table_capacity"
    let url = ENV.APP.RAILS_API + "pubs/";
    url += this.pub.id + "/"
    url += this.date + "/"
    url += this.table_capacity

    await fetch(url)
      .then(_ => _.json())
      .then(data => {
        console.log(data)
      })
      .catch(() => this.blah = "")
  }

  initDate(){
    let x;
    const date = new Date()
    return date.getFullYear() + "-" + ((x = date.getMonth()).length < 2 ? ("0" + x) : x) + "-" + ((x = date.getDate()).length < 2 ? ("0" + x) : x);
  }

  bookingTimesIsEmpty(){
    return this.booking_times.length === 0
  }
}
