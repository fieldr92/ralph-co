class LoadElements {
  constructor (stage, width, height, data) {
    this.stage = stage;
    this.width = width;
    this.height = height;
    this.data = data;
    this.manifestImages = [];
    this.elements = {};
    this.assetPath = "./assets/";
  }

  createManifestImages() {
    if (this.data.background) {
      this.manifestImages.push({ id: this.data.background.substr(0, this.data.background.lastIndexOf('.')), src: this.assetPath + this.data.background });
    }
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        if (layer.type === 'image' && layer.src) {
          this.manifestImages.push({
            id: layer.src.substr(0, layer.src.lastIndexOf('.')),
            src: this.assetPath + layer.src
          });
        }
      });
    });
    return this;
  }

  loadQueue() {
    this.loader = new createjs.LoadQueue();
    this.loader.on("complete", this.createElements.bind(this));
    this.loader.loadManifest(this.manifestImages);
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
    this.elements.image.alpha = 1;
  }

}

export default LoadElements;