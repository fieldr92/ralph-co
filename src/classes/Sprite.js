import { TimelineMax, SteppedEase } from "gsap";
import Animation from './Animation';
import { runInThisContext } from "vm";

export default class Sprite extends Animation {
  constructor(layer, animation, frameDelay, timeline, elementId) {
    super(layer, animation, frameDelay, timeline, elementId)
  }

  playSprite(width, height) {    
    const noRows = this.layer["spriteHeight"] / height;

    const spriteInDelay = this.frameDelay + this.layer["animation-in"]["delay"];
    const spriteInDuration = this.layer["animation-in"]["duration"];
    
    const spriteOutDelay = this.frameDelay + this.layer["animation-out"]["delay"];
    const spriteOutDuration = this.layer["animation-out"]["duration"];

    const spriteSpeed = (this.layer["spriteWidth"] / width) / this.layer["framerate"];

    // this.timeline
    //   .to(this.elementId, spriteInDuration, this.layer["animation-in"]["style"], spriteInDelay)

    // for (let i = 0; i <= noRows; i++) {
    //   const topPosition = (-height * (i + 1));
      
    //   this.timeline
    //     .to(this.elementId, spriteSpeed, { left: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) }, spriteInDelay + (spriteSpeed * i))
    //     .set(this.elementId, { top: topPosition, left: 0 }, spriteInDelay + (spriteSpeed * (i + 1)));
    // }

    // this.timeline
    //   .to(this.elementId, spriteOutDuration, this.layer["animation-out"]["style"], spriteOutDelay);

    const spriteTimeline = new TimelineMax();

    // spriteTimeline
    //   .to(this.elementId, spriteInDuration, this.layer["animation-in"]["style"], spriteInDelay)
    //   .to(this.elementId, 0.52, { left: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) })
    //   .to(this.elementId, 0, { top: -250, left: 0 })
    //   .to(this.elementId, 0.52, { left: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) })
    //   .to(this.elementId, 0, { top: -500, left: 0 })
    //   .to(this.elementId, 0.52, { left: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) })
    //   .to(this.elementId, 0, { top: -750, left: 0 })
    //   .to(this.elementId, 0.52, { left: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) })
    //   .to(this.elementId, 0, { top: -1000, left: 0 })
    //   .to(this.elementId, spriteOutDuration, this.layer["animation-out"]["style"], spriteOutDelay);
    
    this.timeline
      .to(this.elementId, spriteInDuration, this.layer["animation-in"]["style"], spriteInDelay)

    for (let i = 1; i <= noRows; i++) {
      const topPosition = (-height * i);
      const spriteSpeed = (this.layer["spriteWidth"] / width) / this.layer["framerate"];

      if (i === 1) {
        spriteTimeline
          .to(this.elementId, spriteSpeed, { left: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) }, spriteInDelay)
          .set(this.elementId, { top: topPosition, left: 0 });
      } else {
        spriteTimeline
          .to(this.elementId, spriteSpeed, { left: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) })
          .set(this.elementId, { top: topPosition, left: 0 });
      }
    }

    this.timeline
      .to(this.elementId, spriteOutDuration, this.layer["animation-out"]["style"], spriteOutDelay);
  }
}