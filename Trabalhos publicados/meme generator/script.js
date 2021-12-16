/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const inputText = document.getElementById('text-input');
/* const btnText = document.getElementById('anexar'); */
const memeContainer = document.getElementById('meme-image-container');
const btnDeleteText = document.getElementById('apagar');
let textContainer = document.getElementById('textContainer');
let text = document.querySelector('#meme-text');
const image = document.getElementsByTagName('img');

function addText() {
  let texto = inputText.value;
  text.innerText = texto;
}

inputText.addEventListener('keyup', addText);
/* inputText.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    inputText.click();
  }
}); */

let file = document.querySelector('#meme-insert');
// função de adicionar imagem //
let img = document.querySelector('#meme-image');
function change(event) {
  let imagem = URL.createObjectURL(event.target.files[0]);
  img.alt = 'imagem de meme';
  img.src = imagem;
  memeContainer.appendChild(img);
}

file.addEventListener('change', change);

let btnFire = document.getElementById('fire');
let btnWater = document.getElementById('water');
let btnEarth = document.getElementById('earth');

btnFire.addEventListener('click', () => {
  memeContainer.style.border = '3px dashed red';
});

btnWater.addEventListener('click', () => {
  memeContainer.style.border = '5px double blue';
});

btnEarth.addEventListener('click', () => {
  memeContainer.style.border = '6px groove green';
});

let memes = document.querySelector('#exemplos');
function selectImage(element) {
  img.src = element.target.src;
}

memes.addEventListener('click', selectImage);
