const email = document.getElementById('email');
const senha = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const form = document.getElementById('evaluation-form');
const resume = document.getElementById('resume');

btnLogin.addEventListener('click', (event) => {
  event.preventDefault();
  alert('Bem Vindo Tryber!');
  form.style.display = 'flex';
  email.innerText = '';
  senha.innerText = '';
});

/* andre requisito 18 */
const btnEnviar = document.getElementById('submit-btn');
btnEnviar.disabled = true;
const aceite = document.getElementById('agreement');

aceite.addEventListener('click', () => {
  if (aceite.checked === true) {
    btnEnviar.disabled = false;
  }
});

// Requisito 20:

function counterF() {
  document.getElementById('counter').innerHTML = 500;
  const counter = document.getElementById('counter').innerHTML;
  const textarea = document.getElementById('textarea').value.length;
  document.getElementById('counter').innerHTML = counter - textarea;
}
document.getElementById('textarea').addEventListener('input', counterF);

function hideForm() {
  form.innerHTML = '';
  form.appendChild(resume);
  resume.style.display = 'block';
}
function familia() {
  const family = document.createElement('p');
  const familyValue = document.getElementsByName('family');
  for (let i = 0; i < 3; i += 1) {
    if (familyValue[i].checked === true) {
      family.innerText = `Família: ${familyValue[i].value}`;
    }
  }
  resume.appendChild(family);
}
const subjects = [];
const contentValue = document.getElementsByClassName('content');
function checkSubjects() {
  for (let i = 0; i < 6; i += 1) {
    if (contentValue[i].checked === true) {
      subjects.push(contentValue[i].value);
    }
  }
}
function conteudo() {
  const content = document.createElement('p');
  content.innerText = 'Matérias:';
  for (let i = 0; i < 6; i += 1) {
    if (contentValue[i].checked === true
      && contentValue[i].value !== subjects[subjects.length - 1]) {
      const technologie = contentValue[i].value;
      content.innerText = `${content.innerText} ${technologie},`;
    } else if (contentValue[i].value === subjects[subjects.length - 1]) {
      const technologie = contentValue[i].value;
      content.innerText = `${content.innerText} ${technologie}`;
    }
    resume.appendChild(content);
  }
}
function avaliacao() {
  const rate = document.createElement('p');
  const rateValue = document.getElementsByName('rate');
  for (let i = 0; i < 10; i += 1) {
    if (rateValue[i].checked === true) {
      rate.innerText = `Avaliação: ${rateValue[i].value}`;
    }
  }
  resume.appendChild(rate);
}
function observacoes() {
  const observation = document.createElement('p');
  observation.innerText = `Observações: ${document.getElementById('textarea').value}`;
  resume.appendChild(observation);
}
function imprimirDados(event) {
  event.preventDefault();
  resume.innerHTML = '';
  const name = document.createElement('p');
  name.innerText = document.querySelector('[name=nome]').value;
  const sobrenome = document.createElement('p');
  sobrenome.innerText = `Nome: ${name.innerText} ${document.querySelector('[name=sobre]').value}`;
  resume.appendChild(sobrenome);
  const emailInput = document.createElement('p');
  emailInput.innerText = `Email: ${document.querySelector('[name=emailinput]').value}`;
  resume.appendChild(emailInput);
  const house = document.createElement('p');
  house.innerText = `Casa: ${document.querySelector('#house').value}`;
  resume.appendChild(house);
  familia();
  conteudo();
  avaliacao();
  observacoes();
  hideForm();
}
btnEnviar.addEventListener('click', checkSubjects);
btnEnviar.addEventListener('click', imprimirDados);
