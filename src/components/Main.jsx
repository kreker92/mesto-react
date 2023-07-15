import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onShowImage,
  onRemoveCard,
  setSelectedCard,
  ...props
}) {
  

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={props.userAvatar} alt={props.userName || ''} />
          <button
            className="profile__avatar-edit"
            aria-label="Редактировать"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__name">{props.userName}</h1>
            <p className="profile__about">{props.userDescription}</p>
          </div>
          <button
            className="profile__edit"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          />
        </div>
        <button
          className="profile__add"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        >+</button>
      </section>
      <section className="cards" aria-label="Элементы">
        <ul className="cards__list">
          {props.cards?.map((card) => (
            <Card
              key={card._id}
              {...card}
              currentUserId={props.userId}
              onLikeClick={props.handleCardLikeClick}
              onImageClick={onShowImage}
              onRemoveCard={onRemoveCard}
              setSelectedCard={setSelectedCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
