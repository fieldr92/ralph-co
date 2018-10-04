import Banner from './classes/Banner';
import Loader from './classes/Loader';

import './style.css';

// async function init() {
//   const jsonPath = `./data/`;
//   const jsonFile = `data.json`;
//   const json = await loadJSON(`${jsonFolder}${jsonFile}`);
//     new Preloader(data)
//       .pushImagesToItems();
//   new Banner(json)
//     .createElements()
//     .animateFrames()
//     .start();
// }

const init = () => {
  const jsonPath = `./data/`;
  const jsonFile = `data.json`;
  
  loadJSON(`${jsonPath}${jsonFile}`).then(data => {
    new Loader(data)
      .preload();
    new Banner(data)
      .createElements()
      .animateFrames()
      .start();
    }
  );
}

const loadJSON = file => {
  return fetch(file)
  .then(res => res.json())
  .catch(err => console.log(err));
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})