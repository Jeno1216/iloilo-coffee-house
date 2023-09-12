import React, { useState, useEffect } from 'react';

// ScrollLink [npm install react-scroll, clicking it will redirect to a section with specified id]
import { Link as ScrollLink } from 'react-scroll';

// npm install aos [animate onscroll]
import AOS from 'aos' 
import 'aos/dist/aos.css'

// tilt effect
import VanillaTilt from 'vanilla-tilt';

import axios from 'axios'
import { Link } from 'react-router-dom';

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

    // Backend Fetch API
    const [posts, setPosts] = useState([])

    useEffect(() =>{
      console.log('Home useEffect is being triggered'); // Add this line
  
      axios.get('https://iloilo-coffee-house-api.vercel.app/fetchproducts')
      .then(posts => {
          setPosts(posts.data)
        })
      .catch(err => console.error(err))
    }, [])


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
    }, [posts]); // Add data as a dependency to ensure that useEffect re-runs whenever data changes
  
  return (
  <>

{/** Landing Section */}
  <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
    <div className='container d-flex justify-content-center p-0'>
      <div className='row col-12 d-flex justify-content-center '>
      <div className='col-lg-7 col-md-7 col-12 d-flex justify-content-center align-items-center'>
          <div className='p-3' data-aos="fade-right">
            <p className='text-light mb-0' style={{fontWeight: '500'}} > Start your day with coffee. </p>
            <p className='text-light m-0' style={{fontWeight: '800', fontSize: '60px', lineHeight: '60px'}} > Iloilo Coffee House</p>
            <div className='d-flex  gap-3'>
              <p className='text-light ' style={{fontWeight: '200', fontSize: '14px'}} > Mon-Fri: 8am to 2pm </p>
              <p className='text-light ' style={{fontWeight: '300', fontSize: '14px'}} > Sat-Sun: 11am to 4pm </p>
            </div>
            <ScrollLink to="pet-friendly-section" smooth={true} duration={0} offset={-100}> 
            <button className='explore-button text-black px-3 py-1 border rounded-5' style={{fontWeight: '800'}} > Explore. </button>
            </ScrollLink>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-delay="500" className='col-5 d-lg-flex d-md-flex justify-content-center align-items-center d-none'>
          <div className='p-3'>
            <img className='element-tilt' src="/home-coffee.png" alt="" style={{width: '100%'}} />
          </div>
        </div>
      </div>
    </div>
  </div>                

{/** Pet Friendly Section */}
<div id='pet-friendly-section' className='m-0 py-5'>
  <div className='container d-flex justify-content-center'>
    <div className='col-12 row'>
      <div data-aos="fade-right" className='col-lg-6 col-md-6 col-12 order-lg-1 order-md-1 order-2  p-3 d-flex justify-content-center align-items-lg-center align-items-md-center align-items-start'  >
        <div className=' p-3 ' style={{height: '80%', width: '100%'}}>
          <img className='element-tilt shadow' src="https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/363851914_706875608119073_3137684126634953658_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=49d041&_nc_eui2=AeGYTa8p66mbjGZMMsdQl_8iYVxLxBfTzPVhXEvEF9PM9cBm0P_s2x9frL_zPWwp5SWmt5g9UIe86LAiTNuD8xcn&_nc_ohc=FdjbMHuD_7sAX-jrCmT&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&_nc_e2o=f&oh=00_AfDvIGFA3p12QZ67ePgJlULoydLkFZcclJaeaGI8Xc1SmA&oe=64F9E7A2" 
          alt="dog-image" style={{width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover'}} />
          <p className='text-center mt-2 d-lg-none d-md-none d-sm-none d-block' style={{color: 'black', fontSize: '14px', opacity: '.7'}}>[tilt your phone]</p>
        </div>
      </div>
      <div data-aos="fade-up" className='col-lg-6 col-md-6 col-12 order-lg-2 order-md-2 order-1  p-3 d-flex justify-content-center align-items-center'>
        <div className=' p-3' >
          <p className=' m-0' style={{color: '#b68834', fontWeight: '300', textTransform: 'uppercase', fontSize: '14px'}}>Did you know that Iloilo Coffee House is a pet-friendly cafe?</p>
          <p className=' m-0 mb-3' style={{fontWeight: '600', fontSize: '35px', lineHeight: '40px'}}>Welcoming Your Four-Legged Companion </p>
          <p className='' style={{color: 'black', fontWeight: '600', fontSize: '14px'}}>Just a reminder to be mindful of your pooch so that you won't disturb other customers.</p>
          <p className='' style={{color: 'black', fontWeight: '300', fontSize: '14px', opacity: '.7'}}>Enjoy an iced cold beverage with your man's bestfriend with us!</p>
          <img src="/paw-image.png" alt="paw-image" style={{width: '50px'}} />
        </div>
      </div>
    </div>
  </div>
  <br />
</div>

{/** Kind Of Coffee */}
<div id='expectation' className='p-lg-5 p-md-5 p-2 d-flex justify-content-center align-items-center'>
  <div data-aos="fade-up" className='container p-3 d-flex justify-content-center flex-column align-items-center border rounded-2 mt-5 mb-5 shadow' style={{backdropFilter: 'blur(3px)'}}>
    <div className='mb-3'>
      <p style={{fontWeight: '700', color: 'white', fontSize: '40px', textAlign: 'center', margin: '0'}}> What kind of Coffee we serve for you</p>
      <p style={{fontWeight: '300', color: 'white', fontSize: '14px', textAlign: 'center'}}> Enjoy our products by visiting us on Villa.</p>
    </div>

    <div className='row col-12 mb-5'>
      <div className='col-lg-6 col-md-6 col-12 p-3'>
        <div className='d-flex flex-column '>
          <div className='' style={{width: '100px'}}>
            <img className='element-tilt' src="/in-the-menu-coffee.png" alt="placeholder" style={{width: '100%'}} />
          </div>
          <div className='d-flex gap-4 align-items-center mb-3'>
            <p className='m-0' style={{fontWeight: '900', color: 'white', fontSize: '20px', textAlign: 'start'}}> In-the-menu </p>
            <div className='gap-1 d-flex'>
              <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
              <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
              <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
              <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
              <i className='bi-star-fill' style={{ color: 'white', fontSize: '15px', textAlign: 'start'}}></i>
            </div>
          </div>

          <div className=''>
            <p className='m-0' style={{fontWeight: '400', color: 'white', fontSize: '14px', textAlign: 'start'}}>Indulge in the perfect cup of coffee that matches your caffeine threshold, satisfying your cravings while staying within your limit.</p>
          </div>
        </div>
      </div>

      <div className='col-lg-6 col-md-6 col-12 p-3'>
        <div className='d-flex flex-column'>
          <div className='' style={{width: '100px'}}>
            <img className='element-tilt' src="/out-the-menu-coffee.png" alt="placeholder" style={{width: '100%'}} />
          </div>
          <div className='d-flex gap-4 align-items-center mb-3'>
            <p className='m-0' style={{fontWeight: '900', color: 'white', fontSize: '20px', textAlign: 'start'}}>Out-the-menu</p>
            <div className='gap-1 d-flex'>
              <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
              <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
              <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
              <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
              <i className='bi-star-fill' style={{ color: 'white', fontSize: '15px', textAlign: 'start'}}></i>
            </div>
          </div>

          <div className=''>
            <p className='m-0' style={{fontWeight: '400', color: 'white', fontSize: '14px', textAlign: 'start'}}>Currently craving something that isn't available on the menu? WE CUSTOMIZE! Just tell the barista on the counter that you want to customize your drink and we will guide you through it. Enjoy a coffee that fits your lifestyle.</p>
          </div>
        </div>
      </div>

    </div>

    <div className='row col-12'>
      <div className='col-lg-3 col-md-3 col-6 p-3'>
        <div className='d-fex flex-column'>
          <div className='d-flex gap-4 align-items-center justify-content-center'>
            <p className='m-0' style={{fontWeight: '700', color: 'white', fontSize: '50px', textAlign: 'center'}}>2000</p>
          </div>

          <div className='text-center'>
            <p className='m-0' style={{fontWeight: '300', color: 'white', fontSize: '14px'}}>Happy Customers.</p>
          </div>
        </div>
      </div>

      <div className='col-lg-3 col-md-3 col-6 p-3'>
        <div className='d-flex flex-column'>
          <div className='d-flex gap-4 align-items-center justify-content-center'>
            <p className='m-0' style={{fontWeight: '700', color: 'white', fontSize: '50px', textAlign: 'center'}}>5000</p>
          </div>

          <div className='text-center'>
            <p className='m-0' style={{fontWeight: '300', color: 'white', fontSize: '14px'}}>Products Sold.</p>
          </div>
        </div>
      </div>


      <div className='col-lg-3 col-md-3 col-6 p-3'>
        <div className='d-flex flex-column'>
          <div className='d-flex gap-4 align-items-center justify-content-center'>
            <p className='m-0' style={{fontWeight: '700', color: 'white', fontSize: '50px', textAlign: 'center'}}>2100</p>
          </div>

          <div className='text-center'>
            <p className='m-0' style={{fontWeight: '300', color: 'white', fontSize: '14px'}}>Cups of Coffee.</p>
          </div>
        </div>
      </div>

      <div className='col-lg-3 col-md-3 col-6 p-3'>
        <div className='d-flex flex-column'>
          <div className='d-flex gap-4 align-items-center justify-content-center'>
            <p className='m-0' style={{fontWeight: '700', color: 'white', fontSize: '50px', textAlign: 'center'}}>2400</p>
          </div>


          <div className='text-center'>
            <p className='m-0' style={{fontWeight: '300', color: 'white', fontSize: '14px'}}>Total Reviews.</p>
          </div>
        </div>
      </div>



    </div>

    
  </div>
</div>

{/** TOP RATE PRODUCTS */}
<div className='d-flex justify-content-center align-items-center p-3'>
<div className='px-4 py-2 border rounded' style={{backdropFilter: 'blur(10px)'}}>
  <p style={{fontWeight: '700', color: 'white', fontSize: '40px', textAlign: 'center', margin: '0'}}> Top Rated Products</p>
  <p style={{fontWeight: '300', color: 'white', fontSize: '14px', textAlign: 'center'}}> Enjoy our products by visiting us on Villa.</p>
</div>
</div>

<div className=' p-lg-4 p-md-4 p-2 d-flex justify-content-center align-items-center'>
  <div className=' row col-12  d-flex justify-content-start'>

  {
    posts.map(post => ( // loops all instances
    <div className='col-lg-3 col-md-4 col-sm-6 col-6 p-lg-3 p-md-3 p-2'>
      <div className='border shadow rounded-3 p-2' style={{backdropFilter:'blur(10px)'}}>
        <div className=''>
          <img className='element-tilt' src={`http://localhost:3001/Images/${post.file}`} alt="placeholder" style={{width: '100%'}} />
        </div>
        <div>
          <p className='m-0' style={{fontWeight: '900', color: 'white', fontSize: '20px', textAlign: 'start'}}>{post.title}</p>
        </div>
                {/** stars will depict based on the average rating */}
                <div className='gap-1 d-flex'>
                <i className={`bi ${post.averageRating >= 1 ? 'bi-star-fill' : post.averageRating >= 0.5 ? 'bi-star-half' : 'bi-star'}`} style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
                <i className={`bi ${post.averageRating >= 2 ? 'bi-star-fill' : post.averageRating >= 1.5 ? 'bi-star-half' : 'bi-star'}`} style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
                <i className={`bi ${post.averageRating >= 3 ? 'bi-star-fill' : post.averageRating >= 2.5 ? 'bi-star-half' : 'bi-star'}`} style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
                <i className={`bi ${post.averageRating >= 4 ? 'bi-star-fill' : post.averageRating >= 3.5 ? 'bi-star-half' : 'bi-star'}`} style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
                <i className={`bi ${post.averageRating >= 5 ? 'bi-star-fill' : post.averageRating >= 4.5 ? 'bi-star-half' : 'bi-star'}`} style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
                <p className='m-0' style={{fontWeight: '500', color: 'white', fontSize: '14px', textAlign: 'start'}}> {post.averageRating ? post.averageRating.toFixed(1) : "0"} ({post.numberOfRatings}). </p>
            </div>
        <div className=''>
          {/** for p below there is a style in style.css to truncate the text */}
          <p className='product-desc-truncate' style={{fontWeight: '200', color: 'white', fontSize: '14px', textAlign: 'start'}}>{post.description}</p>
        </div>
        <div className='d-flex  align-items-center'>
          <Link to={`/products/${post._id}`} className='rate-review-button text-decoration-none bg-white m-0 text-black border shadow rounded-2 py-2 px-3' style={{fontWeight: '700', fontSize: '14px', textAlign: 'start'}}> <i style={{fontWeight: '900', fontSize: '12px', textAlign: 'start'}} className='bi-card-text'></i> Rate/Review</Link>
        </div>
      </div>
    </div>
    ))}

  </div>
</div>

  </>
  );
}



export default Home;
