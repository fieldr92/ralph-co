import Image from './Image';
import Animation from './Animation';

export default class Banner {
  constructor({ background, width, height, frames }) {
    this.background = background;
    this.width = width;
    this.height = height;
    this.frames = frames;
    this.assetPath = './assets/';
    this.timeline = new TimelineLite({ paused: true });
  }

  createBackground() {
    const background = this.background;
    const backgroundId = `#${background.match(/[a-z]*/i)}`;

    if (background.match(/[a-z]*?\.png/)) {
    new Image(background.match(/[a-z]*/i), this.assetPath + background, 0, 0);
      this.timeline.to(backgroundId, 0, { opacity: 1 });
    } else if (background.match(/#[a-f0-9]{6}/i)) {
      document.getElementById('stage').style.backgroundColor = background;
    } else {
      console.log('Background not a image or color code');
    }

    return this;
  }

  createElements() {
    this.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        const { top, left } = layer;
        const id = layer.src.match(/[a-z0-9_]*/i);
        const path = this.assetPath + layer.src;
        new Image(id, path, top, left);
      })
    })
    return this;
  }

  animateFrames() {
    let frameDelay = 0;
    this.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        switch (layer["type"]) {
          case "image":
            layer.animations.forEach(animation => {
              new Animation(layer, animation, frameDelay, this.timeline)
                .styleChange();
            })
            break;
          case "spritesheet":
            new Animation(layer, null, frameDelay, this.timeline)
                .playSprite(this.width, this.height);
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