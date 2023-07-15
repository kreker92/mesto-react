import Popup from './Popup';

export default function PopupWithForm({
  title,
  name,
  onSubmit,
  children,
  ...elseProps
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(evt);
    onSubmit && onSubmit(evt);
  };

  return (
    <Popup
      name={name}
      theme='form'
      {...elseProps}
    >
      <h2 className="popup__title">{title}</h2>
      <form
        className="popup__form"
        name={name}
        noValidate
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </Popup>
  );
}