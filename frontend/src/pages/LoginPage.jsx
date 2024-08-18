import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin'
import { FiEye, FiEyeOff } from 'react-icons/fi';
function LoginPage() {
    const {loading,login}=useLogin()
    const [showPassword,setShowPassword]=useState(false)
    const navigate=useNavigate()
    const [inputs,setInputs]=useState({
        username:"",
        password:"",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("i am at handle submit of login page");
        login(inputs)
        navigate('/')
    }
  return (
    <div className='flex flex-col items-center justify-centerv w-48 min-w-96 mx-auto bg-slate-300 font-serif mb-14 '>
        <div className='w-full rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter 
        backdrop-blur-lg bg-opacity-0 border-2 border-gray-400 p-4'>
            <h1 className='text-3xl font-semibold text-center text-gray-500 mb-4 '> 
                Login Card
            </h1>
            <form action="">
                <div className='flex-col'>
                    <label className='label mb-2'>
                        <span className=' text-md label-text '>UserName:</span>
                    </label>
                    <input type='text' name='username' placeholder=' Enter UserName' 
                    className='w-full my-1 pl-2 input input-bordered h-10 border-gray-500 border-2 rounded-md' 
                    onChange={handleChange}/>
                </div>
                <div className='flex flex-col'>
                    <label className='label'>
                        <span className='text-base text-md label-text '>Password:</span>
                    </label>
                    {showPassword==true?<FiEye className="w-6 h-6 absolute top-1/2 transform translate-y-2 right-6"
                    onClick={()=>{setShowPassword(false)}} />:
                    <FiEyeOff className="w-6 h-6 absolute top-1/2 transform translate-y-2 right-6"
                    onClick={()=>{setShowPassword(true)}}/>}
                    <input name={'password'} type={showPassword==true?"text":"password"} placeholder=' Enter Password' 
                    className='w-full mt-1 pl-2 input input-bordered h-10 border-gray-500 border-2 rounded-md'
                     onChange={handleChange} />
                </div>
                <div className='flex justify-between'>
                    <a onClick={()=>{navigate('/signup')}} className='text-sm my-1  hover:underline text-blue-600 mt-2 inline-block cursor-pointer'>
						{"Don't"} have an account?
				    </a>
                </div>
                <div className="flex justify-center items-center">
  {loading ? (
    <button
      type="button"
      className="btn btn-block btn-sm font-bold bg-blue-600 p-3 w-full mb-5 mt-3 rounded-lg flex items-center justify-center"
      disabled
    >
      <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
    </button>
  ) : (
    <button
      className="btn btn-block btn-sm font-bold mt-3 mb-5 bg-blue-600 p-3 w-full rounded-lg"
      onClick={handleSubmit}
    >
      Login
    </button>
  )}
</div>

            </form>
        </div>
    </div>
  )
}

export default LoginPage