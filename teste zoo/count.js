const data = require('./data');

function createList(animal) {
    const listQtd = data.species.map((element) => element.residents.length);
    const [lions, tigers, bears, penguins, otters, frogs, snakes, elephants, giraffes] = listQtd;
    const animals = {
      lions,
      tigers,
      bears,
      penguins,
      otters,
      frogs,
      snakes,
      elephants,
      giraffes,
    };
    if (animal === undefined) return animals;
}

//console.log(createList());

function countAnimals(animal) {
    if (animal === undefined) return createList()

    let entrada = animal;
    // const {specie} =
    const listSpecies = data.species.map((element) => element.residents);
  
  }
  
  console.log(countAnimals());
  module.exports = countAnimals;