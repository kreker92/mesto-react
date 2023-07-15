export default function Card(props) {
  const { name, link, likes, _id, owner } = props;
  const { currentUserId } = props;

  const doesCurUserLikesCard = () => {
    return likes.some(user => user._id === currentUserId);
  };

  const handleLikeClick = () => {
    props.onLikeClick(_id, doesCurUserLikesCard());
  };

  const handleImageClick = (evt) => {
    evt.preventDefault();
    props.setSelectedCard(props);
    props.onImageClick();
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
              `cards__like ${doesCurUserLikesCard() ? 'cards__like_active' : ''}`
            }
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <p className="cards__like-count">{likes?.length || ''}</p>
        </div>
      </div>
      {(currentUserId === owner?._id) && (
        <button className="cards__trash" aria-label="Удалить" />
      )}
    </li>
  );
};
