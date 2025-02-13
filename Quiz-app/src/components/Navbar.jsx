import { Link } from "react-router-dom";

const Navbar = ()=>{
    return (
        <nav className="bg-black text-white flex h-12 w-screen justify-between px-12 items-center m-0 border-b-1 border-white">
                  <h2 className="text-3xl hover:text-sky-400 cursor-pointer transition-all duration-300 hover:scale-110">Quiz</h2>
                  <ul className="flex justify-evenly space-x-10 text-lg">
                    <li><Link to="/" className="tet hover:underline hover:text-sky-500">Home</Link></li>
                     <li><Link to="/Score-Board" className="tet hover:underline hover:text-sky-500">Score-Board</Link></li>
                    <li><Link to="/about" className="tet hover:underline hover:text-sky-500">Rules</Link></li>
                    <li><Link to="/profile" className="hover:underline hover:text-sky-500">signIn</Link></li>
                  </ul>
        </nav>
    )
}
export default Navbar;