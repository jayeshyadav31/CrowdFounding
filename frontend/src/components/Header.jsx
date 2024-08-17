import React from 'react';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();
    const {authUser}=useAuthContext()
    console.log(authUser);
    
    return (
        <div className="rounded-lg p-4 mt-5 mb-10 ml-5 mr-5 border-2 border-gray-400 justify-center text-center font-serif">
            <div className="flex justify-between text-center items-center">
                <Link 
                    to="/" 
                    className="text-md font-bold text-red-700  font-fantasy p-2 cursor-pointer">
                    CrowdFounding
                </Link>
                {authUser &&
                <div className="flex space-x-4 mr-5 font-semibold text-gray-500">
                    {
                        authUser.role=='admin' && <Link to="/create" 
                        className="text-black hover:text-purple-700 p-2 cursor-pointer" >Create Campaign</Link>
                    }
                    <Link
                        to="/about" 
                        className="text-black hover:text-purple-700 p-2 cursor-pointer"
                    >
                        About Us
                    </Link>
                    <a
                        href='/account' 
                        className="text-black hover:text-purple-700  p-2 cursor-pointer"
                    >
                        My Account
                    </a>
                    <LogoutButton />
                </div>
                }
            </div>
        </div>
    );
}

export default Header;