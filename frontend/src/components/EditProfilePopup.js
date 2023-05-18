import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup( {isOpen, onClose, onSubmit } ) {

  const currentUser = React.useContext(CurrentUserContext);

  const [changeName, setChangeName] = React.useState(currentUser.name)
  const [changeAbout, setChangeAbout] = React.useState(currentUser.about)
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setChangeName(currentUser.name);
    setChangeAbout(currentUser.about);
    setButtonText('Сохранить');
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setChangeName(e.target.value);
  }

  const handleChangeAbout = (e) => {
    setChangeAbout(e.target.value);
  }

  const handleSubmit = (e) => {
    setButtonText('Сохранение...');
    onSubmit(e, {
      name: changeName,
      about: changeAbout,
    });
  }

  return (
    <PopupWithForm
          name='edit'
          title='Редактировать профиль'
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          buttonText={buttonText}
          children={<>
            <input className="form__input"
              id="name"
              type="text"
              minLength="2"
              maxLength="40"
              value={changeName || ''}
              name="name"
              placeholder="Имя"
              onChange={handleChangeName}
              required/>
            <span id="name-error" className="form__error"></span>
            <input className="form__input"
              id="about"
              type="text"
              minLength="2"
              maxLength="200"
              value={changeAbout || ''}
              name="about"
              placeholder="Коротко о себе"
              onChange={handleChangeAbout}
              required/>
            <span id="about-error" className="form__error"></span>
        </>} />
  );
}

export default EditProfilePopup;
