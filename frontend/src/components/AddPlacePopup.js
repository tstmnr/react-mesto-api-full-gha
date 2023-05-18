import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup( {isOpen, onClose, onSubmit } ) {

  const [changePlaceName, setChangePlaceName] = React.useState('');
  const [changePlaceLink, setChangePlaceLink] = React.useState('');
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setChangePlaceName('');
    setChangePlaceLink('');
    setButtonText('Cоздать')
  }, [isOpen]);

  const handleChangePlaceName = (e) => {
    setChangePlaceName(e.target.value);
  }

  const handleChangePlaceLink = (e) => {
    setChangePlaceLink(e.target.value);
  }

  const handleSubmit = (e) => {
    setButtonText('Cоздание...')
    onSubmit(e, {
      name: changePlaceName,
      link: changePlaceLink,
    });
  }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      children={<>
        <input className="form__input"
          id="place-name"
          type="text"
          minLength="2"
          maxLength="30"
          value={changePlaceName}
          name="place-name"
          placeholder="Название"
          onChange={handleChangePlaceName}
          required/>
        <span id="place-name-error" className="form__error"></span>
        <input className="form__input"
          id="link"
          type="url"
          value={changePlaceLink}
          name="place-link"
          placeholder="Ссылка на картинку"
          onChange={handleChangePlaceLink}
          required/>
        <span id="link-error" className="form__error"></span>
    </>} />)
}

export default AddPlacePopup;
