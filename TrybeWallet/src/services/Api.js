const fetchCurrency = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const JSON = await response.json();
  return JSON;
};

export default fetchCurrency;
