const InitialLoadingPopup = ({ isOpen }) => {
  return (
    <div>
      <aside id="loading-popup" className={`popup__initial-loading`}></aside>
      <h1 className="popup__text-loading">Загрузка</h1>
    </div>
  );
};

export default InitialLoadingPopup;
