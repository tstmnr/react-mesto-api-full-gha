function PopupWithForm( {name, title, isOpen, onClose, onSubmit, buttonText, children } ) {
  return (
    <section className={`popup popup-${name}} ${isOpen ? 'popup_opened' : '' }`}>
      <div className="popup__container">
        <form className="form popup__form" name={`form-${name}`} onSubmit={onSubmit} >
          <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <h2 className="popup__title popup__title_text-align_center">{title}</h2>
          <div className="form__container">
            {children}
          </div>
          <button className="form__button" type="submit" aria-label="Сохранить">{buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
