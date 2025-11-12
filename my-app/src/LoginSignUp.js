import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css'; 
import axios from 'axios';


const LoginForm = ({ onToggle }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
        password: '',
        email: ''
    });

  const handleChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = await axios.post('http://localhost:3001/api/login', formData)

    if (res.data.boolean === true) {
      navigate(`/Profile`);
    }
    else{
      alert('Invalid email or password. Please try again.');
    }
  }

  return (
    <>
      <h2 className="app-subheader">Log In</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            className="form-input"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            className="form-input"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Log In</button>
      </form>
      <div className="form-footer">
        <button onClick={onToggle} className="toggle-button">
          Don't have an account? Sign Up
        </button>
      </div>
    </>
  );
};

const SignupForm = ({ onToggle }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axios.post('http://localhost:3001/api/signUp', formData)
            .then(res => alert(res.data.message))
            .catch(err => console.error(err));
    };

  return (
    <>
      <h2 className="app-subheader">Create Account</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="signup-name">Full Name</label>
          <input
            type="text"
            id="signup-name"
            className="form-input"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            className="form-input"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            className="form-input"
            name="password"
            onChange={handleChange}  
            required
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <div className="form-footer">
        <button onClick={onToggle} className="toggle-button">
          Already have an account? Log In
        </button>
      </div>
    </>
  );
};

function LoginSignUp() {
  const [isLoginView, setIsLoginView] = useState(true);
  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="app-container">
      <h3 className="school-title">The Village School</h3>
      <h1 className="app-header">Test Calendar</h1>
      {isLoginView ? (
        <LoginForm onToggle={toggleView} />
      ) : (
        <SignupForm onToggle={toggleView} />
      )}
    </div>
  );
}

export default LoginSignUp;