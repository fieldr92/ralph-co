import LoadElements from './LoadElements';
import Image from './Image';

export default class Banner {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.data = data;
    this.frames = [];
    this.elementIds = [];
    this.assetPath = "./assets/";
    this.timeline = new TimelineMax({ paused: true });
  }

  createIds() {
    if (this.data.background) {
      this.elementIds.push('#' + this.data.background.substr(0, this.data.background.lastIndexOf('.')));
    }
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        this.elementIds.push('#' + layer.src.substr(0, layer.src.lastIndexOf('.')));
      })
    })
    return this; 
  }

  createElements() {
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        const top = layer.top;
        const left = layer.left;
        const id = layer.src.substr(0, layer.src.lastIndexOf('.'));
        const path = this.assetPath + layer.src;
        const elementType = 'img';

        new Image(id, path, elementType, top, left);
      })
    })
    return this;
  }

  animateFrames() {
    this.data.frames.forEach
  }

}