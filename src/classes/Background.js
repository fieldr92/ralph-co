import Banner from './Banner';

export default class Background extends Banner {
  constructor(background, width, height, assetPath, timeline) {
    super(background, width, height, assetPath, timeline)
  }

  create() {
    const backgroundId = `#${this.background.match(/[a-z]*/i)}`;
    const backgroundInfo = {
      id: this.background.match(/[a-z0-9_]*/i),
      path: this.assetPath + this.background,
      top: 0,
      left: 0
    }

    if (this.background.match(/[a-z]*?\.png/)) {
      new Image(backgroundInfo);
      this.timeline.to(backgroundId, 0, { opacity: 1 });
    } else if (this.background.match(/#[a-f0-9]{6}/i)) {
      document.getElementById('stage').style.backgroundColor = this.background;
    } else {
      console.log('Background not a image or color code');
    }

    return this;
  }
}