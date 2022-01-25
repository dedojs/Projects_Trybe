/* 4. Implemente a função getRelatedEmployees
Considerando a boa prática de dividir o código em partes menores, apresentamos a função getRelatedEmployees em que você deverá dividí-la em duas funções:

1 - isManager - que será responsável por verificar se uma pessoa colaboradora é gerente ou não. O retorno dessa função deve ser um booleano: true ou false;

2 - getRelatedEmployees - que utiliza a primeira função para apresentar as seguintes saídas:

se for uma pessoa colaboradora gerente, deve retornar um array contendo os nomes das pessoas colaboradoras que ela é responsável;
se não for uma pessoa colaboradora gerente, deverá ser lançado um erro gerado com a função construtora Error da biblioteca padrão do JavaScript com a mensagem "O id inserido não é de uma pessoa colaboradora gerente!". */

const { employees } = require('./data');
const data = require('./data');

const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';

const gerentes = [stephanieId, olaId, burlId]

const malucada = []
function isManager(id) {
  const employees = data.employees
  const managers = employees.map(({managers}) => managers).filter((ids) => ids.includes(id))
  
  //console.log(malucada)
  //console.log(malucada)
  //console.log('managers', managers)
  return managers.length > 0 ? true : false
}
//console.log(isManager('9e7d4524-363c-416a-8759-8aa7e50c0992'))

function getRelatedEmployees(managerId) {
  const nomes = employees.filter((item) => {
    if (item.managers.includes(managerId)) {
      malucada.push(item.firstName)
    }})

if (isManager(managerId) === true) {
    return malucada 
  } throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}  

console.log(getRelatedEmployees('0e7b460e-acf4-4e17-bcb3-ee472265db83'))

module.exports = { isManager, getRelatedEmployees };