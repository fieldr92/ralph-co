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
    const hello = this.data.frames.forEach(frame => {
      this.imgElements = frame.layers.map(layer => {
        return layer.src;
      })
    });
    console.log('hello', hello);
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