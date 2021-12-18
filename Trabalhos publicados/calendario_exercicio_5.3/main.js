const firstLi = document.getElementById('first-li');
const secondLi = document.getElementById('second-li');
const thirdLi = document.getElementById('third-li');
const input = document.getElementById('input');
const myWebpage = document.getElementById('my-spotrybefy');
let list = [firstLi, secondLi, thirdLi]
 /*for(let i = 0; i<list.length; i+=1){
            console.log(list[i])
        }*/



// 1. Copie esse arquivo e edite apenas ele;
// 1.1. Antes de começar os exercícios, use o LiveServer para dar uma olhada em como está a página no navegador.
// 1.2. Note que uma das caixas está um pouco acima das outras. Por que isso ocorre? 
//R = por causa da classe, ela desloca o item

// 2. Crie uma função que adicione a classe 'tech' ao elemento `li` quando for clicado.
firstLi.addEventListener('click',addTech)
secondLi.addEventListener('click',addTech)
thirdLi.addEventListener('click',addTech)

function addTech(evento){
    console.log('clicou aqui')
    let alvo = (evento.target)
    if( alvo.className != 'tech' && alvo == firstLi){
       alvo.className = 'tech'
       alvo.innerText = input.value 
       secondLi.className = ''
       thirdLi.className=''
    } else if(alvo.className != 'tech' && alvo == secondLi ){
        alvo.className = 'tech'
        alvo.innerText = input.value 
       firstLi.className = ''
       thirdLi.className=''
    } else if (alvo.className != 'tech' && alvo == thirdLi){
        alvo.className = 'tech'
        alvo.innerText = input.value
        secondLi.className = ''
        firstLi.className=''
    }
    
    }
// 2.1. Deve existir apenas um elemento com a classe 'tech'. Como você faz isso?
//r = utilizei um if para selecionar o alvo e alterar as outras classes

// 3. Crie uma função que, ao digitar na caixa de texto, altere o texto do elemento
// com a classe 'tech';
firstLi.addEventListener('click',addText)
secondLi.addEventListener('click',addText)
thirdLi.addEventListener('click',addText)

function addText(elemento){
    console.log('clicou aqui')
    let alvo = (elemento.target)
    alvo.innerText = input.value
}


// 4. Crie uma função que, ao clicar duas vezes em 'Meu top 3 do Spotrybefy', ele
// redirecione para alguma página;
// 4.1. Que tal redirecionar para seu portifólio?
myWebpage.addEventListener('dblclick', redirect)
myWebpage.style.cursor = 'pointer'

function redirect(element){
    element.target = window.open('https://dedojs.github.io/', '_blanck')    

}

// 5. Crie uma função que, ao passar o mouse sobre 'Meu top 3 do Spotrybefy', altere
// a cor do mesmo;
myWebpage.addEventListener('mouseover', changeColor)
myWebpage.addEventListener('mouseout', returnColor)

function changeColor(element){
        element.target = myWebpage.style.color = 'yellow'
}
function returnColor(element){
    element.target = myWebpage.style.color = 'white'
}

// Segue abaixo um exemplo do uso de event.target:


function resetText(event) {
  // O Event é passado como um parâmetro para a função.
  event.target.innerText = 'Opção reiniciada';
  // O event possui várias propriedades, porém a mais usada é o event.target,
  // que retorna o objeto que disparou o evento.
}

firstLi.addEventListener('dblclick', resetText);
secondLi.addEventListener('dblclick', resetText);
thirdLi.addEventListener('dblclick', resetText);

// Não precisa passar o parâmetro dentro da callback resetText. O próprio
// navegador fará esse trabalho por você, não é legal? Desse jeito, o
// event.target na nossa função retornará o objeto 'firstLi'.