import data from './data/dataTest';

const assetPath = "./assets/";

export default class Banner {
  constructor({ width, height, data }) {
    this.stage;
    this.width = width;
    this.height = height;
    this.data = data;
    this.frames = [];
    this.imgElements = [];
    this.elements = {};
  }

  init() {
    this.stage = new createjs.Stage('stage');    
    // this.stage.enableMouseOver(10);
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));
    this.pushAssetsToImgElements();
    this.createManifest();
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
    this.loader = new createjs.LoadQueue();
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
    });
    this.stage.addChild(this.elements.image);
    console.log(this.stage);
  }

  loadFrames() {
    this.data.frames.forEach(frame => {
      this.frames.push(frame);
    })
  }

}

window.onload = new Banner({width: 300, height: 250, data})
  .init();