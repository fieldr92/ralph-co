import LoadElements from './LoadElements';

export default class Banner {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.data = data;
    this.frames = [];
    this.assetPath = "./assets/";
  }

  createStage() {
    this.stage = new createjs.Stage(document.getElementById('stage'));
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));
    new LoadElements(this.stage, this.width, this.height, this.data)
      .createManifestImages()
      .loadQueue();
  }

  handleTick(event) {    
    this.stage.update();
  }
}