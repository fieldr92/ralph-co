import Banner from './classes/Banner';
import Loader from './classes/Loader';

import './style.css';

async function init() {
  const jsonPath = `./data/`;
  const jsonFile = `data.json`;

  try {
    const json = await loadJSON(`${jsonPath}${jsonFile}`);
    new Loader(json)
      .preload();
    new Banner(json)
      .createElements()
      .animateFrames()
      .start();
  } catch (err) {
    console.log('BUILD ERROR:', err);
  }
}

const loadJSON = file => {
  return fetch(file)
    .then(res => res.json())
    .catch(err => {
      throw new Error('ERROR', err)
    });
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})