import Ember from 'ember';

export function icon(params, hash = {}) {
  let icon = params[0];
  return Ember.String.htmlSafe(`
    <svg class="icon ${hash.class || ''}">
      <use xlink:href="assets/icons.svg#${icon}"></use>
    </svg>
  `);
}

export default Ember.Helper.helper(icon);
