import './Header.css';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container-fluid position-relative">
          <div className="row w-100 align-items-center">
            <div className="col text-center">
              <a className="navbar-brand custom-navbar-brand">Rent & Utilities Calculator</a>
            </div>
          </div>
          {/* Link to the developer's Github profile */}
          <a href="https://github.com/BodhiOng" className="text-light custom-developer-link">About the Developer</a>
        </div>
      </nav>
    );
}

export default Header;
