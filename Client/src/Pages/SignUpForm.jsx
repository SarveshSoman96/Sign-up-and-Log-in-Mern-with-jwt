import { Link, useNavigate } from "react-router-dom";
import InputBlock from "../UI/InputBlock";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Wrapper from "../UI/Wrapper";

const formSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  Occupation: yup.string().required("Occupation is required"),
  phone: yup
    .string()
    .min(10)
    .max(10)
    .required()
    .matches(/^[7-9][0-9]{9}$/),
  userEmailAddress: yup
    .string()
    .email()
    .required("Email field is required")
    .matches(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  // userPassword: yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/),
  userPassword: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/,
      "Password should 8-15 characters, 1 uppercase, 1 lowercase, 1 number"
    ),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("userPassword")], "Password does not match"),
});

const SignUpForm = () => {
  const [successData, setSuccessData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const signUpFormSubmit = async (data) => {
    const userData = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const userResponse = await userData.json();

    if (userData.status === 200) {
      setSuccessData(userResponse.message);
      reset();
    }
    if (userData.status === 409) setSuccessData(userResponse.message);
  };

  return (
    <Wrapper>
      <div className="sign_up_container">
        <form
          className="form_left_side"
          onSubmit={handleSubmit(signUpFormSubmit)}
        >
          <InputBlock
            type="text"
            id="FName"
            label="First Name"
            register={{ ...register("firstName") }}
            errorMessage={errors.firstName?.message}
          />
          <InputBlock
            type="text"
            id="LName"
            label="Last Name"
            register={{ ...register("lastName") }}
            errorMessage={errors.lastName?.message}
          />
          <InputBlock
            type="text"
            id="occupation"
            label="Occupation"
            register={{ ...register("Occupation") }}
            errorMessage={errors.Occupation?.message}
          />
          <InputBlock
            type="number"
            id="number"
            label="Phone Number"
            register={{ ...register("phone") }}
            errorMessage={
              errors.phone?.message ? "Phone number should be valid" : null
            }
          />
          <InputBlock
            type="email"
            id="email_id"
            label="Email Id"
            register={{ ...register("userEmailAddress") }}
            errorMessage={
              errors.userEmailAddress?.message
                ? "Email id should be valid"
                : null
            }
          />
          <InputBlock
            type="password"
            id="password"
            label="Password"
            register={{ ...register("userPassword") }}
            errorMessage={errors.userPassword?.message}
          />
          <InputBlock
            type="password"
            id="confirm_password"
            label="Confirm Password"
            register={{ ...register("confirmPass") }}
            errorMessage={errors.confirmPass?.message}
          />
          <button type="submit">Sign Up</button>
          <br />
          {successData ? (
            <div className="success_container">
              <p id="successMessage">{successData}</p>
            </div>
          ) : null}
        </form>
        <div className="graphics_right_side">
          <h2>Already Registered</h2>
          <Link to="/user/login">LogIn</Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignUpForm;
