import Banner from './classes/Banner';

const jsonFile = `data.json`;

const init = () => {
  loadJSON(jsonFile).then(data => {
    new Banner(data)
      .createBackground()
      .createElements()
      .animateFrames()
      .start();
    }
  );
}

const loadJSON = (file) => {
  return fetch(file)
  .then(res => res.json())
  .catch(err => console.log(err));
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})