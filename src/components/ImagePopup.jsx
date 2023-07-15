import Popup from "./Popup";

export default function ImagePopup({
  selectedCard,
  ...elseProps
}) {
  console.log('elseProps', elseProps);
  return (
    <Popup
      name='slide'
      theme='slide'
      {...elseProps}
    >
      <div className="popup__slide-container">
        <img src={selectedCard.link} alt={selectedCard.name} className="popup__slide-image" />
        <p className="popup__slide-title">{selectedCard.name}</p>
      </div>
    </Popup>
  );
}
