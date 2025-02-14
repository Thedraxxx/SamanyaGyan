import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ProfileMain = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [re_password,setRePassword] = useState('');
  const [message,setMessage] = useState(null);

  const handleUsername = (event) => {setUsername(event.target.value)};
  const handlePassword = (event) => {setPassword(event.target.value)};
  const handleRePassword = (event) => {setRePassword(event.target.value)};

  const storeTokens = (accessToken, refreshToken) => {
      const accessExpiry = Date.now() + 5 * 60 * 1000;
      const refreshExpiry = Date.now() + 24 * 60 * 60 * 1000;

      localStorage.setItem('access_token',accessToken);
      localStorage.setItem('access_token_expiry',accessExpiry);

      localStorage.setItem('refresh_token',refreshToken);
      localStorage.setItem('refresh_token_expiry',refreshExpiry);
  };

  const handleSubmit = (event) => {
      event.preventDefault()
      if (isLogin){
        axios.post('http://127.0.0.1:8000/api/login/',{username:username,password:password},{headers:{"Content-Type":"application/json"}})

        .then(response => {
          setMessage(response.data.message)
          if (response.data.message===true) 
          {
              storeTokens(response.data.access,response.data.refresh);
              navigate('/');
          }
          else {
              setMessage(response.data.message);
          }
      })
      .catch(error => {
          console.error('Error submitting form:',error);
      })
        }

      else{
        // handles form submission
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/register/',{username:username,password:password,re_password:re_password},{headers:{"Content-Type":"application/json"}})
        // axios helps sending post request to the backend api server

        .then(response => {
            console.log('Form submitted successfully',response.data)
            if (response.data.message === true) 
                navigate('/profile')
            else if(response.data.message === `Error:{'username': [ErrorDetail(string='A user with that username already exists.', code='unique')]}`)
            {
                setMessage('A user with that username already exists.')
            }
            else{
                setMessage(response.data.message)
            }
        })
        .catch(error => {
            console.error('Error submitting form:',error)
        })
      }

      
  };

  /* 
        const [UserData,setUserData] = useState([])

        useEffect(() => {
            axios.get('http://127.0.0.1:8000/api/api/',{headers: {'Authorization': `Bearer ${access_token}` } })
            .then(response=>{
                setUserData(response.data)
                Use more logic like using refresh_token for new access_token if expired 
                return to login page if refresh_token is expired
            })
            .catch(error => {
                console.error(`Can't fetch data: `,error)
            })
        },[])
    */
  

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
       
  return (
    <div className="text-white flex items-center justify-center h-screen font-mono">
      <div id="container" className="w-1/2 mx-auto bg-gray-900 rounded-lg p-10 flex flex-col items-center space-y-10">
        <h1 className="text-3xl font-bold tracking-wider">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <form id="buttons" className="flex flex-col items-center space-y-6" onSubmit={handleSubmit}>
          <input type="text" 
          placeholder="Username" 
          className="w-full p-2 rounded-md border-2 border-gray-700 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onChange={handleUsername}
          />
          <input type="password" onChange={handlePassword} placeholder="Password" className="w-full p-2 rounded-md border-2 border-gray-700 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          {!isLogin && (
            <input type="password" onChange={handleRePassword} placeholder="Confirm Password" className="w-full p-2 rounded-md border-2 border-gray-700 pl-3 focus:outline-none focus:ring-2 focus:ring-blue-300"/>
          )}
          <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md" type='submit'>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
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
        <p>{message}</p>
      </div>
    </div>
  );
};


const Profile = () => {
  return <ProfileMain/>
}
export default (Profile);

