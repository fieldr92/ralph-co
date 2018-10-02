import { TimelineLite } from "gsap";

import Image from './Image';
import Animation from './Animation';
import Sprite from './Sprite';

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
    const backgroundId = `#${this.background.match(/[a-z]*/i)}`;
    const backgroundInfo = {
      id: this.background.match(/[a-z0-9_]*/i),
      path: this.assetPath + this.background,
      top: 0,
      left: 0
    }

    if (this.background.match(/[a-z]*?\.png/)) {
      new Image(backgroundInfo);
      this.timeline.to(backgroundId, 0, { opacity: 1 });
    } else if (this.background.match(/#[a-f0-9]{6}/i)) {
      document.getElementById('stage').style.backgroundColor = background;
    } else {
      console.log('Background not a image or color code');
    }

    return this;
  }

  createElements() {
    this.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        const imageInfo = {
          top: layer.top,
          left: layer.left,
          id: layer.src.match(/[a-z0-9_]*/i),
          path: this.assetPath + layer.src
        }
        new Image(imageInfo);
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
            new Sprite(layer, null, frameDelay, this.timeline)
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