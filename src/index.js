import Banner from './classes/Banner';
import Background from './classes/Background';
import './style.css';

const jsonFile = `./data/data.json`;

const init = () => {
  loadJSON(jsonFile).then(data => {
    new Background(data)
      .create();
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