import { TimelineLite } from "gsap";

import DOMElement from './DOMElement';
import Animation from './Animation';
import Sprite from './Sprite';

export default class Banner {
  constructor({ width, height, frames }, queue, regex) {
    this.width = width;
    this.height = height;
    this.frames = frames;
    this.regex = regex;
    this.queue = queue;
    this.frameDelay = 0;
    this.timeline = new TimelineMax({ paused: true });
  }

  createElements() {
    this.frames.forEach(frame => {
      frame.layers.forEach((layer, i) => {      
        const imgInfo = {
          top: layer.top,
          left: layer.left,
          id: layer.src.match(this.regex.id),
          path: this.queue.getResult(layer.src.match(this.regex.id))
        };
        const spriteInfo = {
          top: layer.top,
          left: layer.left,
          width: layer.spriteWidth,
          height: layer.spriteHeight,
          id: layer.src.match(this.regex.id),
          path: this.queue.getResult(layer.src.match(this.regex.id))
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
            if (layer.src.match(this.regex.src)) {
              new DOMElement(imgInfo);
            } else if (layer.src.match(this.regex.hex)) {
              new DOMElement(divInfo);
              document.getElementById(divInfo.id).style.backgroundColor = layer.src;
            } else {
              console.log('Background not a image or hex code');
            }
            break;
          default:
            console.log(`"${layer['type']}" is not a layer type.`);
            break;
        }
      });
    });
    return this;
  }

  animateFrames() {
    this.frames.forEach(frame => {
      frame.layers.forEach((layer, i) => {
        switch (layer["type"]) {
          case "image":
            layer.animations.forEach(animation => {
              new Animation(layer, animation, this.frameDelay, this.timeline, `#${layer.src.match(this.regex.id)}`)
                .styleChange();
            })
            break;
          case "background":
            if (layer.src.match(this.regex)) {
              layer.animations.forEach(animation => {
                new Animation(layer, animation, this.frameDelay, this.timeline, `#${layer.src.match(this.regex.id)}`)
                  .styleChange();
              })
            } else if (layer.src.match(this.regex.hex)) {
              layer.animations.forEach(animation => {
                new Animation(layer, animation, this.frameDelay, this.timeline, `#background${i}`)
                  .styleChange();
              })
            } else {
              console.log('Background not a image or color code');
            }
            break;
          case "spritesheet":
            new Sprite(layer, null, this.frameDelay, this.timeline, `#${layer.src.match(this.regex.id)}`)
              .playSprite(this.width, this.height);
            break;
          default:
            console.log(`"${layer['type']}" is not a layer type.`);
            break;
        }
      });
      this.frameDelay += frame["duration"];
    });
    return this;
  }

  start() {
    this.timeline.play();
  }
}