import './Header.scss';
import {NavLink, Link} from 'react-router-dom';

import logoUrl from '../../assets/icons/logo.png'

function Header ({loggedIn, imgUrl, url}) {

    let myProfileActive, searchActive;

    if(url.includes('/home')){
        myProfileActive = "header__link--highlighted";
        searchActive = "";
    }
    else if(url.includes('/search')) {
        myProfileActive = "";
        searchActive = "header__link--highlighted";
    }
    else {
        myProfileActive = "";
        searchActive = "";
    }


    return (
        <header className="header">
            <div className="header__wrapper">
                <Link className="header__logo-link" to="/">
                    <img className="header__logo" src={logoUrl} alt="header" />
                </Link>
                {!loggedIn ?
                    <nav className="header__nav-container">
                        <NavLink to="/" className="header__link header__link--highlighted"> 
                            Login
                        </NavLink>
                        <NavLink to="/" className="header__link"> 
                            Register
                        </NavLink>
                        <NavLink to="/" className="header__link"> 
                            About Us
                        </NavLink>
                    </nav>
                    :
                    <nav className="header__nav-container">
                        <NavLink to="/" className={`header__link ${myProfileActive}`}> 
                            My Profile
                        </NavLink>
                        <NavLink to="/search" className={`header__link ${searchActive}`}> 
                            Search
                        </NavLink>
                        <NavLink to="/" className="header__link"> 
                            <img className="header__avatar" src={imgUrl} alt="avatar" />
                        </NavLink>
                    </nav>  
                }
            </div>
        </header>
    )
}

export default Header;