import { useEffect, useState } from "react";
import api from "../utils/api";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userId, setUserId] = useState();
  const [cards, setCards] = useState([]);

  const setUserInfo = (data) => {
    const { name, about, avatar } = data;
    setUserName(name);
    setUserDescription(about);
    setUserAvatar(avatar);
  }

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserId(res._id);
        setUserInfo(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  useEffect(() => {
    (userId !== undefined) && api.getInitialCards('cards')
      .then((initialCards) => {
        initialCards.reverse();
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [userId])

  const handleCardLikeClick = (curCardId, isCurUserLike) => {
    api.setLike(`cards/${curCardId}/likes`, isCurUserLike)
      .then((res) => {
        setCards(cards.map(card => {
          if (card._id === curCardId) {
            return res;
          }

          return card;
        }));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  const [isOpenPopupAvaterEdit, setIsOpenPopupAvaterEdit] = useState(false);
  const [isOpenPopupProfile, setIsOpenPopupProfile] = useState(false);
  const [isOpenPopupCard, setIsOpenPopupCard] = useState(false);
  const [isTrashConfirm, setIsTrashConfirm] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => setIsOpenPopupAvaterEdit(true);
  const handleEditProfileClick = () => setIsOpenPopupProfile(true);
  const handleAddPlaceClick = () => setIsOpenPopupCard(true);
  const handleRemoveCard = () => setIsTrashConfirm(true);
  const handleShowImage = () => setIsOpenImage(true);

  const closeAllPopups = () => {
    setIsOpenPopupAvaterEdit(false);
    setIsOpenPopupProfile(false);
    setIsOpenPopupCard(false);
    setIsTrashConfirm(false);
    setIsOpenImage(false);
    setSelectedCard(null);
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onRemoveCard={handleRemoveCard}
          onShowImage={(props) => {
            setSelectedCard(props);
            handleShowImage();
          }}
          currentUser={{
            name: userName,
            description: userDescription,
            avatar: userAvatar,
            id: userId,
          }}
          cards={cards}
          handleCardLikeClick={handleCardLikeClick}
        />
        <Footer />
      </div>
      <PopupWithForm
        title='Редактировать профиль'
        name='profile'
        isOpen={isOpenPopupProfile}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          className="popup__input popup__input_type_profile-name"
          name="name"
          placeholder="Имя"
          autoComplete="off"
          defaultValue={userName}
          required
          id="profile-name"
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error profile-name-error"></span>
        <input
          type="text"
          className="popup__input popup__input_type_profile-about"
          name="about"
          placeholder="Профессия"
          autoComplete="off"
          defaultValue={userDescription}
          required
          id="profile-about"
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error profile-about-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title='Обновить аватар'
        name='avatar-edit'
        isOpen={isOpenPopupAvaterEdit}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          className="popup__input popup__input_type_profile-avatar"
          name="avatar"
          autoComplete="off"
          defaultValue=""
          required
          id="profile-avatar"
        />
        <span className="popup__error profile-avatar-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title='Новое место'
        name='card'
        isOpen={isOpenPopupCard}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          className="popup__input popup__input_type_card-name"
          name="name"
          placeholder="Название"
          autoComplete="off"
          defaultValue=""
          required
          minLength="2"
          maxLength="30"
          id="card-name"
        />
        <span className="popup__error card-name-error"></span>
        <input
          type="url"
          className="popup__input popup__input_type_card-image-url"
          name="link"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          defaultValue=""
          required
          id="card-image-url"
        />
        <span className="popup__error card-image-url-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title='Вы уверены?'
        name='confirm'
        isOpen={isTrashConfirm}
        submitBtnText='Да'
      />
      <ImagePopup
        isOpen={isOpenImage}
        selectedCard={selectedCard}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
