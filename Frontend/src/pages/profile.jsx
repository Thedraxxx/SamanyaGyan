
import { useState } from "react";

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
       
  return (
    <div className="text-white flex items-center justify-center h-screen font-mono">
      <div id="container" className="w-1/2 mx-auto bg-gray-900 rounded-lg p-10 flex flex-col items-center space-y-10">
        <h1 className="text-3xl font-bold tracking-wider">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <div id="buttons" className="flex flex-col items-center space-y-6">
          <input type="text" placeholder="Username" className="w-full p-2 rounded-md border-2 border-gray-700 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          <input type="password" placeholder="Password" className="w-full p-2 rounded-md border-2 border-gray-700 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          {!isLogin && (
            <input type="password" placeholder="Confirm Password" className="w-full p-2 rounded-md border-2 border-gray-700 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          )}
          <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
        {isLogin && (
          <h2 className="text-s hover:text-blue-300 cursor-pointer">forgot password?</h2>
        )}
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={toggleForm} 
            className="text-blue-500 underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Profile;

