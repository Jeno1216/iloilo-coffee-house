import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// tilt effect
import VanillaTilt from 'vanilla-tilt';

// npm install aos [animate onscroll]
import AOS from 'aos' 
import 'aos/dist/aos.css'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { userContext } from './App'

import StarRatings from 'react-star-ratings';

function ProductIndividual() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);


  // FETCH THE INFORMATION OF THE SPECIFIC PRODUCT WE CLICKED FROM OTHER PAGES as well as its associated ratings
  // to display all reviews of the product
  const {id} = useParams()
  const [product, setProduct] = useState({})
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
      axios.get('https://iloilo-coffee-house-api.onrender.com/fetchproductbyid/' + id)
      .then(response => {
        if (response.data === 'The token is missing'){
          toast.error('Please Login First.', {
            position: toast.POSITION.BOTTOM_CENTER // Change position here
          });  
        navigate('/login');
        }
        else{
          setProduct(response.data.product)
          setReviews(response.data.ratings)
        }
      })
      .catch(err => {
          console.log(err)
      })
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
  }, []); // Add data as a dependency to ensure that useEffect re-runs whenever data changes


  // POST REVIEWS AND RATINGS TO THE DATABASE FROM THE USER
  const user = useContext(userContext)

  const product_id = product._id
  const author_id = user._id
  const [rating, setRating] = useState()
  const [review, setReview] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if a rating has been selected, we make star rating required
    if (rating === undefined) {
      // No rating has been selected, display an error message
      toast.error('Please select a rating.', {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return; 
    } else {
    axios.post('https://iloilo-coffee-house-api.onrender.com/ratingreview', { product_id, author_id, rating, review })
      .then(res => {
        toast.success('Review Passed.', {
          position: toast.POSITION.BOTTOM_CENTER // Change position here
        });
        const delay = 3000;
    
        setTimeout(() => {
          location.reload();
        }, delay);

      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error === 'You have already reviewed and rated this product') {
          // The user has already reviewed and rated the product
          toast.error('You have already reviewed and rated this product.', {
            position: toast.POSITION.BOTTOM_CENTER
          });
        } else {
          console.log(err);
        }
      });
  }
}

// FETCH RATINGS OF THE PRODUCT
  const [averageRating, setAverageRating] = useState([])

  useEffect(() => {
      axios.get('https://iloilo-coffee-house-api.onrender.com/fetchproductaverage/' + id)
      .then(result => {
        setAverageRating(result.data) // { average: avg, rating_length: ratings.length} here are the data passed from the server
      })
      .catch(err => console.log(err)) 
  }, [])

  return (
    <>
     <div className='d-flex justify-content-center align-items-center'>

<div className='container  d-flex justify-content-center align-items-center' >
  
  <div className='row mb-5 col-12 d-flex justify-content-center align-items-center rounded-3 ' style={{marginTop: '100px'}}>

    <div className='col-lg-6 col-md-6 col-sm-12 col-12 p-lg-3 p-md-3 p-2'  >
      <div className='element-tilt border rounded-3 p-3'  style={{backdropFilter:'blur(10px)', minHeight: '350px'}}>
        <div className='' data-aos="fade">
          <img className='' src={`https://iloilo-coffee-house-api.onrender.com/Images/${product.file}`} alt="placeholder" style={{width: '150px'}} />
        </div>
        <div data-aos="fade">
          <p className='m-0'  style={{fontWeight: '900', color: 'white', fontSize: '20px', textAlign: 'start'}}>{product.title}</p>
        </div>

        {/** ANG ITSURA SG STARS GA DEPICT KUN PILA ANG AVERAGE RATING */}

        <div data-aos="fade" className='gap-1 d-flex align-items-center' >
          {Array.from({ length: 5 }).map((_, index) => {
            // Calculate the star value (e.g. 0.5 for a half-star, 1 for a full star)
            const starValue = averageRating && averageRating.average >= index + 1 ? 1 : averageRating && averageRating.average >= index + 0.5 ? 0.5 : 0;
            // Determine the star icon class based on the star value
            const starClass = starValue === 1 ? 'bi-star-fill' : starValue === 0.5 ? 'bi-star-half' : 'bi-star';
            return (
              <i
                key={index}
                className={starClass}
                style={{
                  color: starValue > 0 ? '#ffa500' : 'white',
                  fontSize: '15px',
                  textAlign: 'start'
                }}
              ></i>
            );
          })}
          {averageRating && averageRating.average && (
            <p className='m-0' style={{ fontWeight: '500', color: 'white', fontSize: '14px', marginLeft: '8px' }}>
              {averageRating.average.toFixed(1)} ({averageRating.rating_length})
            </p>
          )}
        </div>
        <div className='' data-aos="fade">
          <p className=''  style={{fontWeight: '200', color: 'white', fontSize: '14px', textAlign: 'start'}}>{product.description}</p>
        </div>

        <form action="" onSubmit={handleSubmit} className='d-flex flex-column  w-100 gap-3 '>
        
        <div className='d-flex  gap-3  ' data-aos="fade">
              <p className='m-0 ' style={{fontWeight: '900', color: 'white', fontSize: '20px', textAlign: 'start'}}> Rate product </p>
              <div className=' m-0' data-aos="fade">
                <StarRatings
                  rating={rating}
                  starRatedColor="yellow"
                  changeRating={setRating}
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="3px"
                  name='rating'
                />
                </div>
            </div>
            <div className='px-4 py-2 border rounded d-flex gap-2' data-aos="fade" >
              <i className='bi-envelope text-light p-1'> </i>
              <input type="text" style={{border: 'transparent', background: 'none', outline: 'none', color: 'white', width: '100%'}} placeholder='Give us some feedbacks..'
              onChange={e => setReview(e.target.value)} />
            </div>
        <button data-aos="fade" className='rate-review-button text-decoration-none bg-white m-0 text-black border shadow rounded-2 py-2 px-3' style={{fontWeight: '700', fontSize: '14px', textAlign: 'start', width: '150px'}}> <i style={{fontWeight: '900', fontSize: '12px', textAlign: 'start'}} className='bi-star'></i> Submit Rating </button>
      </form>
  

        
      </div>


    </div>


    
    {/** DISPLAYS ALL THE REVIEWS AND RATINGS */}
    <div className='container  mt-3 d-flex justify-content-center'>
  <div className='row col-12 p-3 rounded-3 d-flex' >
    <div className='mb-4 mt-3 '>
      <p className='m-0' style={{ fontWeight: '900', color: 'white', fontSize: '30px', textAlign: 'start' }}>Ratings and Reviews</p>
    </div>
    {reviews.length === 0 ? (
  <p className='text-light '>No reviews/rating yet</p>
) : (
  <div className='' style={{ height: '60vh', overflow: 'auto' }}>
    {reviews.map((rating) => (
      <div className='mb-3 border rounded-3 shadow p-2' key={rating._id} style={{ backdropFilter: 'blur(10px)' }}>
        <div className=' p-2 d-flex gap-2'>
          <div className='border rounded-5' style={{ width: '50px', height: '50px' }}>
            <img className='w-100 h-100 rounded-5' src={`https://iloilo-coffee-house-api.onrender.com/Images/${rating.author_id?.file}`} alt="" style={{ objectFit: 'cover' }} 
            onError={(e) => {
              e.target.src = '/login-image.jpg';
            }}/>
          </div>
          <div className=' d-flex flex-column'>
            <p className='text-light m-0'> {rating.author_id?.username || 'Unknown User'}</p>
            <div className=' d-flex gap-2'>
              <div className='d-flex gap-1'>
                {Array.from({ length: 5 }, (_, i) => (
                  <i
                    style={{ color: i < rating.rating ? '#ffa500' : 'white' }}
                    className={`bi-star${i < rating.rating ? '-fill' : ''}`}
                  ></i>
                ))}
              </div>
              <div>
                <p className='text-light m-0'> ({rating.rating})</p>
              </div>
            </div>
          </div>
        </div>
        <div className=' p-2 d-flex gap-2'>
          <p className='text-light'>{rating.review}</p>
        </div>

        <div className='px-2 d-flex '>
          <p className='text-light m-0' style={{ fontSize: '12px' }}>{rating.createdAt}</p>
        </div>
      </div>
    ))}
  </div>
)}

  </div>
</div>

      {/** <div className='d-flex border rounded-5 gap-2' style={{width: '50px'}}>
      <img className='w-100' src="/paw-image.png" alt="" />
     <div className='border'>
     <p className='text-light'> {rating.author_id.username}</p>
     {Array.from({ length: 5 }, (_, i) => (
          <i
            style={{color: i < rating.rating ? '#ffa500' : 'white'}}
            className={`bi-star${i < rating.rating ? '-fill' : ''}`}
          ></i>
        ))}
     </div>
        <p> {rating.rating}</p>
       
      </div>
      <p>{rating.author_id.username}</p>
      <p>{rating.review}</p>*/}



  </div>
</div>
</div>

    </>
  )
}

export default ProductIndividual