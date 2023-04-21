import React from 'react'

const LogInInput = ({id, label, type, register, errorMessage}) => {
  return (
    <div className="login_inputs">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...register}/>
      <p id="error_msg_login">{errorMessage}</p>
    </div>
  );
}

export default LogInInput;