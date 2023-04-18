import { Link } from "react-router-dom";

const LogInForm = () => {
  return (
    <div className="login_container">
      <div className="graphics_left_side">
        <h2>Get registered first!</h2>
        <Link to="/user/signup">Sign Up</Link>
      </div>
      <form className="form_right_side">
        <div>
          <label htmlFor="confirm_Email">Confirm Email</label>
          <input type="email" name="confirm_Email_id" id="confirm_Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm password</label>
          <input type="text" name="confirm_password" id="confirm_password" />
        </div>
        <button type='submit'>Log In</button>
      </form>
    </div>
  );
};

export default LogInForm;
