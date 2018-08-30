import LoadElements from './LoadElements';
import Image from './Image';

export default class Banner {
  constructor(data) {
    this.width = data.width;
    this.height = data.height;
    this.data = data;
    // this.frames = [];
    this.elementIds = [];
    this.assetPath = "./assets/";
    this.timeline = new TimelineLite({ paused: true });
  }

  createIds() {
    if (this.data.background) {
      this.elementIds.push('#' + this.data.background.substr(0, this.data.background.lastIndexOf('.')));
    }
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        this.elementIds.push('#' + layer.src.substr(0, layer.src.lastIndexOf('.')));
      })
    })
    return this; 
  }

  createElements() {
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        const top = layer.top;
        const left = layer.left;
        const id = layer.src.substr(0, layer.src.lastIndexOf('.'));
        const path = this.assetPath + layer.src;
        const elementType = 'img';
        new Image(id, path, elementType, top, left);
      })
    })
    return this;
  }

  animateFrames() {
    this.data.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        // let delayIn = layer['animation-in']['delay'];
        // let durationIn = layer['animation-in']['duration'];
        // let delayOut = layer['animation-out']['delay'];
        // let durationOut = layer['animation-out']['duration'];

        // Way DCO 3.0 works... each layer has an animations array in which you input the animations you want (therefore can be more than just in and out)

        layer.animations.forEach(animation => {
          this.timeline
            .to(`#${layer.src.substr(0, layer.src.lastIndexOf('.'))}`, animation["duration"], animation["type"], `${animation["delay"]}`);
        })

        // switch (layer["animation-in"]["type"]) {
        //   case 'fade':
        //     this.timeline
        //       .to(`#${layer.src.substr(0, layer.src.lastIndexOf('.'))}`, durationIn, { opacity: 1 }, `+=${delayIn}`);
        //     break;
        //   default: console.log(`Animation-in type "${layer['animation-in']['type']}" not recognised.`);
        //     break;
        // }

        // switch (layer["animation-out"]["type"]) {
        //   case 'fade':
        //     this.timeline
        //       .to(`#${layer.src.substr(0, layer.src.lastIndexOf('.'))}`, durationOut, { opacity: 0 }, `+=${delayOut}`);
        //     break;
        //   default: console.log(`Animation-in type "${layer['animation-in']['type']}" not recognised.`);
        //     break;
        // }

      })
    })
    return this;
  }

  start() {
    this.timeline.play();
  }

}