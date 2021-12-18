/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */

/* eslint-disable prefer-const */
const inputText = document.getElementById("text-input");
const btnText = document.getElementById("anexar");
const memeContainer = document.getElementById("meme-image-container");
let textContainer = document.getElementById("textContainer");
const p = document.querySelector("#meme-text");
const image = document.getElementsByTagName("img");
let text = p;

function addText() {
  p.innerText = inputText.value;
  inputText.value = "";
}

btnText.addEventListener("click", addText);
inputText.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    btnText.click();
  }
});

btnText.addEventListener("keyup", addText);

let header = document.getElementsByTagName("header")[0];
let body = document.getElementsByTagName("body")[0];
let selectText = document.getElementById("colorText");
let selectTam = document.getElementById("font");
let selectFamily = document.getElementById("family");
let selectMargin = document.getElementById("margin");
let selectAlign = document.getElementById("align");
let fontColor = "";
let fontSize = "";
let spaceLines = "";
let fontFamily = "";

selectText.addEventListener("change", () => {
  p.style.color = selectText.value;
  localStorage.setItem("fontColor", selectText.value);
});

selectTam.addEventListener("change", () => {
  p.style.fontSize = selectTam.value;
  localStorage.setItem("fontSize", selectTam.value);
});

selectFamily.addEventListener("change", () => {
  p.style.fontFamily = selectFamily.value;
  localStorage.setItem("font-family", selectFamily.value);
});

selectMargin.addEventListener("change", () => {
  text.style.alignItems = selectMargin.value;
  localStorage.setItem("margin", selectMargin.value);
});

selectAlign.addEventListener("change", () => {
  memeContainer.style.justifyContent = selectAlign.value;
  localStorage.setItem("align", selectAlign.value);
});

let file = document.querySelector("#meme-insert");
// função de adicionar imagem //
let img = document.getElementById("meme-image");
function change(event) {
  let imagem = URL.createObjectURL(event.target.files[0]);
  /* console.log(imagem); */
  img.className = "image";
  /* img.id = 'meme-image'; */
  img.alt = "imagem de meme";
  img.src = imagem;
  memeContainer.appendChild(img);
}

file.addEventListener("change", change);

let btnFire = document.getElementById("fire");
let btnWater = document.getElementById("water");
let btnEarth = document.getElementById("earth");

btnFire.addEventListener("click", () => {
  memeContainer.style.border = "15px dashed red";
});

btnWater.addEventListener("click", () => {
  memeContainer.style.border = "15px double blue";
});

btnEarth.addEventListener("click", () => {
  memeContainer.style.border = "15px groove green";
});

let memes = document.querySelector("#exemplos");
function selectImage(element) {
  console.log(element.target)
  img.src = element.target.src;
}

memes.addEventListener("click", selectImage);


