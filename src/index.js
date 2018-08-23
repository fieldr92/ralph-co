import path from 'path';
import data from './data/dataTest';

class Banner {
  constructor({ width, height, data }) {
    this.width = width;
    this.height = height;
    this.data = data;
    this.imgElements = [];
  }

  loadQueue() {    
    const images = this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        if (layer.src) { this.imgElements.push(layer.src) }
      });
    });
    console.log(images);
    return images;
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

  createElements() {
  }

}

new Banner({width: 300, height: 250, data}).loadQueue();