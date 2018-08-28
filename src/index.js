import data from './data/dataTest';

const assetPath = "./assets/";

export default class Banner {
  constructor({ width, height, data }) {
    this.width = width;
    this.height = height;
    this.data = data;
    this.frames = [];
    this.imgElements = [];
    this.elements = {};
  }

  init() {    
    this.stage = new createjs.Stage(document.getElementById('stage'));
    this.pushAssetsToImgElements();
    this.createManifest();
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));
  }

  handleTick(event) {    
    this.stage.update();
  }

  pushAssetsToImgElements() {
    this.imgElements.push(this.data.background);
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        if (layer.src) { this.imgElements.push(layer.src) }
      });
    });
  }

  createManifest() {
    this.manifestImages = this.imgElements.map(el => {
      return { id: el.substr(0, el.lastIndexOf('.')), src: assetPath + el }
    })
    this.loadQueue();
  }

  loadQueue() {
    this.loader = new createjs.LoadQueue(true);
    this.loader.on("complete", this.handleComplete.bind(this));
    this.loader.loadManifest( this.manifestImages );
  }

  handleComplete() {
    this.createElements();
  }

  createElements() {
    this.manifestImages.forEach(img => {
      const obj = {};
      const key = img.id;
      obj[key] = new createjs.Bitmap(this.loader.getResult(img.id));
      this.elements = Object.assign(obj, this.elements);      
      this.stage.addChild(this.elements[img.id])
      this.elements[img.id].alpha = 0;
    });

    this.elements.image.alpha = 0;
    
    setTimeout(() => {
      createjs.Tween.get(this.elements.image).to({alpha: 1}, 1000);
    }, 500)

    setTimeout(() => {
      createjs.Tween.get(this.elements.image).to({x: this.width * 2}, 1000);
    }, 1500)

  }

  loadFrames() {
    this.data.frames.forEach(frame => {
      this.frames.push(frame);
    })
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Banner({width: 300, height: 250, data})
  .init();
})