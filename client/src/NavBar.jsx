import React, { useState, useEffect, useContext } from 'react'
import './style.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'; // Import the Bootstrap Icons CSS
// npm install aos [animate onscroll]
import AOS from 'aos' 
import 'aos/dist/aos.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from './App'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NavBar() {

    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

    const toggleMobileNav = () => {
      setIsMobileNavVisible(!isMobileNavVisible);
    };

    useEffect(() => {
      window.onscroll = function() {
        var navbar = document.getElementById('navbar');
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        } else {
          navbar.style.backgroundColor = 'transparent';
        }
      };
    }, []);

    useEffect(() =>{
      AOS.init({duration: 2000});
    }, []);
  

  // BACKEND API
  const user = useContext(userContext)
  const navigate = useNavigate()
  
  const handleLogout = () => {
    axios.get('http://localhost:3001/logout')
    .then(res => {
      if (res.data === 'Success'){
        toast.success('Logout Successfully.', {
          position: toast.POSITION.BOTTOM_CENTER // Change position here
        });
        navigate('/login');
        window.location.reload();
      }
    }).catch(err => console.log(err));
  }

  return (
    <>
    <div id='navbar' className='nav-container d-flex justify-content-between align-items-center position-fixed w-100 '
    style={{height: '100px', zIndex: '999'}}>
        <div className='m-3' data-aos="fade-right">
            <h1 className='logo p-1 m-0 text-light' style={{  fontWeight: '900'}}>ICH</h1>
        </div>

        <div className='gap-5 m-3 d-lg-flex d-md-flex d-none'>
            <div className='p-1' data-aos="fade-down" >
              <Link to='/' className='m-0 nav-links text-light text-decoration-none' >Home</Link>
            </div>

            <div className=' p-1' data-aos="fade-down" data-aos-delay="200">
                <Link to='/products' className='m-0 nav-links text-light text-decoration-none' >Products</Link>
            </div>

            <div className=' p-1' data-aos="fade-down" data-aos-delay="200">
              <Link to='/profile' className='m-0 nav-links text-light text-decoration-none'> Reviews </Link>
            </div>

            <div className=' p-1' data-aos="fade-down" data-aos-delay="200">
              <Link to='/people' className='m-0 nav-links text-light text-decoration-none'> People </Link>
            </div>



            <div className=' p-1  text-center p-2'>
              <Link to='/createproducts' className='m-0 nav-links text-light text-decoration-none'>Add Products </Link>
            </div>

        </div>


        { // if user is logged in, show logout instead of sign in and sign up
        user.username ? // This is a conditional check that evaluates whether the username property of the user object (which comes from the userContext) exists and is truthy. If the user is logged in, this condition will be true.
          
        <div className=' d-flex gap-5 m-3 '>
        <div className=' d-flex gap-2' data-aos="fade-left" data-aos-delay="400" >
          <input className='bg-transparent px-3 rounded py-1 border m-0 nav-links d-lg-flex d-md-flex d-none text-light text-decoration-none' style={{ backdropFilter: 'blur(10px)' }}  type="button" onClick={handleLogout} value='Logout' />
          <p className='m-0 d-lg-none d-md-none d-flex  text-light' onClick={toggleMobileNav}> <span className='bi bi-list fs-2'></span>  </p>
        </div>
        </div>
          : // Else
        <div className=' d-flex gap-5 m-3 '>
        <div className=' d-flex gap-2' data-aos="fade-left" data-aos-delay="400" >
          <Link to="/login" className='sign-in px-3 rounded py-1 border m-0 nav-links d-lg-flex d-md-flex d-none text-light text-decoration-none' style={{ backdropFilter: 'blur(10px)' }}>Sign in</Link>
          <Link to="/register" className='sign-in px-3 rounded py-1 border m-0 nav-links d-lg-flex d-md-flex d-none text-light text-decoration-none' style={{ backdropFilter: 'blur(10px)' }}>Sign up</Link>
          <p className='m-0 d-lg-none d-md-none d-flex  text-light' onClick={toggleMobileNav}> <span className='bi bi-list fs-2'></span>  </p>
        </div>
        </div>
        }

    </div>


          {/* Render the mobile navigation container based on isMobileNavVisible */}
          {isMobileNavVisible && (
            <div style={{zIndex: '999'}} className='d-flex position-fixed justify-content-center align-items-center w-100 p-3'>
        <div className=' p-5 w-100 mobile-nav-container border shadow d-flex justify-content-center align-items-center rounded-3' style={{backdropFilter: 'blur(20px)'}} >
            <div className=' flex-column  mobile-nav w-100'>

            <div className=' m-3  text-center' style={{fontWeight: '900'}} >
            <h1 className='logo p-1 m-0 text-black' style={{  fontWeight: '900'}}>ICH</h1>
        </div>

            <div className='p-1  text-center p-2 '>
                <Link to='/' className='m-0 text-decoration-none text-light'>Home</Link>
            </div>

            <div className=' p-1  text-center p-2'>
              <Link Link to='/products' className='m-0 text-decoration-none text-light'>Products</Link>
            </div>

            <div className=' p-1  text-center p-2'>
              <Link Link to='/profile' className='m-0 text-decoration-none text-light'>Reviews</Link>
            </div>

            <div className=' p-1  text-center p-2'>
              <Link Link to='/people' className='m-0 text-decoration-none text-light'>People</Link>
            </div>

            { // if user is logged in, show logout instead of sign in and sign up
            user.username ? // This is a conditional check that evaluates whether the username property of the user object (which comes from the userContext) exists and is truthy. If the user is logged in, this condition will be true.
              <div className='text-center p-2 d-flex justify-content-center gap-2'>
                <input className='bg-transparent px-3 rounded py-1 border m-0 nav-links text-light fw-bolder text-decoration-none' type="button" onClick={handleLogout} value='Logout' />
              </div>
              :
              <div className='text-center p-2 d-flex justify-content-center gap-2'>
                <Link to="/login" className='text-decoration-none px-3 rounded py-1 m-0 text-black border fw-bolder'>Sign in</Link>
                <Link to="/register" className='text-decoration-none px-3 rounded border py-1 m-0 text-light fw-bolder'>Sign up</Link>
              </div>

              
            }



            <div className=' p-1 text-center p-2' >
                <p className='m-0 bi bi-x fs-1 text-light' onClick={toggleMobileNav}></p>
            </div>

        </div>
        </div>
        </div>

      )}



    </>
  )
}

export default NavBar
