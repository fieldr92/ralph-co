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
}