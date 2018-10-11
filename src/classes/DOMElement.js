export default class DOMElement {
  constructor({ id, path, tag, width = '100%', height = '100%', top = 0, left = 0 }) {
    if ( tag === 'div' ) {
      this.element = document.createElement(tag);
      this.element.setAttribute('id', id);
      this.element.setAttribute('style', `width: ${width}; height: ${height}; top: ${top}px; left: ${left}px; opacity: 0`);
      document.getElementById('stage').append(this.element);
    }
    if (!tag) {
      this.element = path;
      this.element.setAttribute('id', id);
      this.element.setAttribute('style', `width: ${width}; height: ${height}; top: ${top}px; left: ${left}px; opacity: 0`);
      document.getElementById('stage').append(this.element);
    }
  }
}