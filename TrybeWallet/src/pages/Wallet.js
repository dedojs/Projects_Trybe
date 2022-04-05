import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import FormExpenses from '../components/FormExpenses';
import { actionDeleteExpense, actionFetchCurrencies,
  actionEditExpense } from '../actions';
import EditExpen from '../components/EditExpen';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  delExpense = ({ target }) => {
    const { walletDespesas, deleteExpense } = this.props;
    const expenses = walletDespesas.filter((item) => item.id !== Number(target.value));
    deleteExpense(expenses);
  }

  editExpense = ({ target }) => {
    const { walletDespesas, editActionExpense } = this.props;
    const editExpense = walletDespesas.filter((item) => item.id === Number(target.value));
    editActionExpense(editExpense[0], true);
  }

  render() {
    const { walletDespesas } = this.props;
    const NUMBER = 1000;
    const { wallet: { isEdit } } = this.props;
    return (
      <div className="wallet">
        <Header />
        <div>
          {isEdit ? (
            <EditExpen />
          ) : (
            <FormExpenses />
          )}
        </div>
        <hr />
        <h3>Despesas</h3>
        <table className="formResult">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {walletDespesas
              ? (walletDespesas.map((item) => (
                <tr id={ item.id } key={ Math.floor((Math.random() * NUMBER) + 1) }>
                  <td>{ item.description }</td>
                  <td>{ item.tag }</td>
                  <td>{ item.method }</td>
                  <td>{ (item.value * 1.00).toFixed(2) }</td>
                  <td>
                    {
                      item.exchangeRates[item.currency].name
                    }
                  </td>
                  <td>
                    {
                      (item.exchangeRates[`${item.currency}`].ask * 1.00).toFixed(2)
                    }
                  </td>
                  <td>
                    {
                      (item.value * item.exchangeRates[`${item.currency}`]
                        .ask).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td className="formBtnContainer">
                    <button
                      value={ item.id }
                      type="button"
                      onClick={ this.editExpense }
                      data-testid="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      value={ item.id }
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.delExpense }
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))
              ) : <p>Seja Bem vindo</p> }
          </tbody>
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  currenciesGlobal: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (state) => dispatch(actionDeleteExpense(state)),
  currenciesGlobal: () => dispatch(actionFetchCurrencies()),
  editActionExpense: (state, is) => dispatch(actionEditExpense(state, is)),
});

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  walletDespesas: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
