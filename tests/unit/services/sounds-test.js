import { moduleFor, test } from 'ember-qunit';

moduleFor('service:sounds', 'Unit | Service | sounds', {
  needs: [ 'service:player' ],
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
