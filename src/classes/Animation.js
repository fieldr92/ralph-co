export default class Animation {
  constructor(layer, animation, frameDelay, timeline) {
    this.layer = layer;
    this.animation = animation;
    this.frameDelay = frameDelay;
    this.timeline = timeline;
    this.elementId = `#${this.layer.src.match(/[a-z0-9_]*/i)}`;
  }

  styleChange() {
    this.timeline
      .to(this.elementId, this.animation["duration"], this.animation["style"], `${this.frameDelay + this.animation["delay"]}`);
  }

  playSprite(width, height) {
    const noRows = this.layer["spriteHeight"] / height;

    const spriteInDelay = `${this.frameDelay + this.layer["animation-in"]["delay"]}`;
    const spriteInDuration = this.layer["animation-in"]["duration"];
    
    const spriteOutDelay = `${this.frameDelay + this.layer["animation-out"]["delay"]}`;
    const spriteOutDuration = this.layer["animation-out"]["duration"];

    const spriteTimeline = new TimelineMax();

    spriteTimeline
      .to(this.elementId, spriteInDuration, this.layer["animation-in"]["style"], spriteInDelay);

    for (let i = 1; i <= noRows; i++) {
      const topPosition = -height * i;
      const spriteSpeed = (this.layer["spriteWidth"] / width) / this.layer["framerate"];
      spriteTimeline
        .to(this.elementId, spriteSpeed, { x: width - this.layer["spriteWidth"], ease:SteppedEase.config((this.layer["spriteWidth"] / width) - 1) })
        .set(this.elementId, { top: topPosition, x: 0 });
    }

    spriteTimeline
      .to(this.elementId, spriteOutDuration, this.layer["animation-out"]["style"], spriteOutDelay);
  }
}