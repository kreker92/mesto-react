import React from 'react';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  React.useEffect(() => {
    if (currentUser && props.isOpen) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  const handleSubmit = () => {
    props.onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='profile'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_profile-name"
        name="name"
        placeholder="Имя"
        autoComplete="off"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
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
        value={about}
        onChange={(evt) => setAbout(evt.target.value)}
        required
        id="profile-about"
        minLength="2"
        maxLength="200"
      />
      <span className="popup__error profile-about-error"></span>
    </PopupWithForm>
  );
}
