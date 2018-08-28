import data from './data/dataTest';
import loadElements from './classes/loadElements';

class Banner {
  constructor({data}) {
    this.width = data.width;
    this.height = data.height;
    this.data = data;
    this.frames = [];
    this.manifestImages = [];
    this.assetPath = "./assets/";
  }

  init() {    
    this.stage = new createjs.Stage(document.getElementById('stage'));
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));
    const elements = new loadElements(this.stage, this.width, this.height, this.data);
    elements.createManifestImages();
    elements.loadQueue();
  }

  handleTick(event) {    
    this.stage.update();
  }

}

document.addEventListener('DOMContentLoaded', () => {
  new Banner({width: 300, height: 250, data})
  .init();
})