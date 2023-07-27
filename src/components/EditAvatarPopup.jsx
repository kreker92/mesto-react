import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  const inputRef = React.useRef('');

  const handleSubmit = () => {
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar-edit'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_type_profile-avatar"
        name="avatar"
        autoComplete="off"
        defaultValue=""
        ref={inputRef}
        required
        id="profile-avatar"
      />
      <span className="popup__error profile-avatar-error"></span>
    </PopupWithForm>
  );
}
