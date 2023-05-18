import success from '../images/success.svg'
import reject from '../images/reject.svg'

function InfoTooltip( {isSuccess, isOpen, onClose } ) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : '' }`}>
      <div className="popup__container">
        <form className="form popup__form" >
          <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <img
            className="popup__image"
            src={isSuccess ? success : reject}
            alt={isSuccess ? 'Успешная авторизация' : 'Не успешная авторизация'}
          />
          <h2 className="popup__title popup__title_text-align_center">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        </form>
      </div>
    </section>
  );
}

export default InfoTooltip;
