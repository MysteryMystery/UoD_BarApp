import Component from '@glimmer/component';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import fetch from "fetch";
import ENV from "front-end/config/environment";
import {inject as service} from "@ember/service";

export default class PubCreateComponent extends Component {
  DAYS = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]

  @service session;

  @tracked images = []
  @tracked name = ""
  @tracked description = ""
  @tracked address_line_1 = ""
  @tracked address_line_2 = ""
  @tracked address_line_3 = ""
  @tracked address_line_4 = ""
  @tracked address_postcode = ""

  @tracked tables = [
    {
      table_number: 1,
      table_capacity: 2,
      location: "Indoors"
    }
  ]

  @tracked openingHours = [
    {
      start: "00:00",
      end: "23:00",
      opening_hour_days_attributes: [
        {
          day_int: 0
        },
        {
          day_int: 1
        }
      ]
    }
  ]


  @action
  setName(event){
    this.name = event.target.value
  }

  @action
  setDescription(event){
    this.description = event.target.value
  }

  @action
  setAddressLine1(event){
    this.address_line_1 = event.target.value
  }

  @action
  setAddressLine2(event){
    this.address_line_2 = event.target.value
  }

  @action
  setAddressLine3(event){
    this.address_line_3 = event.target.value
  }

  @action
  setAddressLine4(event){
    this.address_line_4 = event.target.value
  }

  @action
  setAddressPostcode(event){
    this.address_postcode = event.target.value
  }

  @action
  newTable(){
    this.tables.push({
      table_number: null,
      table_capacity: null,
      location: null
    })
    /* Ignore silly assignment, its here on purpose */
    this.tables = this.tables
  }

  @action
  updateTableNumber(event){
    var listIndex = event.target.dataset.index
    this.tables[listIndex].table_number = event.target.value;
  }

  @action
  updateTableCapacity(event){
    var listIndex = event.target.dataset.index
    this.tables[listIndex].table_capacity = event.target.value;
  }

  @action
  updateTableLocation(event){
    var listIndex = event.target.dataset.index
    this.tables[listIndex].location = event.target.value;
  }

  @action
  newHours(){
    this.openingHours.push({
      start: "00:00",
      end: "23:00",
      days: []
    })
    this.openingHours = this.openingHours
  }

  @action
  setImages(event){
    const fileReader = new FileReader()
    const uploadedFiles = Array.from(event.target.files) // event.target.files instanceof FileList
    const processedData = [] // can't just add to this.images directly, otherwise ember doesn't see it

    //Not sure if this check is needed or not as called on input event
    if (uploadedFiles.length === 0)
      return

    console.log(uploadedFiles)

    fileReader.onload = () => {
      processedData.push(fileReader.result)
    }

    uploadedFiles.forEach(file => fileReader.readAsDataURL(file));
    this.images = processedData;
  }

  @action
  async submit(){
    await fetch(ENV.APP.RAILS_API + "pubs", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      body: JSON.stringify({
        jwt: this.session.getAttr("jwt"),
        pub: {
          name: this.name,
          description: this.description,
          address_line_1: this.address_line_1,
          address_line_2: this.address_line_2,
          address_line_3: this.address_line_3,
          address_line_4: this.address_line_4,
          address_postcode: this.address_postcode,

          pub_tables_attributes: this.tables,
          opening_hours_attributes: this.openingHours,
          images: this.images
        },
      })
    })
      .then(_ => _.json())
      .then(data => {
        console.log(data)
        //this.router.transitionTo("dashboard")
      })
      .catch(() => this.errorMsg = "Something went wrong")
  }
}

