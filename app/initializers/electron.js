export function initialize() {
  // Polyfill node module lookup
  requireNode || (requireNode = () => null);
}

export default {
  name: 'electron',
  initialize
};
