import "./login.css";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";

function Login() {
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
        <button>Log In</button>
        <div className="notifier">
          <input type="checkbox" name="login" value="login" />
          <label htmlFor="login">Keep me sign in</label>
        </div>
      </form>
      <p className="forgot">
        Forgot your password ? <span>Reset Password</span>
      </p>
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

export default Login;
