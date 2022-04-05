// Coloque aqui suas actions
import fetchCurrency from '../services/Api';

export const USER = 'USER';
export const WALLET = 'WALLET';
export const EXPENSE = 'EXPENSE';
export const DELETE = 'DELETE';
export const EDIT = 'EDIT';
export const ISEDIT = 'ISEDIT';
export const CURRENCY = 'CURRENCY';
export const ORDER = 'ORDER';

export const actionUser = (email) => ({
  type: USER,
  email,
});

export const actionCurrency = (currencies) => ({
  type: CURRENCY,
  currencies,
});

export const actionWallet = (wallet) => ({
  type: WALLET,
  wallet,
});

export const actionExpense = (expense) => ({
  type: EXPENSE,
  expense,
});

export const actionDeleteExpense = (expense) => ({
  type: DELETE,
  expense,
});

export const actionEditExpense = (id, isEdit) => ({
  type: EDIT,
  id,
  isEdit,
});

export const actionIsEdit = (isEdit) => ({
  type: ISEDIT,
  isEdit,
});

export const actionOrder = (order) => ({
  type: ORDER,
  order,
});

export const actionFetchCurrencies = () => async (dispatch) => {
  const returnJson = await fetchCurrency();
  const currenciesGlobal = Object.keys(returnJson).filter((item) => item !== 'USDT');
  dispatch(actionWallet(returnJson));
  dispatch(actionCurrency(currenciesGlobal));
};
