import './Header.scss';
import {Link} from 'react-router-dom';

function Header () {


    return (
        <header className="header">
            <div className="header__wrapper">
                <img className="header__logo" src={} alt="header" />
                <nav className="header__nav-container">
                    <Link to="/" className="header__link"> 
                        Login
                    </Link>
                    <Link to="/" className="header__link"> 
                        Register
                    </Link>
                    <Link to="/" className="header__link"> 
                        About Us
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;