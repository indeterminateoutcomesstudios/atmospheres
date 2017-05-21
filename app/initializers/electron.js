export function initialize() {
  // Polyfill node module lookup
  window.requireNode || (window.requireNode = () => null);
}

export default {
  name: 'electron',
  initialize
};
