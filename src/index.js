import Banner from './classes/Banner';
import createjs from 'createjs';

import './style.css';

const queue = new createjs.LoadQueue(true);
const jsonPath = `./data/`;
const jsonFile = `data.json`;
const assetPath = './assets/';
const items = [];

async function init() {
  try {
    const json = await loadJSON(`${jsonPath}${jsonFile}`);
    json.frames.forEach(frame => {
      frame.layers.forEach(layer => {
        if (layer.src.match(/[a-z]*?\.png/)) {
          items.push( { "id": `${layer.src.match(/[a-z0-9_]*/i)}`, "src": assetPath + layer.src } )
        }
      });
    });
    queue.loadManifest(items);
    queue.on('complete', () => {
      new Banner(json, queue)
      .createElements()
      .animateFrames()
      .start();
    });
  } catch (err) {
    console.log('BUILD', err);
  }
}

const loadJSON = file => {
  return fetch(file)
    .then(res => res.json())
    .catch(err => {
      throw new Error(err)
    });
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})