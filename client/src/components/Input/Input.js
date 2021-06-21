import './Input.scss';

function Input ({className, text, type, placeholder, icon, value, name, onChange}) {


    if(onChange) {
        return (
            <label className={`${className}  input`}>
                <span className="input__title">{text}</span>
                <input className="input__textfield" name={name} value={value} type={type} placeholder={placeholder} onChange={onChange}/>
                <img className="input__icon" src={icon} alt="user" />
            </label>
        )
    }
    else {
        return (
            <label className={`${className}  input`}>
                <span className="input__title">{text}</span>
                <input className="input__textfield" name={name} type={type} placeholder={placeholder}/>
                <img className="input__icon" src={icon} alt="user" />
            </label>
        )
    }
}

export default Input;