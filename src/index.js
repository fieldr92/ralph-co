import data from './data/dataTest';

const assetPath = "./assets/";

class Banner {
  constructor({ width, height, data }) {
    this.width = width;
    this.height = height;
    this.data = data;
    this.imgElements = [];
  }

  init() {
    this.stage = new createjs.Stage('stage');
    // this.stage.enableMouseOver(10);
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));
    this.pushAssetsToImgElements();
    this.createManifest();
  }

  handleTick(e) {
    this.stage.update();
  }

  pushAssetsToImgElements() {   
    this.imgElements.push(data.background);

    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        if (layer.src) { this.imgElements.push(layer.src) }
      });
    });
    console.log(this.imgElements);
    return this;
  }

  createManifest() {
    this.imagesForManifest = this.imgElements.map(el => {
      return { id: el.substr(0, el.lastIndexOf('.')), src: assetPath + el }
    })
    this.queue = new createjs.LoadQueue();
    this.queue.on("complete", this.handleComplete.bind(this))
    this.queue.loadManifest( this.imagesForManifest );
  }

  handleComplete() {    
    this.imagesForManifest.forEach(img => {
      const image = this.queue.getResult(img.id)
      // document.body.appendChild(image);
    });
  }

}

window.onload = new Banner({width: 300, height: 250, data})
  .init();