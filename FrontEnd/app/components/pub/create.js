import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';
import $ from "jquery";

export default class PubCreateComponent extends Component {
  DAYS = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]

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
      days: [
        "Monday",
        "Tuesday"
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
  newTable(e){
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
  submit(){

  }
}

