import logoPath from '../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={logoPath} alt="Logo" className="logo" />
    </header>
  );
}
export default Header;
