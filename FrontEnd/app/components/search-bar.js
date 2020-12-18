import Component from '@glimmer/component';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';

export default class SearchBarComponent extends Component {
  @tracked search = "";
  @tracked models = this.args.models;

  allModels = this.args.models;
  filterFields = this.args.fields.split("|");

  @action
  doSearch(inputEvent){
    this.search = inputEvent.target.value;
    console.log(this.search)
    this.models = this.allModels

    if (this.search === "")
      return
    this.models = this.models.filter(model => {
        var s = this.search.toLowerCase()
        return model["name"].toLowerCase().includes(s) || model.oneLineAddr().toLowerCase().includes(s);
    })
  }
}
