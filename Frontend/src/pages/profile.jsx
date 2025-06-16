import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ProfileMain = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState(null);

  const storeTokens = (accessToken, refreshToken) => {
    const accessExpiry = Date.now() + 5 * 60 * 1000; // 5 mins
    const refreshExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('access_token_expiry', accessExpiry);

    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('refresh_token_expiry', refreshExpiry);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password
      }, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        if (response.data.message === true) {
          storeTokens(response.data.access, response.data.refresh);
          navigate('/');
        } else {
          setMessage(response.data.message);
        }
      })
      .catch(() => {
        setMessage("Login failed. Please try again.");
      });
    } else {
      if (password !== rePassword) {
        setMessage("Passwords do not match");
        return;
      }

      axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        password,
        re_password: rePassword
      }, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        if (response.data.message === true) {
          navigate('/profile');
        } else if (typeof response.data.message === 'string' && response.data.message.includes('username already exists')) {
          setMessage('A user with that username already exists.');
        } else {
          setMessage(response.data.message);
        }
      })
      .catch(() => {
        setMessage("Registration failed. Please try again.");
      });
    }
  };

  const toggleForm = () => {
    setMessage(null);
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8 shadow-lg flex flex-col space-y-8">
        <h1 className="text-3xl font-bold text-white text-center tracking-wide">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-md border-2 border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-md border-2 border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-3 rounded-md border-2 border-gray-700 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-md font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLogin && (
          <button
            onClick={() => alert("Feature coming soon!")}
            className="text-sm text-blue-400 hover:text-blue-600 underline cursor-pointer self-start"
          >
            Forgot password?
          </button>
        )}

        <p className="text-center text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={toggleForm}
            className="text-blue-500 underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

        {message && (
          <p className="text-center text-red-500 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

const Profile = () => <ProfileMain />;

export default Profile;
