import './Input.scss';

function Input ({className, text, type, placeholder, icon, name}) {

    return (
        <label className={`${className}  input`}>
            <span className="input__title">{text}</span>
            <input className="input__textfield" name={name} type={type} placeholder={placeholder}/>
            <img className="input__icon" src={icon} alt="user" />
        </label>
    )
}

export default Input;