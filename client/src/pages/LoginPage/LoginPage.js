import './LoginPage.scss';

import userIcon from '../../assets/icons/user-icon.png'
import passwordIcon from '../../assets/icons/password-icon.png'

function LoginPage () {


    return (
        <main className="login">
            <h1 className="login__header">Welcome to Sportify</h1>
            <form className="login__form">
                <label className="login__input-container">
                    <span className="login__input-title">USER NAME</span>
                    <input className="login__input" type="text" placeholder="Please type your user name..."/>
                    <img className="login__input-icon" src={userIcon} alt="user" />
                </label>
                <label className="login__input-container">
                    <span className="login__input-title">PASSWORD</span>
                    <input className="login__input" type="text" placeholder="Please type your password..."/>
                    <img className="login__input-icon" src={passwordIcon} alt="user" />
                </label>
                <button className="login__button" type="password">LOGIN</button>
                <div className="login__message-container">
                    <p className="login__message">Don't have an account yet?</p>
                    <p className="login__message login__message--blue">Register now!</p>
                </div>
            </form>

        </main>
    )
}

export default LoginPage;