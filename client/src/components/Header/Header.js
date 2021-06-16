import './Header.scss';
import {Link} from 'react-router-dom';

import logoUrl from '../../assets/icons/logo.png'

function Header ({loggedIn}) {



    return (
        <header className="header">
            <div className="header__wrapper">
                <Link className="header__logo-link" to="/">
                    <img className="header__logo" src={logoUrl} alt="header" />
                </Link>
                {!loggedIn ?
                    <nav className="header__nav-container">
                        <Link to="/" className="header__link header__link--highlighted"> 
                            Login
                        </Link>
                        <Link to="/" className="header__link"> 
                            Register
                        </Link>
                        <Link to="/" className="header__link"> 
                            About Us
                        </Link>
                    </nav>
                    :
                    <nav className="header__nav-container">
                        <Link to="/" className="header__link header__link--highlighted"> 
                            My Profile
                        </Link>
                        <Link to="/search" className="header__link"> 
                            Search
                        </Link>
                        <Link to="/" className="header__link"> 
                            About Us
                        </Link>
                    </nav>  
                }
            </div>
        </header>
    )
}

export default Header;