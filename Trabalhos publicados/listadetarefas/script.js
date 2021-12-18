/* eslint-disable prefer-const */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable eqeqeq */
// const divInput = document.getElementById('input');
// const orderList = document.querySelectorAll('.task');
const textTask = []; // array que guarda as tarefas digitados
const list = document.getElementById('lista-tarefas');
const listTask = document.getElementById('lista-tarefas');
const inputTask = document.getElementById('texto-tarefa');
const inputBtn = document.getElementById('criar-tarefa');
let teste5 = '';
// criar evento para adicionar li na ol

function addTask() {
  const task = document.createElement('li');
  task.className = 'task';
  task.innerText = inputTask.value;
  textTask.push(inputTask.value);
  listTask.appendChild(task);
  inputTask.value = '';
  teste5 = document.querySelectorAll('.task');
  //console.log(teste5.length);
  
}

// Foi criado 3 formas de inserir o texto do input na lista
// metodo click
inputBtn.addEventListener('click', addTask);
inputBtn.addEventListener('click', () => {});
// metodo enter
inputBtn.addEventListener('keydown', (event) => {
  if (event === 13) {
    event.preventDefault();
    document.getElementById('myBtn').click();
  }
});
// metodo keyup
inputBtn.addEventListener('keyup', addTask);

// criar função de selecionar o item
// marcando apenas o item selecionado
function select(element) {
  const listahtml = document.querySelectorAll('.task');
  let alvo = element.target;
  // let a1 = document.querySelector('.selected');
  for (let i = 0; i <= listahtml.length; i += 1) {
    alvo.classList.add('selected');
    listahtml[i].classList.remove('selected');
    if (alvo.classList === 'selected') {
      listahtml[listahtml.length - 1].classList.remove('selected');
    }
  }
  if (alvo === listTask) {
    alvo.style.backgroundColor = 'transparent';
  }
}

listTask.addEventListener('click', select);

// evento que marca a tarefa como concluida
list.addEventListener('dblclick', (element) => {
  // const listahtml = document.querySelectorAll('.task');
  let alvo = element.target;
  alvo.classList.toggle('completed');
  alvo.classList.toggle('teste');
});

// botao de apagar todas as tarefas
let btnDel = document.getElementById('apaga-tudo');
function delet() {
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}

btnDel.addEventListener('click', delet);

// função localizada: https://qastack.com.br/programming/4777077/removing-elements-by-class-name
// função adaptada
// após criarmos a variavel com os elementos da classe, nós percorremos essa variavel, pegando o primeiro elemento dela,
// referenciamos o pai e apagamos.
let btnFinalizados = document.getElementById('remover-finalizados');
function deleteCompleted() {
  let listCompleted = document.querySelectorAll('.completed');
  for (let i = 0; i < listCompleted.length; i += 1) {
    listCompleted[i].parentNode.removeChild(listCompleted[i]);
  }
}
btnFinalizados.addEventListener('click', deleteCompleted);

// botao apagar selecionado
let btnDelSelect = document.getElementById('remover-selecionado');
function deleteselect() {
  let itemSelected = document.querySelector('.selected');
  itemSelected.parentNode.removeChild(itemSelected);
  console.log(itemSelected);
}

btnDelSelect.addEventListener('click', deleteselect);

function taskUp() {
  let item = document.querySelector('.selected');
  if (item === null) {
    alert('ERRO! Selecione um item da lista');
  } else if (item === list.firstChild) {
    alert('O elemento não pode mais ser movido');
  } else if (item.tagName === 'LI') {
    list.insertBefore(item, item.previousSibling);
  } /* else {
    alert('Comando Inválido');
  } */
}

function taskDown() {
  let item = document.querySelector('.selected');
  if (item === null) {
    alert('ERRO! Selecione um item da lista');
  } else if (item === list.lastChild) {
    alert('O elemento não pode mais ser movido');
  } else {
    list.insertBefore(item.nextElementSibling, item);
  }
}

let btnDown = document.getElementById('mover-baixo');
btnDown.addEventListener('click', taskDown);

let btnUp = document.getElementById('mover-cima');
btnUp.addEventListener('click', taskUp);

// ----- Salvar tarefas -----

let btnSave = document.getElementById('salvar-tarefas');
let btnDelStorage = document.getElementById('apagar-memoria');
let tasksSaved = [];
///let tarefas = listTask.innerHTML
function saveTask() {
  let tarefas = listTask.innerHTML
  console.log(tarefas)
  localStorage.setItem('tasks', JSON.stringify(tarefas));
  
}
btnSave.addEventListener('click', saveTask);

function deleteMemory() {
  // localStorage.clear();
  console.log('del');
  localStorage.removeItem('tasks');
  alert('Memória apagada');
}
btnDelStorage.addEventListener('click', deleteMemory);

window.onload = () => {
  // getTask();
  listTask.innerHTML= JSON.parse(localStorage.getItem('tasks' ))
};
