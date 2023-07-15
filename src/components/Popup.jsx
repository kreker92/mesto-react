export default function Popup({
  name = '',
  theme = '',
  children,
  isOpen,
  onClose,
}) {
  const popupClass = 'popup';
  const btnCloseClass = 'popup__close';

  // !!! сделать keydown esc закрытие
  const handleClick = (evt) => {
    const isOverlay = evt.target.classList.contains(popupClass);
    const isCloseBtn = evt.target.classList.contains(btnCloseClass);

    if (isOverlay || isCloseBtn || evt.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleClick}
    >
      <div className={`popup__container popup__container_theme_${theme}`}>
        {children}
        <button className="popup__close" type="button" aria-label="Закрыть"></button>
      </div>
    </div>
  );
}
