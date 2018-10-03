import { TimelineLite } from "gsap";

import ImageElements from './ImageElements';
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

  createElements() {
    this.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        const imageInfo = {
          top: layer.top,
          left: layer.left,
          id: layer.src.match(/[a-z0-9_]*/i),
          path: this.assetPath + layer.src
        }
        new ImageElements(imageInfo);
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