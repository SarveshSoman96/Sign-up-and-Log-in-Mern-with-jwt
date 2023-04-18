import React from "react";

const InputBlock = ({type, id, label, register, errorMessage}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...register}/>
      <p id="error_msg">{errorMessage}</p>
    </div>
  );
};

export default InputBlock;
