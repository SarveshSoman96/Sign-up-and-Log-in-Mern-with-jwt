import { Link , useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LogInInput from "../UI/LogInInput";
import { useState } from "react";
import Wrapper from "../UI/Wrapper";

const logInSchema = yup.object({
  userEmailAddress: yup
  .string()
  .email()
  .required("Email field is required")
  .matches(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  userPassword: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/,
      "Password should 8-15 characters, 1 uppercase, 1 lowercase, 1 number"
    ),
  confirm_password: yup.string().oneOf([yup.ref("userPassword")], "Password does not match")
})

const LogInForm = () => {

  const navigate = useNavigate()
  const [successData, setSuccessData] = useState(null);

  const { register, handleSubmit, formState: {errors} , reset} = useForm({
    resolver: yupResolver(logInSchema)
  })

  const onLogInSubmitHandler = async (data) => {
    
    const userInfo = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const userResponse = await userInfo.json();

    if(userInfo.status === 200){
      setSuccessData(userResponse.message)
      reset()

      setTimeout(() => {
        navigate("/user/welcome")
      }, 3000);
    }

    if(userInfo.status === 409) setSuccessData(userResponse.message)

  };

  return (
    <Wrapper>
    <div className="login_container">
      <div className="graphics_left_side">
        <h2>Get registered first!</h2>
        <Link to="/user/signup">Sign Up</Link>
      </div>
      <form
        className="form_right_side"
        onSubmit={handleSubmit(onLogInSubmitHandler)}
      >
        <LogInInput
          id="confirm_Email"
          label="Email id"
          type="email"
          register={{ ...register("userEmailAddress") }}
          errorMessage={errors.userEmailAddress?.message}
        />
        <LogInInput
          id="password"
          label="Password"
          type="text"
          register={{ ...register("userPassword") }}
          errorMessage={errors.userPassword?.message}
        />
        <LogInInput
          id="confirm_password"
          label="Confirm password"
          type="text"
          register={{ ...register("confirm_password") }}
          errorMessage={errors.confirm_password?.message}
        />
        <button type="submit">Log In</button>
        <br />
        {successData ? (
          <div className='success_container'>
            <p id='successMessage'>
              {successData}
            </p>   
          </div>
        ) : null}
      </form>
    </div>
    </Wrapper>
  );
};

export default LogInForm;
