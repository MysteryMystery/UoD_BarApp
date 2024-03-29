import Model, { attr, hasMany } from '@ember-data/model';

export default class PubModel extends Model {
  @hasMany("pub_tables") pub_tables;

  @attr("string") name;
  @attr("string") description

  @attr("string") address_line_1
  @attr("string") address_line_2
  @attr("string") address_line_3
  @attr("string") address_line_4
  @attr("string") address_postcode

  @attr("array") images;

  @attr created_at;
  @attr updated_at;

  oneLineAddr(){
    return this.address_line_1 + " " + this.address_line_2 + " " + this.address_line_3 + " " + this.address_line_4 + " " + this.address_postcode
  }
}
