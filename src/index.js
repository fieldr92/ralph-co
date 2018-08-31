import Banner from './classes/Banner';

const loadJSON = callback => {
  const folderName = '../src/data/';
  const fileName = 'data.json';

  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', `${folderName}${fileName}`, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null); 
}

const init = () => {
  loadJSON(response => {
    const actual_JSON = JSON.parse(response);
    new Banner(actual_JSON)
      .createBackground()
      .createElements()
      .animateFrames()
      .start();
  })
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})