import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const { name, link, likes, _id, owner } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const isCurUserLikesCard = likes.some(user => user._id === currentUser._id);

  const handleLikeClick = () => {
    props.onLikeClick(_id, isCurUserLikesCard);
  };

  const handleImageClick = (evt) => {
    evt.preventDefault();
    props.onImageClick(props);
  };

  const handleTrashClick = () => {
    props.onTrashClick(_id);
  };
  
  return (
    <li className="cards__card">
      <a
        className="cards__image-link"
        href={link}
        onClick={handleImageClick}
      >
        <img src={link} alt={name} className="cards__image" />
      </a>
      <div className="cards__info">
        <h2 className="cards__name">{name}</h2>
        <div className="cards__like-wrapper">
          <button
            className={
              `cards__like ${isCurUserLikesCard ? 'cards__like_active' : ''}`
            }
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <p className="cards__like-count">{likes?.length || ''}</p>
        </div>
      </div>
      {(currentUser._id === owner?._id) && (
        <button
          className="cards__trash"
          aria-label="Удалить"
          onClick={handleTrashClick}
          />
      )}
    </li>
  );
};
