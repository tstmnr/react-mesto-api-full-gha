import { Link, Routes, Route } from "react-router-dom";

function NavBar({ email, onLogOut }) {
  return (
    <Routes>
      <Route
        exact
        path="/sign-in"
        element={
          <Link to="/sign-up" className="header__register-link">Регистрация</Link>
        }
      />
      <Route
        exact
        path="/sign-up"
        element={
          <Link to="/sign-in" className="header__register-link">Войти</Link>
        }
      />
      <Route
        exact
        path="/"
        element={
          <div className="header__info">
            <p className="header__email">{email}</p>
            <button type="button" className="header__sign-out" onClick={onLogOut}>Выйти</button>
          </div>
        }
      />
    </Routes>
  );
}

export default NavBar;
