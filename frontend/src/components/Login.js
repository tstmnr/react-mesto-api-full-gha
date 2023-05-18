import React from "react";

function Login({ handleLogin }) {

  const [changeEmail, setChangeEmail] = React.useState('');
  const [changePassword, setChangePassword] = React.useState('');

  const handleChangeEmail = (e) => {
    setChangeEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setChangePassword(e.target.value);
  }

  const handleSubmit = (e) => {
    handleLogin(e, {
      email: changeEmail,
      password: changePassword,
    });
  }

  return (
    <div className="login container__login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input className="login__input" type="email" name="email" value={changeEmail || ''} onChange={handleChangeEmail} placeholder="Email"/>
        <input className="login__input" type="password" name="password" value={changePassword || ''} onChange={handleChangePassword} placeholder="Пароль"/>
        <button className="login__button" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;
