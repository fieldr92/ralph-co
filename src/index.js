import Banner from './classes/Banner';
import createjs from 'createjs';

import './style.css';

const queue = new createjs.LoadQueue(true);
const jsonPath = `./data/`;
const jsonFile = `data.json`;
const assetPath = './assets/';
const items = [];
const layers = [];

async function init() {
  try {
    const json = await loadJSON(`${jsonPath}${jsonFile}`);
    pushItems(json);
    pushLayers(json);
    loadBanner(json);
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

const loadBanner = json => {
  queue.loadManifest(items);
  queue.on('complete', () => {
    new Banner(json, queue, layers)
    .createElements()
    .animateFrames()
    .start();
  });
}

const pushItems = json => {
  json.frames.forEach(frame => {
    frame.layers.forEach(layer => {
      if (layer.src.match(/[a-z]*?\.png/)) {
        items.push( { "id": `${layer.src.match(/[a-z0-9_]*/i)}`, "src": assetPath + layer.src } )
      }
    });
  });
}

const pushLayers = json => {
  json.frames.forEach(frame => {
    frame.layers.forEach(layer => {
      layers.push(layer);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})