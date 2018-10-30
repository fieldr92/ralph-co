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

    console.log(this.layer["animation-in"]["style"]);

    const spriteTimeline = new TimelineMax();
    
    this.timeline
      .to(this.elementId, spriteInDuration, this.layer["animation-in"]["style"], spriteInDelay);

    for (let i = 1; i <= noRows; i++) {
      const topPosition = (-height * i);
      const spriteSpeed = (this.layer["spriteWidth"] / width) / this.layer["framerate"];

      if (i === 1) {
        spriteTimeline
          .to(this.elementId, spriteSpeed, { x: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) }, spriteInDelay)
          .set(this.elementId, { top: topPosition, x: 0 }); 
      } else {
        spriteTimeline
          .to(this.elementId, spriteSpeed, { x: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) })
          .set(this.elementId, { top: topPosition, x: 0 });
      }
    }

    this.timeline
      .to(this.elementId, spriteOutDuration, this.layer["animation-out"]["style"], spriteOutDelay);
  }
}