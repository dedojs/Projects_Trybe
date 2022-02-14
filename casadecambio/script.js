const list = document.getElementById('currency-list');
const button = document.getElementById('search-button');
const input = document.getElementById('currency-input');
const p = document.getElementById('date')
const v = document.getElementById('base')
let coin;

const handleRates = ({rates}) => {
   
    const ratesEntries = Object.entries(rates)
    ratesEntries.forEach(([currency, rates]) =>{
        createList(currency, rates)
    })
}

const fetchCurrency = async (coin) => {
    const result = await fetch(`https://api.exchangerate.host/latest?base=${coin}`);
    const data = await result.json();
    p.innerHTML = `Data: <b>${data.date}</b>`
    v.innerHTML = `Valores referentes a 1 ${data.base}`
    handleRates(data)
};

const createList = (currency, rates) => {
    const lines = document.createElement('li')
    lines.className = 'list'
    lines.innerHTML = `<b>${currency}:</b> ${(rates).toFixed(2)}`
    list.appendChild(lines)
}

const clearList = () => {
    list.innerHTML = '';
}

button.addEventListener('click', () => {
    coin = input.value.toUpperCase()
    clearList()
    fetchCurrency(coin)
});

