import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { userContext } from './App'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"
import { useNavigate } from 'react-router-dom';

function Profile() {

  const userloggedin = useContext(userContext)
  const user_id = userloggedin._id

  const [post, setPost] = useState({})
    
  useEffect(() => {
    // only run this code if user_id is defined
    if (user_id) {
        axios.get('https://iloilo-coffee-house-api.onrender.com/getuserdata', {
            params: {
                user_id: user_id
            }
        })
        .then(result => setPost(result.data))
        .catch(err => console.log(err));
    }
}, [user_id]); // add user_id as a dependency

    const [reviews, setReviews] = useState([])
    const [user, setUser] = useState()
    const [numberOfReviews, setNumberOfReviews] = useState()
    const [numberOfRatings, setNumberOfRatings] = useState()
  const navigate = useNavigate()
    useEffect(() => {
        axios.get('https://iloilo-coffee-house-api.onrender.com/getuserandrating')
          .then(response => {
            if (response.data === 'The token is missing'){
              toast.error('Please Login First.', {
                position: toast.POSITION.BOTTOM_CENTER // Change position here
              });  
            navigate('/login');
            }
            else{
              setReviews(response.data.ratings)
              setUser(response.data.username)
              setNumberOfRatings(response.data.numberOfRatings)
              setNumberOfReviews(response.data.numberOfReviews)  
            }
          })
          .catch(err => console.log(err))
      }, [])
      
      const [isFormVisible, setIsFormVisible] = useState(false);

      const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
      };
        
    const image = userloggedin.email
    console.log(image);

    const [user_name, setUser_name] = useState()
    const [file, setFile] = useState()
    const [facebook, setFacebook] = useState()


    const handleSubmit = (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('id', user_id);
      if (user_name) formData.append('username', user_name); // if theres a user_name then append
      if (file) formData.append('file', file); // if theres a file then append 
      if (facebook) formData.append('facebook', facebook); // if theres a file then append  
      axios
        .put('https://iloilo-coffee-house-api.onrender.com/editprofile', formData)
        .then((res) => {
          toast.success('Profile Edited Successfully.', {
            position: toast.POSITION.BOTTOM_CENTER // Change position here
          });
          // Delay of 3 seconds (2000 milliseconds)
          const delay = 3000;
          setTimeout(() => {
            location.reload();
          }, delay);
    
          // Store the new token in a cookie
          document.cookie = `token=${res.data.newToken}`;
        })
        .catch((err) => console.log(err));
    };
    
    const [filenamebutton, setFileNameButton] = useState(null);
    const [fileName, setFileName] = useState('Select Profile Picture');
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setFileNameButton(e.target.files[0]);
      setFileName(e.target.files[0].name);
    };
  
return (
    <>
        <div className=' pt-5'>
            
            <div className='mt-5 container d-flex justify-content-center align-items-center'>

                <div className='row col-12'>

                    <div className='col-lg-4 p-3 d-flex flex-column align-items-center'>

                        <div  className='border d-flex justify-content-center flex-column align-items-center p-3 rounded-3' style={{width: '300px', backdropFilter: 'blur(10px)'}}>
                            <div className='edit-button position-absolute m-0 border rounded-circle d-flex justify-content-center align-items-center bg-light shadow' style={{top: '10px', right: '10px', width: '40px', height: '40px'}}
                            onClick={toggleFormVisibility}>
                                <i className='text-black bi-pencil '></i>
                            </div>

                            <div className='border rounded-circle mb-2' style={{ width: '150px', height: '150px' }}>
                            <img
                              className='element-tilt w-100 h-100 rounded-circle'
                              src={`https://iloilo-coffee-house-api.onrender.com/Images/${post.file}`}
                              alt="placeholder"
                              style={{width: '100%', objectFit: 'cover'}}
                              onError={(e) => {
                                e.target.src = '/login-image.jpg';
                              }}
                            />

                            </div>
                            <div className=' w-100 text-center'>
                                <p className='text-light m-0'>{post.username}</p>
                            </div>

                            {post.facebook && ( // if facebook link is not present. dont show this
                              <div className=' w-100 text-start mt-2'>
                                <a className='text-light m-0 bi-facebook text-decoration-none' href={`${post.facebook}`} target='_blank' style={{fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}> Facebook Profile</a>
                              </div>
                            )}

                            {/* Conditional rendering of the form based on the state
                            has a style in style .css to center it */}
                            {isFormVisible && (
                              <div className="form-container  w-100">
                                {/* Add your form fields and content here */}
                                <form className="centered-form" >
                                  {/* Form fields */}

                                  <div className='px-4 py-2  rounded d-flex gap-2' >
                                    <i className='bi-person text-light'> </i>
                                    <input type="text" className='username-input' style={{border: 'transparent', background: 'none', outline: 'none', color: 'white', fontSize: '14px'}} placeholder='Enter New Username'
                                    onChange={e => setUser_name(e.target.value)} />
                                </div>

                                <div className='px-4 py-2  rounded d-flex gap-2' >
                                    <i className='bi-facebook text-light'> </i>
                                    <input type="text" className='username-input' style={{border: 'transparent', background: 'none', outline: 'none', color: 'white', fontSize: '14px'}} placeholder='Facebook Link'
                                    onChange={e => setFacebook(e.target.value)} />
                                </div>

                                <div className='px-4 py-2  w-100'>
                                  <label htmlFor="file-input" className='d-flex gap-2'style={{width: '100%'}}>
                                    <i className='bi-image text-light'> </i> 
                                    <p className=' m-0' style={{fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color:'#A5A5A5'}}>{fileName}</p> 
                                  </label>
                                  <input id="file-input" type="file" accept='.jpg, .png' style={{display: 'none'}} 
                                  onChange={handleFileChange}  />
                                </div>

                                <div className=' w-100  d-flex  rounded px-4 py-2' style={{ background: 'none', outline: 'none', color: 'white', width: '200px'}} > 
                                <button onClick={handleSubmit} className='border shadow rounded p-2 text-light' style={{background: 'transparent', fontSize: '14px'}}>Save Changes</button> </div>
                                </form>
                              </div>
                            )}
                        </div>
                        
                      <br />
                        <div className='d-flex justify-content-betweenborder col-12 align-items-center rounded-3' style={{width: '300px'}}>
                          <div className='col-6 p-2'>
                            <div className='border text-center rounded p-2' style={{backdropFilter: "blur(10px)"}}>
                            <h1 className='text-light m-0'>{numberOfRatings}</h1>
                            <p className='text-light m-0'>Ratings</p>
                            </div>
                          </div>

                          <div className='col-6  p-2'>
                            <div className='border text-center rounded p-2' style={{backdropFilter: "blur(10px)"}}>
                            <h1 className='text-light m-0'>{numberOfReviews}</h1>
                            <p className='text-light m-0'>Reviews</p>
                            </div>
                          </div>

                        </div>

                    </div>

                     <div className='col-lg-8 p-3 ' > 
                        <div className=' w-100 gap-3 d-flex flex-column align-items-center rounded' >

                        <div className='w-100 m-0' >
                            <h4 className='text-light m-0 pt-3 px-3'> Reviews and Ratings </h4>
                        </div>

                        <div className=' w-100 p-3' style={{height: '90vh',  overflow: 'auto' }} >
                        {reviews.filter(rating => rating.product_id).length > 0 ? (
  reviews
    .filter(rating => rating.product_id)
    .map(rating => (
    <div className='w-100 mb-3 border rounded-3 shadow p-2' key={rating._id} style={{backdropFilter: 'blur(10px)'}}>
      <div className='p-2 d-flex gap-2'>
        <div className=' ' style={{ width: '50px', height: '50px' }}>
          <img className='w-100 h-100' src={`https://iloilo-coffee-house-api.onrender.com/Images/${rating.product_id.file}`} alt="" style={{ objectFit: 'cover' }} />
        </div>
        <div className=' d-flex flex-column'>
          <p className='text-light m-0'> {rating.product_id.title}</p>
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
      <p className='text-light m-0' style={{fontSize: '12px'}}>{rating.createdAt}</p>
    </div>
  </div>
    ))
) : (
  <p className='text-light'>No ratings yet.</p>
)}


                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    </>
  )
}

export default Profile