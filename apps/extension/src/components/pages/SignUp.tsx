import { GoogleLogo } from "@phosphor-icons/react";
import "./login.css";

function SignUp() {
  return (
    <div className="AuthDiv">
      <form>
        <div className="formDiv">
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className="formDiv">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div className="formDiv">
          <label htmlFor="confirmPassword">Confirm</label>
          <input type="password" placeholder="Confirm password" />
        </div>
        <button>Sign Up</button>
        <div className="notifier">
          <input type="checkbox" name="signUp" value="sign" />
          <label htmlFor="signUp">
            I agree to Terms of Service and Privacy Policy
          </label>
        </div>
      </form>
      <div className="googleAuth">
        <div className="custom-div">
          <p className="custom-para">or</p>
        </div>
        <button>
          <GoogleLogo size={22} />
          Log In with Google
        </button>
      </div>
    </div>
  );
}

export default SignUp;
