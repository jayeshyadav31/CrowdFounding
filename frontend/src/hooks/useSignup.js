import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignup=()=>{
    const {setAuthUser}=useAuthContext();
    const [loading,setLoading]=useState(false);
    const signup=async({username,email,password,confirmPassword})=>{
        setLoading(true)
        const success = handleInputErrors({ username,email, password, confirmPassword});
		if (!success) return;
        try {
            const res=await fetch('/api/users/signup',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({username,email,password})

            })
            const data=await res.json();
            setAuthUser(data);
            toast.success("SignUp Successfull !!")
        } catch (error) {
            console.log(`error in signing up user ${error.message}`);
            toast.error("error in signing up user")
        }
        finally{
            setLoading(false)
        }
    }
    return {signup,loading}
}
export default useSignup;
function handleInputErrors({ username, email, password, confirmPassword }) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!email || !username || !password || !confirmPassword) {
		toast.error("Please fill in all fields");
		console.log('error');
		return false;
	}

	if (!emailRegex.test(email)) {
		toast.error("Please enter a valid email address");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}