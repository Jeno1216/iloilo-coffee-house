import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// npm install aos [animate onscroll]
import AOS from 'aos' 
import 'aos/dist/aos.css'

// tilt effect
import VanillaTilt from 'vanilla-tilt';

import axios from 'axios'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    // This code block initializes the VanillaTilt effect on elements with class "element-tilt"
    const elements = document.querySelectorAll('.element-tilt');

    // Adding a delay of 100ms to give the elements more time to render
    const initializeVanillaTilt = () => {
      VanillaTilt.init(elements, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    };

  // Wait for a short delay before initializing VanillaTilt
  const delayTimeout = setTimeout(initializeVanillaTilt, 100);

  // Clean up the timeout when the component unmounts or when the effect re-runs
  return () => clearTimeout(delayTimeout);
}, []); // Make sure this useEffect runs only once after the initial render  
      
  // BACKEND API
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/login', {email, password})
    .then(res => {
      if (res.data === 'Success') { // 'Success' is from the server code
        toast.success('Login Successfully.', {
          position: toast.POSITION.BOTTOM_CENTER // Change position here
        });
        window.location.href = '/'
    }
    else{
      toast.error('User not found.', {
        position: toast.POSITION.BOTTOM_CENTER // Change position here
      });
    }
    })
    .catch(err => console.log(err))
  }

  return (
    <>
    <div className='vh-100 d-flex justify-content-center align-items-center'>
        <div className='container d-flex justify-content-center align-items-center'>
          <div className='row col-12'>

            <div className='col-lg-6 col-12 p-2' >
              <div className='border rounded p-3' style={{backdropFilter: 'blur(10px)'}} data-aos="fade-right">
                <div className='d-flex gap-2'>
                  <p className='text-light m-0' style={{fontWeight: '800', fontSize: '50px', lineHeight: '60px'}} > Sign in </p>
                  <img src="/paw-image.png" alt="paw-image" style={{width: '50px'}} />
                </div>

                <div className=''>
                  <p className='' style={{fontWeight: '200', color: 'white', fontSize: '14px', textAlign: 'start'}}> Enter log in credentials.</p>
                </div>

              <form className=' gap-2 d-flex flex-column' onSubmit={handleSubmit}>
                <div className='px-4 py-2 border rounded d-flex gap-2' >
                    <i className='bi-envelope text-light'> </i>
                    <input type="text" style={{border: 'transparent', background: 'none', outline: 'none', color: 'white'}} placeholder='Email' 
                    onChange={e => setEmail(e.target.value)} />
                </div>

                <div className='px-4 py-2 border rounded d-flex gap-2' >
                    <i className='bi-lock text-light'> </i>
                    <input type="password" style={{border: 'transparent', background: 'none', outline: 'none', color: 'white'}} placeholder='Password' 
                    onChange={e => setPassword(e.target.value)} />
                </div>

                <div className=' d-flex gap-2' >
                    <button className='sign-in px-3 rounded py-1 bg-transparent border m-0 nav-links d-flex text-light text-decoration-none' >Sign in</button>
                </div>

                
                <div className='d-flex'>
                  <p className='' style={{fontWeight: '500', color: 'white', fontSize: '14px', textAlign: 'start'}}> Don't have an account?&nbsp; </p>
                  <Link to="/register" style={{textDecoration: 'underline', fontWeight: '500', color: 'white', fontSize: '14px', textAlign: 'start'}}>  Sign up. </Link>

                </div>

              </form>
              </div>
            </div>
            
            <div className='col-6 d-lg-flex d-none justify-content-center align-items-center'>
              <div className='p-3' data-aos="fade-left">
                <img className='shadow rounded-3 element-tilt' src="/login-image.jpg" style={{width: '100%', objectFit: 'cover'}} alt="" />
              </div>

            </div>

          </div>
        </div>


    </div>
    </>

    )
}

export default Login