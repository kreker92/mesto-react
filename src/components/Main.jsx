import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onRemoveCard,
  onShowImage,
  ...props
}) {
  

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={props.currentUser.avatar} alt={props.currentUser.name || ''} />
          <button
            className="profile__avatar-edit"
            aria-label="Редактировать"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__name">{props.currentUser.name}</h1>
            <p className="profile__about">{props.currentUser.description}</p>
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
              currentUserId={props.currentUser.id}
              onLikeClick={props.handleCardLikeClick}
              onImageClick={onShowImage}
              onRemoveCard={onRemoveCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
