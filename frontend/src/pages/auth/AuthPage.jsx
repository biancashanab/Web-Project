import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginUser, registerUser, startTransition } from "../../store/auth";
import { User, Lock, Mail } from "lucide-react";

import "./AuthPage.css";

const initialLoginState = {
  email: "",
  password: "",
};

const initialRegisterState = {
  userName: "",
  email: "",
  password: "",
};

function AuthPage() 
{
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginData, setLoginData] = useState(initialLoginState);
  const [registerData, setRegisterData] = useState(initialRegisterState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(loginData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(startTransition());
      } else {
        toast.error(data?.payload?.message || "Login failed");
      }
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(registerData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
        dispatch(startTransition());
        setIsSignUp(false); // Switch back to login view after successful registration
      } else {
        toast.error(data?.payload?.message || "Registration failed");
      }
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleLoginSubmit} className="sign-in-form">
            <h2 className="title">Log In</h2>
            <div className="input-field">
              <User className="icon" size={20} />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
              />
            </div>
            <div className="input-field">
              <Lock className="icon" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
            <button type="submit" className="btn solid">
              Log In
            </button>
          </form>

          <form onSubmit={handleRegisterSubmit} className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <User className="icon" size={20} />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={registerData.userName}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="input-field">
              <Mail className="icon" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={handleRegisterChange}
              />
            </div>
            <div className="input-field">
              <Lock className="icon" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={handleRegisterChange}
              />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Join our loving community and find your perfect furry companion.
              Start your adoption journey today!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </button>
          </div>
          <img src="/img/log.svg" className="image" alt="Login illustration" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Already have an account?</h3>
            <p>
              Welcome back! Log in to continue your pet adoption journey and
              connect with your future companion.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => setIsSignUp(false)}
            >
              Log in
            </button>
          </div>
          <img
            src="/img/register.svg"
            className="image"
            alt="Register illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
