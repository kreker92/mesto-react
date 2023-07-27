import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = () => {
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='card'
      isOpen={props.isOpen}
      onClose={props.closeAllPopups}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Название"
        autoComplete="off"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
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
        value={link}
        onChange={(evt) => setLink(evt.target.value)}
        required
        id="card-image-url"
      />
      <span className="popup__error card-image-url-error"></span>
    </PopupWithForm>
  );
}
