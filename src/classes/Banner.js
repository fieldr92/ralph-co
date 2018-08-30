import LoadElements from './LoadElements';
import Image from './Image';

export default class Banner {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.data = data;
    this.elementIds = [];
    this.assetPath = "./assets/";
    this.timeline = new TimelineLite({ paused: true });
  }

  createIds() {
    if (this.data.background) {
      this.elementIds.push('#' + this.data.background.substr(0, this.data.background.lastIndexOf('.')));
    }
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        this.elementIds.push('#' + layer.src.substr(0, layer.src.lastIndexOf('.')));
      })
    })
    return this; 
  }

  createElements() {
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        const top = layer.top;
        const left = layer.left;
        const id = layer.src.substr(0, layer.src.lastIndexOf('.'));
        const path = this.assetPath + layer.src;
        const elementType = 'img';
        new Image(id, path, elementType, top, left);
      })
    })
    return this;
  }

  animateFrames() {
    let previousFramesDuration = 0;
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        switch (layer["type"]) {
          case "image":
            layer.animations.forEach(animation => {
              this.timeline
                .to(`#${layer.src.substr(0, layer.src.lastIndexOf('.'))}`, animation["duration"], animation["style"], `${previousFramesDuration + animation["delay"]}`);
            })
            break;
          case "spritesheet":
            for (let i = 0; i < layer["noRows"]; i++) {
              this.timeline
                .to(`#${layer.src.substr(0, layer.src.lastIndexOf('.'))}`, 0.5, { opacity: 1 }, layer["playDelay"])
                .to(`#${layer.src.substr(0, layer.src.lastIndexOf('.'))}`, 1, { x: this.width - layer["spriteWidth"], ease:SteppedEase.config(layer["countPerRow"] - 1) })
                .to(`#${layer.src.substr(0, layer.src.lastIndexOf('.'))}`, 0.5, { opacity: 0 }, layer["stopDelay"]);
            }
            break;
          default:
            console.log(`"${layer['type']}" is not a layer type.`);
            break;
        }
      })
      previousFramesDuration += frame["duration"];
    })
    return this;
  }

  start() {
    this.timeline.play();
  }

}