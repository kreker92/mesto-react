import { useEffect, useState } from "react";
import api from "../utils/api";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  useEffect(() => {
    (currentUser?._id !== undefined) && api.getCardList('cards')
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [currentUser?._id])


  const handleCardLike = (curCardId, isCurUserLike) => {
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

  const handleCardDelete = (curCardId) => {
    api.delCard(`cards/${curCardId}`)
      .then(() => {
        setCards(cards.filter(({ _id }) => _id !== curCardId));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  const handleUpdateUser = (userData) => {
    api.setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  const handleUpdateUserAvatar = (avatarData) => {
    api.setUserInfo(avatarData, '/users/me/avatar')
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  const handleAddPlace = (card) => {
    api.addCard('cards', card)
      .then((res) => {
        setCards([
          res,
          ...cards,
        ]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  };

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isTrashConfirmPopupOpen, setIsTrashConfirmPopupOpen] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleRemoveCard = () => setIsTrashConfirmPopupOpen(true);
  const handleShowImage = () => setIsOpenImage(true);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTrashConfirmPopupOpen(false);
    setIsOpenImage(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateUserAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <PopupWithForm
        title='Вы уверены?'
        name='confirm'
        isOpen={isTrashConfirmPopupOpen}
        submitBtnText='Да'
      />
      <ImagePopup
        isOpen={isOpenImage}
        selectedCard={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
