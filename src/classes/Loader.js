import createjs from 'createjs';

export default class Loader {
  constructor ({ frames }) {
    this.frames = frames;
    this.items = [];
    this.assetPath = './assets/';
    this.queue = new createjs.LoadQueue(true);
  }

preload() {
    this.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        if (layer.src.match(/[a-z]*?\.png/)) {
          this.items.push( { "id": `${layer.src.match(/[a-z0-9_]*/i)}`, "src": this.assetPath + layer.src } )
        }
      });
    });
    this.queue.loadManifest(this.items);
    this.queue.on('complete', this.handleComplete, this);
  }

  handleComplete() {
    console.log(this.queue);
    const image = this.queue.getResult("cta2");
    console.log(image);
  }
}