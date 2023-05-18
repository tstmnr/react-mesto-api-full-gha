import logo from '../images/logo.svg';
import NavBar from "./NavBar";

function Header({ email, handleLogout }) {
    return (
        <header className="header container__header">
          <div className='header__wrapper'>
            <img className="logo header__logo" src={logo} alt="Логотип страницы сайта Место"/>
            <NavBar email={email} onLogOut={handleLogout} />
          </div>
          <div className="header__line">
          </div>
        </header>
    );
}

export default Header;
