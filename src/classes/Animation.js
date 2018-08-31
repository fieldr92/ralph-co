export default class Animation {
  constructor(layer, animation, frameDelay, width, height, timeline) {
    this.layer = layer;
    this.animation = animation;
    this.frameDelay = frameDelay;
    this.width = width;
    this.height = height;
    this.timeline = timeline;
  }

  styleChange() { 
    this.timeline
      .to(`#${this.layer.src.substr(0, this.layer.src.lastIndexOf('.'))}`, this.animation["duration"], this.animation["style"], `${this.frameDelay + this.animation["delay"]}`);
  }

  playSprite() {
    this.timeline
      .to(`#${this.layer.src.substr(0, this.layer.src.lastIndexOf('.'))}`, 0, { opacity: 1, y: 0 }, this.layer["playDelay"]);
    for (let i = 1; i <= this.layer["noRows"]; i++) {
      const topPosition = i * -this.height;
      this.timeline
        .to(`#${this.layer.src.substr(0, this.layer.src.lastIndexOf('.'))}`, 0, { top: topPosition, x: 0 })
        .to(`#${this.layer.src.substr(0, this.layer.src.lastIndexOf('.'))}`, 1, { x: this.width - this.layer["spriteWidth"], ease:SteppedEase.config(this.layer["countPerRow"] - 1) });
    }
    this.timeline
      .to(`#${this.layer.src.substr(0, this.layer.src.lastIndexOf('.'))}`, 0.5, { opacity: 0 }, this.layer["stopDelay"]);
  }

}