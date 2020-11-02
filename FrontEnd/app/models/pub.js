import Model, { attr } from '@ember-data/model';

export default class PubModel extends Model {
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
}
