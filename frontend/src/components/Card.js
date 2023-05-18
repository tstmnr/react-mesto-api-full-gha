import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__favourites ${isLiked && 'card__favourities_active'}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img className="card__image" alt={`Картинка ${card.name}`} src={card.link} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__favourites-wrapper">
          <button className={cardLikeButtonClassName} type="button" aria-label="Добавить в избранное" onClick={handleLikeClick} ></button>
          <span className="card__counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button className="card__delete" type="button" aria-label="Удалить место" onClick={handleDeleteClick} ></button>}
    </li>
  );
}

export default Card;

