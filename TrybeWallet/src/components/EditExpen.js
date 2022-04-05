import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionExpense, actionFetchCurrencies, actionIsEdit,
  actionDeleteExpense, actionOrder } from '../actions';

class EditExpen extends React.Component {
  constructor(props) {
    super(props);
    const { idEstado: { id, value, description, currency, method,
      tag, exchangeRates } } = this.props;
    this.state = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
  }

  handleForm = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value });
  }

  saveEditInfo = () => {
    const { walletExpenses, deleteExpense, wallet, isEdit, orderExpense } = this.props;
    const expenseDeleted = wallet.expenses.filter((item) => item !== wallet.id);
    const order = wallet.expenses.map((item) => (item)).sort((a, b) => a - b);
    // console.log('1', wallet.id.id);
    deleteExpense(expenseDeleted);
    walletExpenses(this.state);
    orderExpense(order);
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
              <option key={ index } value={ tipo }>{tipo}</option>
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
          onClick={ this.saveEditInfo }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

EditExpen.propTypes = {
  currencies: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  idEstado: state.wallet.id,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  walletExpenses: (state) => dispatch(actionExpense(state)),
  currenciesGlobal: () => dispatch(actionFetchCurrencies()),
  isEdit: (isedit) => dispatch(actionIsEdit(isedit)),
  deleteExpense: (state) => dispatch(actionDeleteExpense(state)),
  orderExpense: (state) => dispatch(actionOrder(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpen);
