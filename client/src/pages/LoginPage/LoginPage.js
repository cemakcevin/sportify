import './LoginPage.scss';

import Input from '../../components/Input/Input';

import userIcon from '../../assets/icons/user-icon.png'
import passwordIcon from '../../assets/icons/password-icon.png'

function LoginPage ({taskLogin}) {


    return (
        <main className="login">
            <h1 className="login__header">Welcome to Sportify</h1>
            <form className="login__form" onSubmit={taskLogin}>
                <Input 
                    className="login__input-container"
                    text="USER NAME"
                    type="text"
                    placeholder="Please type your user name..."
                    icon={userIcon}
                    name="userName"
                />
                <Input 
                    className="login__input-container"
                    text="PASSWORD"
                    type="password"
                    placeholder="Please type your password..."
                    icon={passwordIcon}
                    name="password"
                />
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