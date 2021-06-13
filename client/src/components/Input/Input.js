import 'Input.scss';

function Input () {

    return (
        <label className="login__input-container">
            <span className="login__input-title">USER NAME</span>
            <input className="login__input" type="text" placeholder="Please type your user name..."/>
            <img className="login__input-icon" src={userIcon} alt="user" />
        </label>
    )
}

export default Input;