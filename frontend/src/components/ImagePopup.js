function ImagePopup({ card, onClose }) {

  return (
    <section className={`popup popup-image ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <figure className="popup-image__figure">
          <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
          <img className="popup-image__photo" alt={card.name} src={card.link} />
          <p className="popup-image__figcaption">{card.name}</p>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
