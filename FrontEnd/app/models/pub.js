import Model, { attr } from '@ember-data/model';

export default class PubModel extends Model {
  @attr("string") name;
  @attr("number") number_of_tables;
  @attr created_at;
  @attr updated_at;
}
