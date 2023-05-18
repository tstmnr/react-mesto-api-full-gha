import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup({ card, isOpen, onClose, onSubmit }) {

  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setButtonText('Да');
  }, [isOpen])

  const handleSubmit = (e) => {
    setButtonText('Удаление...')
    onSubmit(e, card);
  }

  return (
    <PopupWithForm
    name='delete'
    title='Вы уверены?'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonText={buttonText}
    children={<></>}
  />
  );
}

export default DeletePopup;
