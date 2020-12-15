import Component from '@glimmer/component';
import { action } from '@ember/object';
import {tracked} from "@glimmer/tracking";
import fetch from "fetch";
import ENV from "front-end/config/environment";
import {inject as service} from "@ember/service";


export default class PubCreateComponent extends Component {
  DAYS = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]

  @service session;

  @tracked existing_images = []

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

  /**
   * I can't remember what x, y are, they just need to be a thing, and I don't need them
   * @param x
   * @param y
   */
  constructor(x, y) {
    super(x, y);
    this.populateForm();
  }

  @action
  async populateForm(){
    const myPub = this.args.pub;
    if (myPub === undefined)
      return;

    /*
    I cannot seem to get the relationship to work with ember data as the documentation is not thorough
    always returning null
    so, the fetch way it is
    will attempt to debug / rewrite late if time permits
     */
    let fetchData = {}
    await fetch(ENV.APP.RAILS_API + "pubs/" + myPub.id)
      .then(_ => _.json())
      .then(d => fetchData = d)

    this.name = fetchData.data.attributes.name
    this.description = fetchData.data.attributes.description
    this.address_line_1 = fetchData.data.attributes.address_line_1
    this.address_line_2 = fetchData.data.attributes.address_line_2
    this.address_line_3 = fetchData.data.attributes.address_line_3
    this.address_line_4 = fetchData.data.attributes.address_line_4
    this.address_postcode = fetchData.data.attributes.address_postcode
    this.existing_images = fetchData.data.attributes.images

    this.populateTables(fetchData)
    this.populateOpeningHours(fetchData)
  }

  populateTables(fetchData){
    let pubTables = fetchData.data.relationships.pub_tables.data
    if (pubTables.length > 0)
      this.tables = []

    const includedModels = fetchData.data.included
    for (const index in pubTables){
      if (!pubTables.hasOwnProperty(index))
        continue
      const table = pubTables[index]
      //find the table in includes
      let tableId = table.id
      let modelName = table.type

      for (const modelId in includedModels){
        if (!includedModels.hasOwnProperty(modelId))
          continue

        let model = includedModels[modelId]
        if (model.type === modelName && model.id === tableId){
          this.tables.push({
            id: model.id,
            table_number: model.attributes.table_number,
            table_capacity: model.attributes.table_capacity,
            location: model.attributes.location
          })
          //just remove from the search arr to reduce the number of iterations each time
          let index = includedModels.indexOf(model)
          if (index >= 0)
            includedModels.splice(index, 1)
        }
      }
    }
    // ember doesnt like array.push so have to tell it to update by reassigning array itself
    // eslint-disable-next-line no-self-assign
    this.tables = this.tables
  }

  populateOpeningHours(fetchData){
    let openingHours = fetchData.data.relationships.opening_hours.data
    if (openingHours.length > 0)
      this.openingHours = []

    const includedModels = fetchData.data.included
    for (const index in openingHours){
      if (!openingHours.hasOwnProperty(index))
        continue
      const openingHour = openingHours[index]
      //find the table in includes
      let openingHourId = openingHour.id
      let modelName = openingHour.type

      for (const modelId in includedModels){
        if (!includedModels.hasOwnProperty(modelId))
          continue

        let model = includedModels[modelId]
        if (model.type === modelName && model.id === openingHourId){
          let toPush = {
            id: model.id,
            start: this.UTCtoTime(model.attributes.start),
            end: this.UTCtoTime(model.attributes.end),
            opening_hour_days_attributes: []
          }

          for (let daysIndex in model.included){
            if (!model.included.hasOwnProperty(daysIndex))
              continue
            let day = model.included[daysIndex]
            toPush.opening_hour_days_attributes.push({
              day_int: day.attributes.day_int,
              id: day.id
            })
          }

          this.openingHours.push(toPush)
          //just remove from the search arr to reduce the number of iterations each time
          let index = includedModels.indexOf(model)
          if (index >= 0)
            includedModels.splice(index, 1)
        }
      }
    }
  }

  UTCtoTime(datetime){
    let date = new Date(datetime)
    let hours = date.getHours()
    if (hours < 10)
      hours = "0" + hours
    let mins = date.getMinutes()
    if (mins < 10)
      mins = "0" + mins
    return hours + ":" + mins
  }

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
      opening_hour_days_attributes: []
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

    fileReader.onload = () => {
      processedData.push(fileReader.result)
    }

    uploadedFiles.forEach(file => fileReader.readAsDataURL(file));
    this.images = processedData;
  }

  @action
  async submit(){
    let urlExt = "";
    let fetchMethod = "POST"

    if (this.args.pub){
      urlExt = "/" + this.args.pub.id
      fetchMethod = "PATCH"
    }

    await fetch(ENV.APP.RAILS_API + "pubs" + urlExt, {
      method: fetchMethod,
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
      .then(() => {
        this.router.transitionTo("dashboard")
      })
      .catch(() => this.errorMsg = "Something went wrong")
  }

  @action
  async resetOpeningHours(event){
    this.openingHours = []

    if (this.args.pub === undefined)
      return

    await fetch(ENV.APP.RAILS_API + "pubs/" + this.args.pub.id + "/opening_hours?jwt=" + this.session.getAttr("jwt") , {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow"
    })
  }

  @action
  async resetTables(event){
    this.tables = []

    if (this.args.pub === undefined)
      return

    await fetch(ENV.APP.RAILS_API + "pubs/" + this.args.pub.id + "/pub_tables?jwt=" + this.session.getAttr("jwt") , {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow"
    })
  }

  @action
  async destroyPub(event){
    if (this.args.pub === undefined)
      return

    await fetch(ENV.APP.RAILS_API + "pubs/" + this.args.pub.id + "?jwt=" + this.session.getAttr("jwt") , {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow"
    }).then(() => {
      this.router.transitionTo("dashboard")
    })
  }

  @action
  async deleteImage(event){
    let imgUrl = event.target.src

    this.existing_images.splice(this.existing_images.indexOf(imgUrl), 1)
    this.existing_images = this.existing_images

    if (this.args.pub === undefined)
      return

    //now we want the blob. Its at the end.
    let split = imgUrl.split("/")
    let lastElement = split[split.length - 1]

    //now remove the stuff after ?
    let blob = lastElement.split("?")[0]
    await fetch(ENV.APP.RAILS_API + "pubs/" + this.args.pub.id + "/image?jwt=" + this.session.getAttr("jwt") + "&key=" + blob, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow"
    }).then(() => {
      this.router.transitionTo("dashboard")
    })
  }
}

