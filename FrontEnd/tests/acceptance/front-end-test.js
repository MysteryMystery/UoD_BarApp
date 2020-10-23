import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | front end', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /front-end', async function(assert) {
    await visit('/front-end');

    assert.equal(currentURL(), '/front-end');
  });
});
