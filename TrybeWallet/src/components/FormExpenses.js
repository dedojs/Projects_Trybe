import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionExpense, actionFetchCurrencies,
  actionDeleteExpense, actionIsEdit } from '../actions';
import fetchCurrency from '../services/Api';

class FormExpenses extends React.Component {
  constructor(props) {
    super(props);
    const { wallet } = this.props;
    const ids = wallet.expenses.map((item) => (item.id));
    const lastId = ids.length;
    this.state = {
      id: lastId,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };
  }

  componentDidMount = async () => {
    await this.getCurrencyFromApi();
    this.verifyEdit();
  }

  getCurrencyFromApi = async () => {
    const { currenciesGlobal } = this.props;
    await currenciesGlobal();

    const { wallet: { wallet } } = this.props;
    this.setState({ exchangeRates: wallet });
  }

  handleForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  refreshRates = async () => {
    const fetch = await fetchCurrency();
    this.setState({ exchangeRates: fetch });
  }

  verifyEdit = () => {
    const { wallet: { isEdit } } = this.props;
    if (isEdit === true) {
      const { idEstado } = this.props;
      this.setState({
        id: idEstado.id,
        value: idEstado.value,
        description: idEstado.description,
        currency: idEstado.currency,
        method: idEstado.method,
        tag: idEstado.tag,
      });
    }
  }

  saveInfo = () => {
    this.refreshRates();
    const { walletExpenses, wallet } = this.props;
    walletExpenses(this.state);
    const ids = wallet.expenses.map((item) => (item.id));
    const lastId = ids.length;
    this.setState(() => ({
      id: lastId + 1,
      value: 0,
      currency: 'USD',
      method: '',
      tag: '',
      description: '',
    }));
  }

  saveEditInfo = () => {
    const { walletExpenses, deleteExpense, wallet, isEdit } = this.props;
    const teste = wallet.expenses.filter((item) => item !== wallet.id);
    deleteExpense(teste);
    walletExpenses(this.state);
    isEdit(false);
  }

  render() {
    const { currencies } = this.props;
    const { currency, description, value, method, tag } = this.state;
    const arrayTipos = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form className="formExpensesContainer">
        <input
          type="number"
          name="value"
          data-testid="value-input"
          onChange={ this.handleForm }
          value={ value }
          placeholder="Valor da despesa"
          min="0.00"
          max="10000000.00"
          step="0.01"
        />
        <input
          type="text"
          name="description"
          data-testid="description-input"
          onChange={ this.handleForm }
          value={ description }
          placeholder="Descrição da despesa"
        />
        <select
          type="text"
          name="method"
          data-testid="method-input"
          onChange={ this.handleForm }
          value={ method }
          placeholder="Método de Pagamento"
        >
          <option>Escolha a forma de pagamento</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          type="text"
          name="tag"
          onChange={ this.handleForm }
          value={ tag }
          placeholder="Tipo de Despesa"
          data-testid="tag-input"
        >
          <option>Escolha o tipo de despesa</option>
          {
            arrayTipos.map((tipo, index) => (
              <option
                key={ index }
                value={ tipo }
              >
                {tipo}
              </option>
            ))
          }
        </select>
        <label htmlFor="coin-select">
          Moeda:
          <select
            data-testid="currency-input"
            id="coin-select"
            name="currency"
            value={ currency }
            onChange={ this.handleForm }
            label="Moeda"
          >
            {
              currencies.map((item, index) => (
                <option key={ index } value={ item }>{item}</option>
              ))
            }
          </select>
        </label>
        <button
          type="button"
          onClick={ this.saveInfo }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormExpenses.propTypes = {
  currencies: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  currencies: state.wallet.currencies,
  idEstado: state.wallet.id,
});

const mapDispatchToProps = (dispatch) => ({
  walletExpenses: (state) => dispatch(actionExpense(state)),
  currenciesGlobal: () => dispatch(actionFetchCurrencies()),
  deleteExpense: (state) => dispatch(actionDeleteExpense(state)),
  isEdit: (isedit) => dispatch(actionIsEdit(isedit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpenses);
