import React from 'react';
import { FiLogOut } from "react-icons/fi";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
function LogoutButton() {
    const {setAuthUser}=useAuthContext()
    const [loading,setLoading]=useState(false)
    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();

            if (data.error) {
                toast.error("Error in Logging Out !!")
                return;
            }

            localStorage.removeItem("user");
            toast.success("Logged Out Successfully!")
            setAuthUser(null);
        } catch (error) {
            toast.error("Please try later!")
        }
        finally{
            setLoading(false)
        }
    };

    return (
        <button  className={`ml-2 p-2 text-gray-500 hover:bg-gray-300 rounded ${loading ? 'cursor-wait' : ''}`} 
        onClick={handleLogout} 
        disabled={loading}>
            <FiLogOut size={20} />
        </button>
    );
}

export default LogoutButton;