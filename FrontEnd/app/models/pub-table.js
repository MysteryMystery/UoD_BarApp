import Model, { attr, belongsTo } from '@ember-data/model';

export default class PubTableModel extends Model {
  @belongsTo("pub") pub;

  @attr pub_id;
  @attr table_number
  @attr location
}
