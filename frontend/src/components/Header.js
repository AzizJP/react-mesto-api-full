import { Link, useLocation } from 'react-router-dom';

function Header({ emailVision, isOpen, onHeaderPopup, loggedOut }) {
  const path = useLocation();

  const loggedOutClick = () => {
    localStorage.clear();
    onHeaderPopup();
    loggedOut();
  };

  return path.pathname === '/' ? (
    <div className="header__container">
      <div
        className={`header__email ${isOpen ? 'header__email_type_active' : ''}`}
      >
        <p className="header__email_text">{emailVision}</p>
        <Link
          onClick={loggedOutClick}
          to={'/sign-in'}
          className="header__button_popup"
        >
          Выйти
        </Link>
      </div>
      <header className="header__logged-in">
        <a
          href="https://github.com/AzizJP/react-mesto-api-full"
          className="header__logo"
        >
          {' '}
        </a>
        <button
          onClick={onHeaderPopup}
          className={`header__popup ${
            isOpen ? 'header__popup_type_active' : ''
          }`}
        ></button>
      </header>
    </div>
  ) : (
    <header className="header">
      <a
        href="https://github.com/AzizJP/react-mesto-api-full"
        className="header__logo"
      >
        {' '}
      </a>
      <Link
        onClick={loggedOutClick}
        to={
          path.pathname === '/sign-in'
            ? '/sign-up'
            : path.pathname === '/sign-up'
            ? '/sign-in'
            : '/'
        }
        className="header__button"
      >
        {path.pathname === '/sign-in'
          ? 'Регистрация'
          : path.pathname === '/sign-up'
          ? 'Войти'
          : null}
      </Link>
    </header>
  );
}

export default Header;
