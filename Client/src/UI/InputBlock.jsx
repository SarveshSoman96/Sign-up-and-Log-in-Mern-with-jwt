import React from "react";

const InputBlock = ({type, id, label, register, errorMessage}) => {
  return (
    <div className="Input_group">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...register}/>
      <p id="error_msg">{errorMessage}</p>
    </div>
  );
};

export default InputBlock;
