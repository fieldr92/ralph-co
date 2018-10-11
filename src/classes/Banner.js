import { TimelineLite } from "gsap";

import DOMElement from './DOMElement';
import Animation from './Animation';
import Sprite from './Sprite';

export default class Banner {
  constructor({ width, height, frames }, queue) {
    this.width = width;
    this.height = height;
    this.frames = frames;
    this.queue = queue;
    this.timeline = new TimelineLite({ paused: true });
  }

  createElements() {
    this.frames.forEach(frame => {
      frame.layers.forEach((layer, i) => {
        const imgInfo = {
          top: layer.top,
          left: layer.left,
          id: layer.src.match(/[a-z0-9_]*/i),
          path: this.queue.getResult(layer.src.match(/[a-z0-9_]*/i))
        };
        const spriteInfo = {
          top: layer.top,
          left: layer.left,
          width: layer.spriteWidth,
          height: layer.spriteHeight,
          id: layer.src.match(/[a-z0-9_]*/i),
          path: this.queue.getResult(layer.src.match(/[a-z0-9_]*/i))
        };
        const divInfo = {
          top: layer.top,
          left: layer.left,
          tag: 'div',
          id: `background${i}`
        };
        switch (layer["type"]) {
          case "image":
            new DOMElement(imgInfo);
            break;
          case "spritesheet":
            new DOMElement(spriteInfo);
            break;
          case "background":
            if (layer.src.match(/[a-z]*?\.png/)) {
              new DOMElement(imgInfo);
            } else if (layer.src.match(/#[a-f0-9]{6}/i)) {
              new DOMElement(divInfo);
              document.getElementById(divInfo.id).style.backgroundColor = layer.src;
            } else {
              console.log('Background not a image or color code');
            }
            break;
          default:
            console.log(`"${layer['type']}" is not a layer type.`);
            break;
        }
      })
    })
    return this;
  }

  animateFrames() {
    let frameDelay = 0;
    this.frames.forEach(frame => {
      frame.layers.forEach((layer, i) => {
        switch (layer["type"]) {
          case "image":
            layer.animations.forEach(animation => {
              new Animation(layer, animation, frameDelay, this.timeline, `#${layer.src.match(/[a-z0-9_]*/i)}`)
                .styleChange();
            })
            break;
          case "background":
            if (layer.src.match(/[a-z]*?\.png/)) {
              layer.animations.forEach(animation => {
                new Animation(layer, animation, frameDelay, this.timeline, `#${layer.src.match(/[a-z0-9_]*/i)}`)
                  .styleChange();
              })
            } else if (layer.src.match(/#[a-f0-9]{6}/i)) {
              layer.animations.forEach(animation => {
                new Animation(layer, animation, frameDelay, this.timeline, `#background${i}`)
                  .styleChange();
              })
            } else {
              console.log('Background not a image or color code');
            }
            break;
          case "spritesheet":
            new Sprite(layer, null, frameDelay, this.timeline, `#${layer.src.match(/[a-z0-9_]*/i)}`)
              .playSprite(this.width, this.height);
            break;
          default:
            console.log(`"${layer['type']}" is not a layer type.`);
            break;
        }
      });
      frameDelay += frame["duration"];
    });
    return this;
  }

  start() {
    this.timeline.play();
  }
}