import Transform from '@ember-data/serializer/transform';

export default class ArrayTransform extends Transform {
  deserialize(serialized) {
    return serialized ? serialized : [];
  }

  serialize(deserialized) {
    return deserialized;
  }
}
