import Image from './Image';
import Animation from './Animation';

export default class Banner {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.data = data;
    this.assetPath = "./assets/";
    this.timeline = new TimelineLite({ paused: true });
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
    let frameDelay = 0;
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        switch (layer["type"]) {
          case "image":
            layer.animations.forEach(animation => {
              new Animation(layer, animation, frameDelay, this.width, this.height, this.timeline)
                .styleChange();
            })
            break;
          case "spritesheet":
            new Animation(layer, null, frameDelay, this.width, this.height, this.timeline)
                .playSprite();
            break;
          default:
            console.log(`"${layer['type']}" is not a layer type.`);
            break;
        }
      })
      frameDelay += frame["duration"];
    })
    return this;
  }

  start() {
    this.timeline.play();
  }

}