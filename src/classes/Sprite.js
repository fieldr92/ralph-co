import { TimelineMax, SteppedEase } from "gsap";
import Animation from './Animation';

export default class Sprite extends Animation {
  constructor(layer, animation, frameDelay, timeline, elementId) {
    super(layer, animation, frameDelay, timeline, elementId)
  }

  playSprite(width, height) {    
    const noRows = this.layer["spriteHeight"] / height;

    const spriteInDelay = `${this.frameDelay + this.layer["animation-in"]["delay"]}`;
    const spriteInDuration = this.layer["animation-in"]["duration"];
    
    const spriteOutDelay = `${this.frameDelay + this.layer["animation-out"]["delay"]}`;
    const spriteOutDuration = this.layer["animation-out"]["duration"];

    const spriteTimeline = new TimelineMax();

    for (let i = 1; i <= noRows; i++) {
      const topPosition = (-height * i) + this.layer.top;
      const spriteSpeed = (this.layer["spriteWidth"] / width) / this.layer["framerate"];

      spriteTimeline
        .to(this.elementId, spriteInDuration, this.layer["animation-in"]["style"], spriteInDelay)
        .to(this.elementId, spriteSpeed, { x: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) })
        .set(this.elementId, { top: topPosition, x: 0 });      
    }

    spriteTimeline
      .to(this.elementId, spriteOutDuration, this.layer["animation-out"]["style"], spriteOutDelay);
  }
}