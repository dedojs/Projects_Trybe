import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { user, expenses } = this.props;
    const arrayTotal = expenses.map((item) => (
      item.value * item.exchangeRates[`${item.currency}`].ask
    )).reduce((total, value) => total + value, 0).toFixed(2);
    return (
      <div className="headerContainer">
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{`Email: ${user.email}`}</p>
        <p data-testid="total-field">
          { arrayTotal }
        </p>
        <p data-testid="header-currency-field"> BRL</p>
        <Link to="/"><p>Sair</p></Link>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string,
  expenses: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
