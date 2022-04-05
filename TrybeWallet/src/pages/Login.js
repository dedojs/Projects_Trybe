import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionUser } from '../actions';
import '../css/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      textEmail: '',
      senha: '',
    };
  }

  handleForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.verifyButton);
  };

  // A função de validar email utilizando regex, foi extraída do endereço: https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
  validarEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  verifyButton = () => {
    const { senha, textEmail } = this.state;
    const validate = this.validarEmail(textEmail);
    const six = 6;
    if (senha.length >= six && validate) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleClick = () => {
    const { userEmail, history } = this.props;
    const { textEmail } = this.state;
    userEmail(textEmail);
    history.push('/carteira');
  }

  render() {
    const { isDisabled, textEmail, senha } = this.state;
    return (
      <div>
        <div className="userContainer">
          <h2>Login</h2>
          <li>
            <input
              name="textEmail"
              type="email"
              placeholder="Email"
              data-testid="email-input"
              onChange={ this.handleForm }
              value={ textEmail }
            />
          </li>
          <li>
            <input
              name="senha"
              type="text"
              placeholder="Senha"
              onChange={ this.handleForm }
              data-testid="password-input"
              value={ senha }
            />
          </li>
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  userEmail: PropTypes.func,
  history: PropTypes.object,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  userEmail: (state) => dispatch(actionUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
