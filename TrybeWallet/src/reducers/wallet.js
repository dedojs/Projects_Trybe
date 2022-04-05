// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EXPENSE, WALLET, DELETE, EDIT, ISEDIT, CURRENCY, ORDER } from '../actions';

const initialState = {
  wallet: [],
  currencies: [],
  expenses: [],
  id: '',
  isEdit: false,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      wallet: action.wallet,
    };
  case CURRENCY:
    return {
      ...state,
      currencies: action.currencies,
    };
  case EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE:
    return {
      ...state,
      expenses: action.expense,
    };
  case EDIT:
    return {
      ...state,
      id: action.id,
      isEdit: action.isEdit,
    };
  case ISEDIT:
    return {
      ...state,
      isEdit: action.isEdit,
    };
  case ORDER:
    return {
      ...state,
      expenses: [...state.expenses].sort((a, b) => a.id - b.id),
    };
  default:
    return {
      ...state,
    };
  }
};

export default walletReducer;
