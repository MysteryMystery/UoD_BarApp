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
  @tracked booking_time;
  @tracked duration = 120;

  @tracked booking_number = null;

  @action
  setField(event) {
    this[event.target.id] = event.target.value;
  }

  @action
  async getBookingTimes(){
    //"pubs/:pub/:date/:table_capacity"
    let url = ENV.APP.RAILS_API + "pubs/";
    url += this.pub.id + "/"
    url += this.date + "/"
    url += this.table_capacity

    await fetch(url)
      .then(_ => _.json())
      .then(data => {
        let availableTimes = data.times;
        console.log(data.times)
        this.booking_times = [];
        this.booking_times = availableTimes;
      })
      .catch(() => console.log("error"))
  }

  @action
  async submit(){
    await fetch(ENV.APP.RAILS_API + "bookings", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify({
        pub_id: this.pub.id,
        date: this.date,
        time: this.booking_time,
        table_capacity: this.table_capacity,
      })
    }).then(_ => _.json())
      .then(data => {
        this.booking_number = data.attributes.booking_number;
      })
  }

  initDate(){
    let x;
    const date = new Date()
    return date.getFullYear() + "-" + ((x = date.getMonth()).length < 2 ? ("0" + x) : x) + "-" + ((x = date.getDate()).length < 2 ? ("0" + x) : x);
  }
}
