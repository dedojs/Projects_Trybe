/* 3. Implemente a função getEmployeeByName
Esta função é responsável pela busca das pessoas colaboradoras através do primeiro ou do último nome delas

O que será avaliado

Sem parâmetros, retorna um objeto vazio
Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
Quando provido o último nome do funcionário, retorna o objeto do funcionário */

const data = require('./data');

function getEmployeeByName(name) {
  const employees = data.employees
  const employee = employees.filter(({firstName, lastName}) => firstName === name || lastName === name)
  if(name === undefined) {
    return {}
  } return employee[0]
  
}

console.log(getEmployeeByName())

module.exports = getEmployeeByName;