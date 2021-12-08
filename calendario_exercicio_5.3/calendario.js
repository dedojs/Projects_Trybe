const botao = document.createElement("button");
const botaoSextaFeira = document.createElement("button");
const btnContainer = document.querySelector(".buttons-container");
const daysMonth = document.getElementById("days");
const myTasks = document.querySelector(".my-tasks");
const taskList = document.querySelector('.task-list')

function createDaysOfTheWeek() {
  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const weekDaysList = document.querySelector(".week-days");

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement("li");
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  }
}

createDaysOfTheWeek();

1; /*Exercício 1:
O array dezDaysList contém os dois últimos dias de novembro e os dias do mês de dezembro. Desenvolva uma função que crie dinamicamente cada dia do calendário e os adicione como filhos/filhas da tag <ul> com ID "days" . Note que os dias 29 e 30 de novembro estão no array pois representam respectivamente Domingo e Segunda-feira.*/

function createDateDays() {
  const dezDaysList = [
    29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  //a= Os dias devem estar contidos em uma tag <li> , e todos devem ter a classe day . Ex: <li class="day">3</li>
  for (let i = 0; i < dezDaysList.length; i += 1) {
    const dm = dezDaysList[i];
    const dmItem = document.createElement("li");
    dmItem.innerHTML = dm;
    dmItem.className = "day";
    daysMonth.appendChild(dmItem);

    //b= Os dias 24, 25 e 31 são feriados e, além da classe day , devem conter também a classe holiday . Ex: <li class="day holiday">24</li>
    if (dm == 24 || dm == 25 || dm == 31) {
      dmItem.classList.add("holiday");
    }

    //c= Os dias 4, 11, 18 e 25 são Sexta-feira. Eles devem conter a classe day e a classe friday . Ex: <li class="day friday">4</li>
    if (dm == 4 || dm == 11 || dm == 18 || dm == 25) {
      dmItem.classList.add("friday");
    }
  }
}

createDateDays();

/* Exercício 2:
Implemente uma função que receba como parâmetro a string "Feriados" e crie dinamicamente um botão com o nome "Feriados".
Adicione a este botão a ID "btn-holiday" .
Adicione este botão como filho/filha da tag <div> com classe "buttons-container" */

function holydays(string) {
  //console.log(botao)
  botao.innerText = "Feriados";
  //a Adicione a este botão a ID "btn-holiday"
  botao.id = "btn-holiday";
  //const btnContainer = document.querySelector('.buttons-container')
  //b Adicione este botão como filho/filha da tag <div> com classe "buttons-container"
  btnContainer.appendChild(botao);
  //console.log(btnContainer)
}

holydays("feriados");
const feriados = document.querySelectorAll(".holiday");

/* 3 Implemente uma função que adicione ao botão "Feriados" um evento de "click" que muda a cor de fundo dos dias que possuem a classe "holiday" .
É interessante que este botão possua também a lógica inversa. Ao ser clicado novamente ele retorna à configuração inicial com a cor "rgb(238,238,238)" */

let count = 0;
function changeColor() {
  botao.addEventListener("click", function () {
    count += 1;
    for (let i = 0; i < feriados.length; i += 1) {
      feriados[i].style.backgroundColor = "green";
      feriados[i].style.color = "white";

      console.log(count);
      if (count % 2 == 1) {
        feriados[i].style.backgroundColor = "green";
        feriados[i].style.color = "white";
      } else {
        feriados[i].style.backgroundColor = "rgb(238,238,238)";
        feriados[i].style.color = "grey";
      }
    }
  });
}

changeColor();

/* 4 Implemente uma função que receba como parâmetro a string "Sexta-feira" e crie dinamicamente um botão com o nome "Sexta-feira".
Adicione a este botão o ID "btn-friday" .
Adicione este botão como filho/filha da tag <div> com classe "buttons-container" .*/

function fryday(string) {
  botaoSextaFeira.innerText = "Sexta-Feria";
  botaoSextaFeira.id = "btn-friday";
  btnContainer.appendChild(botaoSextaFeira);
}

fryday("Sexta-feira");

/*5 Implemente uma função que adicione ao botão "Sexta-feira" um evento de "click" que modifica o texto exibido nos dias que são Sexta-feira.
É interessante que este botão possua também a lógica inversa. Ao ser clicado novamente ele retorna à configuração inicial exibindo os dias.*/

let count2 = 0;
const fridays = document.querySelectorAll(".friday");

function changeName(element) {
  botaoSextaFeira.addEventListener("click", function () {
    count2 += 1;
    for (let i = 0; i < fridays.length; i += 1) {
      if (count2 % 2 == 1) {
        fridays[i].innerText = "Sexta-feira";
      } else if (fridays[i].innerText == "Sexta-feira") {
        fridays[0].innerText = "4";
        fridays[1].innerText = "11";
        fridays[2].innerText = "18";
        fridays[3].innerText = "25";
      }
    }
  });
}

changeName();

/*6 Implemente duas funções que criem um efeito de "zoom". Ao passar o ponteiro do mouse em um dia do mês no calendário, o texto desse dia deve aumentar e, quando o ponteiro do mouse sair do dia, o texto deve retornar ao tamanho original.
Dica - Propriedade: event.target . */

let dezDays = document.getElementById("days");

let teste = document.getElementsByClassName("day").item;

for (let i in teste) {
  console.log(teste);
  teste.addEventListener("mouseover", zoomIn);
}

dezDays.addEventListener("mouseover", zoomIn);

dezDays.addEventListener("mouseout", zoomOut);

function zoomIn(element) {
  element.target.style.fontSize = "30px";
}

function zoomOut(element) {
  element.target.style.fontSize = "20px";
}

/*7 Implemente uma função que adiciona uma tarefa personalizada ao calendário. A função deve receber como parâmetro a string com o nome da tarefa (ex: "cozinhar") e criar dinamicamente um elemento com a tag <span> contendo a tarefa.
O elemento criado deverá ser adicionado como filho/filha da tag <div> que possui a classe "my-tasks" .*/

function tasks(string) {
  let taskItem = document.createElement("span");
  taskItem.innerHTML = string;
  myTasks.appendChild(taskItem);
}

tasks("Estudar");

/*8 Implemente uma função que adiciona uma legenda com cor para a tarefa criada no exercício anterior. Esta função deverá receber como parâmetro uma string ("cor") e criar dinamicamente um elemento de tag <div> com a classe task .
O parâmetro cor deverá ser utilizado como cor de fundo da <div> criada.
O elemento criado deverá ser adicionado como filho/filha da tag <div> que possui a classe "my-tasks" .*/

function captions(color) {
  let descItem = document.createElement("div");
  descItem.className = "task";
  descItem.id = "taskDiv";
  descItem.style.backgroundColor = color;
  myTasks.appendChild(descItem);
}

captions("green");


/*9 Implemente uma função que adiciona um evento que, ao clicar no elemento com a tag <div> referente a cor da sua tarefa, atribua a este elemento a classe task selected , ou seja, quando sua tarefa possuir a classe task selected , ela estará selecionada.
Ao clicar novamente no elemento, a sua classe deverá voltar a ser somente task , ou seja, esta tarefa está deixando de ser uma tarefa selecionada. */

let divItem = document.getElementById("taskDiv");
function select() {
  
  divItem.addEventListener("click", function (element) {
    if (divItem.className == "task") {
      element.target.className = "task selected";
    } else if (divItem.className == "task selected") {
      element.target.className = "task";
    }
  });
}

select();

/*10 Implemente uma função que adiciona um evento que, ao clicar em um dia do mês no calendário, atribua a este dia a cor da legenda da sua tarefa selecionada.
Ao clicar novamente no dia com a cor da legenda, a sua cor deverá voltar à configuração inicial rgb(119,119,119) .*/

function insertTask() {

  let count3 = 0;
  dezDays.addEventListener("click", function (element) {

  //------------------------------------------  
  let color = ''

  if(divItem.className === 'task selected'){
    color=divItem.style.backgroundColor
  }else if(divItem.className ==='task'){
    color='rgb(119,119,119)' 
  }
  //--------------------------------

    let alvo = element.target;
    console.log(color)
    console.log(divItem.className, ' + ', divItem.style.backgroundColor)
    count3 += 1;
    //alvo.style.color=color
    console.log(alvo);
    console.log(count3);
    alvo.style.color = color;

  });
}

function dayTask(element) {
  element.target.style.color = "rgb(119,119,119)";
}

insertTask();

/* 11 Vamos adicionar compromissos ao seu calendário? Implemente uma função que, ao digitar um compromisso na caixa de texto "COMPROMISSOS", adiciona o item à lista "MEUS COMPROMISSOS" ao clicar no botão "ADICIONAR".
Se nenhum caractere for inserido no campo input , a função deve retornar um alert com uma mensagem de erro ao clicar em "ADICIONAR".
Ao pressionar a tecla "enter" o evento também deverá ser disparado.
Dica - Propriedade: key .*/

const inputTexto = document.querySelector('#task-input')
const btnAdd = document.querySelector('#btn-add')

btnAdd.addEventListener('click',writeTask)

btnAdd.addEventListener('keyup',writeTask)


function writeTask(event){
  
  let texto = inputTexto.value
  if(inputTexto.value == ''){
    alert('Campo Vazio! Digite sua Tarefa')
  }
  let task = document.createElement('li')
  task.className = 'task-list-item'
  task.innerHTML = texto
  taskList.appendChild(task)


}

