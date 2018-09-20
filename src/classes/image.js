export default class Image {
  constructor(id, path, top = 0, left = 0) {
    this.id = id;
    this.path = path;
    this.element = document.createElement('img');
    this.element.setAttribute('id', this.id);
    this.element.setAttribute('src', path);
    this.element.setAttribute('style', `top: ${top}px; left: ${left}px; opacity: 0`);
    document.getElementById('stage').append(this.element);
  }
}