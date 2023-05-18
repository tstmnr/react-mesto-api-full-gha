import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main( {cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete} ) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content container__content">
      <section className="profile">
        <div className="profile__wrapper">
        <div className="profile__avatar-container">
            <div className="profile__avatar" style={{backgroundImage: `url(${currentUser.avatar})`}}>
            </div>
            <button className="profile__avatar-edit-button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
      </section>

      <section className="places content__places">
        <ul className="places__items">
          {
            cards.map(card =>
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
