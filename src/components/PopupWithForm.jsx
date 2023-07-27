import Popup from './Popup';

export default function PopupWithForm({
  title,
  name,
  onSubmit,
  children,
  submitBtnText = 'Сохранить',
  ...restProps
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(evt);
  };

  return (
    <Popup
      name={name}
      theme='form'
      {...restProps}
    >
      <h2 className="popup__title">{title}</h2>
      <form
        className="popup__form"
        name={name}
        noValidate
        onSubmit={handleSubmit}
      >
        {children}
        <button className="popup__button" type="submit">{submitBtnText}</button>
      </form>
    </Popup>
  );
}