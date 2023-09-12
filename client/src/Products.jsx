import React, { useState, useEffect } from 'react';
// ScrollLink [npm install react-scroll, clicking it will redirect to a section with specified id]
import { Link as ScrollLink } from 'react-scroll';

// npm install aos [animate onscroll]
import AOS from 'aos' 
import 'aos/dist/aos.css'

// tilt effect
import VanillaTilt from 'vanilla-tilt';

import axios from 'axios'

import './style.css'
import { Link } from 'react-router-dom';

function Products() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  
  // Backend Fetch API
  const [posts, setPosts] = useState([])

  useEffect(() =>{
    axios.get('http://localhost:3001/fetchproducts')
    .then(posts => {
        setPosts(posts.data)
      })
    .catch(err => console.error(err))
  }, [])

  // Needed to be after the backend fetch api for tilt to be initialized properly
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

  const [searchInput, setSearchInput] = useState('');
  const [hasSearchResults, setHasSearchResults] = useState(true);
  
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  }
  
  useEffect(() => {
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchInput.toLowerCase()));
    setHasSearchResults(filteredPosts.length > 0);
  }, [posts, searchInput]);  

  return (
    <>
    <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
        <div className='container d-flex justify-content-center align-items-center'>
            <div className='row col-12  d-flex align-items-end'>
                <div className='col-12 p-0'>
                    <div className='border rounded p-3' style={{backdropFilter: 'blur(3px)'}} data-aos="fade-right">
                        <div data-aos="fade-right"  className='d-flex gap-4 align-items-center mb-3'>
                            <p className='m-0 ' style={{fontWeight: '900', color: 'white', fontSize: '30px', textAlign: 'start'}}> Discover more about our products </p>
                        </div>

                        <div className='' data-aos="fade-right" data-aos-delay="300" >
                            <img className='element-tilt' src="/products-products.png" alt="placeholder" style={{width: '200px'}} />
                        </div>

                        <div data-aos="fade-right" data-aos-delay="600">
                            <p className='' style={{fontWeight: '200', color: 'white', fontSize: '14px', textAlign: 'start'}}>We offer a unique experience where our carefully crafted coffee is complemented by a thoughtfully curated menu of delectable food items. Our goal is to create a harmonious blend of flavors that elevates the coffee and culinary experience, resulting in a memorable and extraordinary dining venture.</p>
                        </div>

                        <ScrollLink to="products" smooth={true} duration={0} offset={-100}> 
                        <div data-aos="fade-right" data-aos-delay="900" className='d-flex  align-items-center'>
                            <button className='rate-review-button m-0 text-black border shadow rounded-2 py-2 px-3' style={{fontWeight: '700', fontSize: '14px', textAlign: 'start'}}> <i style={{fontWeight: '900', fontSize: '12px', textAlign: 'start'}} className='bi-arrow-90deg-down'></i> Explore. </button>
                        </div>
                        </ScrollLink>
                    </div>
                </div>
                
                {/**  <div className='col-6 p-2'>
                    <div className='border rounded p-3' style={{backdropFilter: 'blur(10px)'}}>
                        <div className=' d-flex align-items-center gap-2'>
                            <p className='text-light m-0' style={{fontWeight: '800', fontSize: '40px', lineHeight: '60px'}} > Best Seller  </p>
                            <i className='text-light m-0' style={{fontWeight: '300', fontSize: '20px'}} >[coffee]</i> 
                        </div>
                        <div className=''>
                            <img className='element-tilt' src="/in-the-menu-coffee.png" alt="placeholder" style={{width: '200px'}} />
                        </div>

                        <div className='d-flex gap-4 align-items-center mb-3'>
                            <p className='m-0' style={{fontWeight: '900', color: 'white', fontSize: '20px', textAlign: 'start'}}> Capuccino </p>
                            <div className='gap-1 d-flex'>
                                <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
                                <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
                                <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
                                <i className='bi-star-fill' style={{ color: '#ffa500', fontSize: '15px', textAlign: 'start'}}></i>
                                <i className='bi-star-fill' style={{ color: 'white', fontSize: '15px', textAlign: 'start'}}></i>
                                <p className='m-0' style={{fontWeight: '500', color: 'white', fontSize: '14px', textAlign: 'start'}}> 4.5 (5). </p>
                            </div>
                        </div>

                        <div>
                            <p className='' style={{fontWeight: '200', color: 'white', fontSize: '14px', textAlign: 'start'}}>Indulge in the perfect cup of coffee that matches your caffeine threshold, satisfying your cravings while staying within your limit.</p>
                        </div>
                        <div className='d-flex  align-items-center'>
                            <button className='rate-review-button m-0 text-black border shadow rounded-2 py-2 px-3' style={{fontWeight: '700', fontSize: '14px', textAlign: 'start'}}> <i style={{fontWeight: '900', fontSize: '12px', textAlign: 'start'}} className='bi-card-text'></i> Rate/Review</button>
                        </div>
                    </div>
                </div>
*/}
            </div>
        </div>
    </div>


    {/** PRODUCTS */}
    <div id='products' className='d-flex justify-content-center align-items-center p-3'>
      <div className='px-4 py-2 ' >
        <p style={{fontWeight: '700', color: 'white', fontSize: '40px', textAlign: 'center', margin: '0'}}>Products</p>
        <p style={{fontWeight: '300', color: 'white', fontSize: '14px', textAlign: 'center'}}> Enjoy our products by visiting us on Villa.</p>
      </div>
    </div>

    <div className='d-flex justify-content-center align-items-center p-3' style={{marginTop: '-40px'}}>
      <div className='px-4 py-2 border rounded d-flex gap-2' style={{backdropFilter: 'blur(10px)'}}>
          <i className='bi-search text-light'> </i>
          <input type="text" style={{border: 'transparent', background: 'none', outline: 'none', color: 'white'}} placeholder='Search a product' onChange={handleSearchInputChange} />
      </div>
    </div>

    <div className=' p-lg-4 p-md-4 p-2 d-flex justify-content-center align-items-center' style={{marginTop: '-20px'}}>
      <div className=' row col-12  d-flex justify-content-start' style={{minHeight: '75vh'}}>

        {
          posts.filter(post => post.title.toLowerCase().includes(searchInput.toLowerCase())).map(post => (
            <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-lg-2 p-md-2 p-2'>
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
                  <Link to={`/products/${post._id}`} className='rate-review-button text-decoration-none bg-white m-0 text-black border shadow rounded-2 py-2 px-3' style={{fontWeight: '700', fontSize: '14px', textAlign: 'start'}}> <i style={{fontWeight: '900', fontSize: '12px', textAlign:'start'}} className='bi-card-text'></i> Rate/Review</Link>
                </div>
              </div>
            </div>
          ))
        }

        {/** if there is no search result it will show this */}
        {
          !hasSearchResults && (
            <div className='col-12 p-lg-3 p-md-3 p-2' style={{minHeight: '75vh'}}>
              <p style={{fontWeight: '700', color: 'white', fontSize: '20px', textAlign: 'center'}}>No search results found.</p>
            </div>
          )
        }

      </div>
    </div>    

    </>

    )
}

export default Products