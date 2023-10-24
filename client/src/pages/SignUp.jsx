
// import React from 'react';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    console.log(data);
  };
  // console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-centerr font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 ' >
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading ? 'Loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>

=======
import React, {useState} from 'react'
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
import {Link} from "react-router-dom";
import OAuth from "../components/OAuth.jsx";

export default function SignUp() {
  const [formData, setFormData] = useState(
      {
        name:"",
        email: "",
        password: ""
      }
  );
  const {name,email, password} = formData;
  const [showPassword, setShowPassword] = useState(false);

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,

    }))
  }

  return (
      <section>
        <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
        <div
            className={"flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto "}>  {/*// when the width is small img and input form come one over another{cz of flex-wrap}*/}
          <div className={"md:w-[67%] lg:w-[50%] mb-12 md:mb-6"}>
            <img
                src={"https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww"}
                alt="key"
                className={"w=full rounded-2xl"}
            />

          </div>
          <div className={"w-full md:w-[67%] lg:w-[40%]"}>
            <form>
              <input type={"text"} id={"name"} value={name} onChange={onChange}
                     placeholder={"Full name"}
                     className={" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-color-gray-200 rounded transition ease-in-out"}
              />
              <input type={"email"} id={"email"} value={email} onChange={onChange}
                     placeholder={"Email address"}
                     className={" mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-color-gray-200 rounded transition ease-in-out"}
              />
              <div className={"relative mb-6"}>

                <input type={showPassword ? "text" : "password"} id={"password"} value={password}
                       onChange={onChange}
                       placeholder={"password"}
                       className={"w-full px-4 py-2 text-xl text-gray-700 bg-white border-color-gray-200 rounded transition ease-in-out"}

                />
                {showPassword ?
                    (<AiFillEyeInvisible className={"absolute right-3 top-3 text-xl cursor-pointer"}
                                         onClick={() => setShowPassword((prevStage) => !prevStage)}/>)
                    :
                    (<AiFillEye className={"absolute right-3 top-3 text-xl cursor-pointer"}
                                onClick={() => setShowPassword((prevStage) => !prevStage)}/>)
                }
              </div>
              <div className={"flex justify-between whitespace-nowrap text-sm sm:text-lg"}>
                <p className={"mb-6 "}>
                  Have a account? <Link to={"/sign-in"} className={"text-red-500 hover:text-red-700 transition duration-200  ease-in-out ml-1"}>Sign in</Link>
                </p>
                <p>
                  <Link to={"/forgot-password"} className={"text-blue-500 hover:text-blue-800 transition duration-200  ease-in-out ml-1"}>Forgot password?</Link>
                </p>
              </div>
              <button className={"w-full bg-blue-600 text-white px-7 py-3 uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"}

                      type={"button"} >
                Sign up
              </button>
              <div className={"my-4 items-center before:border-t flex before:flex-1 before:border-gray-300" +
                  "my-4 items-center after:border-t flex after:flex-1 after:border-gray-300"}>
                <p className={"text-center font-semibold mx-4 "}>OR</p>
              </div>
              <OAuth />
            </form>


          </div>
        </div>
      </section>

  )
}
