export default class Animation {
  constructor(layer, animation, frameDelay, timeline, elementId) {
    this.layer = layer;
    this.animation = animation;
    this.frameDelay = frameDelay;
    this.timeline = timeline;
    this.elementId = elementId;
  }

  styleChange() {
    this.timeline
      .to(this.elementId, this.animation["duration"], this.animation["style"], `${this.frameDelay + this.animation["delay"]}`);
  }
}