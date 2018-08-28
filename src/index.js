import data from './data/dataTest';
import LoadElements from './classes/LoadElements';
import Animations from './classes/Animations';

class Banner {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.data = data;
    this.frames = [];
    this.assetPath = "./assets/";
  }

  init() {
    this.stage = new createjs.Stage(document.getElementById('stage'));
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));
    new LoadElements(this.stage, this.width, this.height, this.data)
      .createManifestImages()
      .loadQueue()
      .animator();
  }

  handleTick(event) {    
    this.stage.update();
  }

  buildAnimations() {

  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Banner(data)
  .init();
})