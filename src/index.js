import Banner from './classes/Banner';
import createjs from 'createjs';

import './style.css';

const queue = new createjs.LoadQueue(true);
const jsonPath = `./data/`;
const jsonFile = `data.json`;
let json;
const assetPath = './assets/';
const items = [];
const layers = [];

async function init() {
  try {
    json = await loadJSON(`${jsonPath}${jsonFile}`);
    createItems(json);
    createLayers(json);
    loader(json);
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

const loader = (json) => {
  queue.loadManifest(items);
  queue.on('complete', () => {
    new Banner(json, queue, layers)
    .createElements()
    .animateFrames()
    .start();
  });
}

const createItems = (json) => {
  json.frames.forEach(frame => {
    frame.layers.forEach(layer => {
      if (layer.src.match(/[a-z]*?\.png/)) {
        items.push( { "id": `${layer.src.match(/[a-z0-9_]*/i)}`, "src": assetPath + layer.src } )
      }
    });
  });
}

const createLayers = (json) => {
  json.frames.forEach(frame => {
    frame.layers.forEach(layer => {
      layers.push(layer);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})