import React from "react";
import { Link } from "react-router-dom";

function Register({ onSubmit }) {

  const [changeEmail, setChangeEmail] = React.useState('');
  const [changePassword, setChangePassword] = React.useState('');

  const handleChangeEmail = (e) => {
    setChangeEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setChangePassword(e.target.value);
  }

  const handleSubmit = (e) => {
    onSubmit(e, {
      email: changeEmail,
      password: changePassword,
    });
  }

  return (
    <div className="register container__register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Регистрация</h2>
        <input className="register__input" type="email" name="email" value={changeEmail || ''} onChange={handleChangeEmail} placeholder="Email"/>
        <input className="register__input" type="password" name="password" value={changePassword || ''} onChange={handleChangePassword} placeholder="Пароль"/>
        <button className="register__button" type="submit">Зарегистироваться</button>
      </form>
      <p className="register__caption">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
    </div>
  )
}

export default Register;
