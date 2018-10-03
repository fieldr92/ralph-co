export default class DOMElement {
  constructor({ id, path, tag = 'img', width = '100%', height = '100%', top = 0, left = 0 }) {
    this.element = document.createElement(tag);
    this.element.setAttribute('id', id);
    this.element.setAttribute('src', path);
    this.element.setAttribute('style', `width: ${width}; height: ${height}; top: ${top}px; left: ${left}px; opacity: 0`);
    document.getElementById('stage').append(this.element);
  }
}