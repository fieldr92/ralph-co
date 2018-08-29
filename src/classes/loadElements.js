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
        if (layer.src) {
        // if (layer.type === 'image' && layer.src) {
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
    return this;
  }

  createElements() {
    this.manifestImages.forEach(img => {
      const obj = {};
      const key = img.id;
      obj[key] = new createjs.Bitmap(this.loader.getResult(img.id));
      this.elements = Object.assign(obj, this.elements);
    });
    return this;
  }

  animator() {
    setTimeout(() => {
      let baseTime = 0;
      this.data.frames.forEach(frame => {
        frame.layers.forEach((layer, i) => {
          this.manifestImages.forEach(img => {
            if (layer.src && img.src.substring(img.src.lastIndexOf('/') + 1) === layer.src) {

              let delayIn = baseTime + layer['animation-in']['delay'];
              let animationIn = layer['animation-in']['duration'];

              // let delayOut = delayIn + animationIn + layer['animation-out']['delay'];
              let delayOut = layer['animation-out']['delay'];
              let animationOut = layer['animation-out']['duration'];

              console.log(`${i} in`, delayIn);
              console.log(`${i} out`, delayOut);

              this.stage.addChild(this.elements[img.id]);
              this.elements[img.id].alpha = 0;

              switch (layer["animation-in"]["type"]) {
                case "fade":
                  new createjs.Tween(this.elements[img.id])
                    .wait(delayIn)
                    .to({alpha: 1}, animationIn);
                  break;
                
                default: console.log(`${layer['animation-in']['type']} is not an animation type`);
                  break;
              }

              switch (layer["animation-out"]["type"]) {
                case "fade":
                  new createjs.Tween(this.elements[img.id])
                    .wait(delayOut)
                    .to({alpha: 0}, animationOut);
                  break;
                
                default: console.log(`${layer['animation-in']['type']} is not an animation type`);
                  break;
              }


              // new createjs.Tween(this.elements[img.id])
              //   .wait(delayIn)
              //   .to({alpha: 1}, layer["animation-in"]["duration"])
              //   .wait(delayOut)
              //   .to({alpha: 0}, layer["animation-out"]["duration"]);
            }
          })
        })
        baseTime = baseTime + frame["duration"];
      })
    }, 1000)
  }

}

export default LoadElements;