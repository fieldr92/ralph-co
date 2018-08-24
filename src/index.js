import data from './data/dataTest';

const assetPath = "./assets/";

class Banner {
  constructor({ width, height, data }) {
    this.width = width;
    this.height = height;
    this.data = data;
    this.imgElements = [];
    this.imagesForManifest = null;
  }

  init() {
    this.pushAssetsToImgElements();
    this.createManifest();
  }

  pushAssetsToImgElements() {    
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        if (layer.src) { this.imgElements.push(layer.src) }
      });
    });    
    return this;
  }

  createManifest() {
    this.imagesForManifest = this.imgElements.map(el => {
      return { id: el.substr(0, el.lastIndexOf('.')), src: assetPath + el }
    })
    
    const queue = new createjs.LoadQueue();
    queue.on("complete", this.handleComplete);
    queue.loadManifest( this.imagesForManifest );

  }

  handleComplete() {
    console.log(this.imagesForManifest);
    
    this.imagesForManifest.forEach(img => {
      const image = queue.getResult(img.id)
      document.body.appendChild(image);
    });
  }

}

new Banner({width: 300, height: 250, data})
  .init();