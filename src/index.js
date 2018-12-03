import Banner from './classes/Banner';
import createjs from 'createjs';

import './style.css';

const queue = new createjs.LoadQueue(true);
let assetPath = null;
const items = [];
const regex = {
  id: /[a-z0-9_-]*/i,
  src: /[a-z0-9_-]*?\.(png|jpg|gif)/,
  hex: /#[a-f0-9]{6}/i
}

async function init() {
  Enabler.setProfileId(10320843);
  var devDynamicContent = {};

  devDynamicContent.Application= [{}];
  devDynamicContent.Application[0]._id = 0;
  devDynamicContent.Application[0].ID = 1;
  devDynamicContent.Application[0].ACTIVE = true;
  devDynamicContent.Application[0].DEFAULT = false;
  devDynamicContent.Application[0].Reporting_Label = "RalphCO_4_EVA";
  devDynamicContent.Application[0].Start_Date = {};
  devDynamicContent.Application[0].Start_Date.RawValue = "2018/11/30 00:00:00";
  devDynamicContent.Application[0].Start_Date.UtcValue = 1543536000000;
  devDynamicContent.Application[0].End_Date = {};
  devDynamicContent.Application[0].End_Date.RawValue = "2018/12/06 23:59:59";
  devDynamicContent.Application[0].End_Date.UtcValue = 1544140799000;
  devDynamicContent.Application[0].JSON_Name = "data1.json";
  devDynamicContent.Application[0].JSON_Path = "https:\/\/s0.2mdn.net\/creatives\/assets\/3058136\/";
  devDynamicContent.Application[0].Assets_300x250 = "https:\/\/s0.2mdn.net\/creatives\/assets\/3058103\/";
  Enabler.setDevDynamicContent(devDynamicContent);

  const jsonPath = dynamicContent.Application[0].JSON_Path;
  const jsonFile = dynamicContent.Application[0].JSON_Name;
  assetPath = dynamicContent.Application[0].Assets_300x250;

  try {
    const json = await loadJSON(`${jsonPath}${jsonFile}`);
    pushItems(json);
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
    new Banner(json, queue, regex)
    .createElements()
    .animateFrames()
    .start();
  });
}

const pushItems = json => {
  json.frames.forEach(frame => {
    frame.layers.forEach(layer => {
      if (layer.src.match(regex.src)) {
        items.push( { "id": `${layer.src.match(regex.id)}`, "src": assetPath + layer.src } )
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, init)
  }
})