function iniciar() {
  gerar_cor();
}
window.addEventListener('load', iniciar);

//variaveis
const line = document.getElementById('pixel-board');
const board = document.querySelectorAll('.pixel');
const pallet = document.getElementById('color-palette');
let display = document.querySelectorAll('colors')
criarBoard(8);
//função criada baseada na fonte: site wallacemaxters.com.br
//Função gera os numeros rgb de forma aleatoria, e utiliza um parseInt para pegar um numero inteiro entre 0 e 255, sendo que o valor informado como parâmetro da função é a opacidade da cor.
function gerar_cor(opacidade = 1) {
  let r = parseInt(Math.random() * 255);
  let g = parseInt(Math.random() * 255);
  let b = parseInt(Math.random() * 255);

  return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
}

let list = [p2, p3, p4, p5, p6, p7, p8, p9,p15,p16]
// Cor dos quadrados gerado aleatoriamente
function colors(element) {
  for(let i = 0; i<list.length; i+=1){
    list[i].style.backgroundColor = gerar_cor(1)
  }
  let p1 = document.getElementById('p1');
  p1.style.backgroundColor = 'rgb(0,0,0)';
  p1.classList.add('selected');

  let p10 = document.getElementById('p10');
  p10.style.backgroundColor = 'rgb(255,255,255)';

  let p11 = document.getElementById('p11');
  p11.style.backgroundColor = 'yellow';

  let p12 = document.getElementById('p12');
  p12.style.backgroundColor = 'blue';
  
  let p13 = document.getElementById('p13');
  p13.style.backgroundColor = 'red';

  let p14 = document.getElementById('p14');
  p14.style.backgroundColor = 'green';

}
  
colors();
//cor do titulo sendo gerada aleatoriamente
//let title = (document.getElementById('title').style.color = gerar_cor(1));

//input, pegando a quantidade de quadrados
let numero;
const quantidade = document.getElementById('board-size');
function getNumber() {
  numero = parseInt(quantidade.value);
  console.log('numero=', numero);
  if (quantidade.value < 1 || quantidade.value === NaN) {
    alert('/Board inválido!/');
  } else if (quantidade.value < 5) {
    criarBoard(5);
  } else if (quantidade.value > 50) {
    criarBoard(50);
  } else {
    criarBoard(numero);
  }
}

//botões
//botao gerar quadrados
let botao = document.getElementById('generate-board');
botao.addEventListener('click', getNumber);

//botao apagar quadrados
function deletar() {
  var list = document.getElementById('pixel-board');
  while (list.hasChildNodes()) {
    line.removeChild(line.firstChild);
  }
}

//função para resetar cores
function resetar() {
  deletar();
  criarBoard(8);
  line.style.backgroundColor = 'white';
  
}

// criar quadrado
function criarQuadrado(num) {
  let square = document.createElement('li');
  square.className = 'pixel';
  square.style.backgroundColor = 'rgb(255,255,255)';
  line.appendChild(square);
  return square;
}

//cria a caixa com todos os quadrados
function criarBoard(numero) {
  deletar();
  let n = numero * numero;
  let tamanho = numero * 43 + 5 + 'px';
  document.getElementById('pixel-board').style.maxWidth = tamanho;
  document.getElementById('pixel-board').style.maxHeight = tamanho;
  console.log('h',document.getElementById('pixel-board').style.maxHeight = tamanho)
  console.log('w',document.getElementById('pixel-board').style.maxWidth);

  for (let i = n; i > 0; i -= 1) {
    criarQuadrado();
  }
}

// identificando quadrados
function clicaPixel(element) {
  let alvo = element.target;
  alvo.style.backgroundColor = cor;
  console.log(alvo);
}
//evento de click para pintar
line.addEventListener('click', clicaPixel);
//cor inicial
let cor = 'black';

//evento onde seleciona e cor e pinta o pixel 
function pegaCor(element) {
  let colors = document.querySelectorAll('.color')
  cor = element.target.style.backgroundColor;
  let alvo = element.target;
  for(let i = 0; i<colors.length; i+=1){
    //console.log(colors[i])
    colors[i].classList.remove('selected', 'target')
    element.target.classList.add('selected', 'target')
  }
}



pallet.value = 'black';
localStorage.setItem('pallet-color', pallet.value);

pallet.addEventListener('click', pegaCor);
