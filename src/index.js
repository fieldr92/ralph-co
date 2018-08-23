import data from './data/dataTest';

class Banner {
  constructor({ width, height, data }) {
    this.width = width;
    this.height = height;
    this.data = data;
    this.imgElements = [];
  }

  pushAssetsToImgElements() {    
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        if (layer.src) { this.imgElements.push(layer.src) }
      });
    });
    return this;
  }

  createElements() {
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        
      });
    });
    return this;
    // const queue = new createjs.loadQueue();
    // queue.on("complete", handleComplete, this);

    // queue.loadManifest([
    //   { id: "myImage", src:"path/to/myImage.jpg" },
    //   { id: "myImage2", src:"path/to/myImage2.jpg" }
    // ]);
    // const handleComplete = () => {
    //   const image = queue.getResult("")
    // }
  }
}

new Banner({width: 300, height: 250, data})
  .pushAssetsToImgElements()
  .createElements();