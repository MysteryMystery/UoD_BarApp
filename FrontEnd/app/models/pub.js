import Model, { attr } from '@ember-data/model';

export default class PubModel extends Model {
  @attr("string") name;
  @attr("int") number_of_tables;
}
