import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignup.css";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Context/AuthContext";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login, register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      const errorMsg = "Email and password cannot be empty";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (isSignup) {
      if (!name.trim() || !phone.trim()) {
        const errorMsg = "Please enter your name and phone number";
        setError(errorMsg);
        toast.error(errorMsg);
        return;
      }

      try {
        const data = await register(name, email, password, phone);
        toast.success("Account created successfully! 🎉");
        window.dispatchEvent(new Event("user-login"));
        navigate("/");
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || "Unable to create account";
        setError(errorMsg);
        toast.error(errorMsg);
      }
      return;
    }

    // Demo Login check
    if (email === "user@gmail.com" && password === "user123") {
      const demo = {
        email,
        name: "Demo User",
        role: "user",
        _id: "demo_12345",
      };
      localStorage.setItem("userInfo", JSON.stringify(demo));
      toast.success("Login successful!");
      window.dispatchEvent(new Event("user-login"));
      navigate("/");
      return;
    }

    try {
      const data = await login(email, password);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Login successful! 🎉");
      window.dispatchEvent(new Event("user-login"));
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid email or password";
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleGoogleLogin = () => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        email: "google.user@gmail.com",
        name: "Google User",
        role: "user",
        _id: "demo_google",
      }),
    );
    toast.success("Logged in with Google! 🎉");
    window.dispatchEvent(new Event("user-login"));
    navigate("/");
  };

  const handleDemoLogin = () => {
    setEmail("user@gmail.com");
    setPassword("user123");
    setError("");
  };

  const toggleMode = () => {
    setIsSignup((prev) => !prev);
    setError("");
  };

  return (
    <div className="loginsignup">
      <motion.div
        className="loginsignup-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1>{isSignup ? "Create an Account" : "Welcome Back"}</h1>
        <p className="loginsignup-subtitle">
          {isSignup
            ? "Start shopping with your new account."
            : "Log in to access your orders, wishlist, and profile."}
        </p>

        {error && (
          <motion.div
            className="loginsignup-error-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="loginsignup-fields">
          {isSignup && (
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {isSignup && (
            <div className="input-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="loginsignup-btn">
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="auth-actions">
          <button type="button" className="secondary-btn" onClick={toggleMode}>
            {isSignup ? "Back to Login" : "Create an Account"}
          </button>
        </div>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="demo-login-text" onClick={handleDemoLogin}>
          Use Demo Login (user@gmail.com)
        </p>
      </motion.div>
    </div>
  );
};

export default LoginSignup;
