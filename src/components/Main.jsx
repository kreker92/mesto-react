import React from "react";
// import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onRemoveCard,
  onShowImage,
  ...props
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile" aria-label="Профиль">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser?.avatar} alt={currentUser?.name || ''} />
          <button
            className="profile__avatar-edit"
            aria-label="Редактировать"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <p className="profile__about">{currentUser?.description}</p>
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
              onLikeClick={props.onCardLike}
              onTrashClick={props.onCardDelete}
              onImageClick={onShowImage}
              onRemoveCard={onRemoveCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
