import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function PeopleIndividual() {

const {id} = useParams() // the id in the link above the browser
const [userData, setUserData] = useState({})
const [ratings, setRatings] = useState([])
const [numberOfReviews, setNumberOfReviews] = useState()
const [numberOfRatings, setNumberOfRatings] = useState()

useEffect(() => {
    axios.get('http://localhost:3001/fetchuserbyid/' + id)
    .then(response => {
        setUserData(response.data.user)
        setRatings(response.data.ratings)
        setNumberOfReviews(response.data.numReviews)
        setNumberOfRatings(response.data.numRatings)

    })
    .catch(err => {
        console.log(err)
    })
}, [])

  return (
    <>
        <div className=' pt-5'>
        <div className='mt-5 container d-flex justify-content-center align-items-center'>
        <div className='row col-12'>
        <div className='col-lg-4 p-3 d-flex flex-column align-items-center'>

        <div  className='border d-flex justify-content-center flex-column align-items-center p-3 rounded-3' style={{width: '300px', backdropFilter: 'blur(10px)'}}>

            <div className='border rounded-circle mb-2' style={{ width: '150px', height: '150px' }}>
            <img
            className='element-tilt w-100 h-100 rounded-circle'
            src={`http://localhost:3001/Images/${userData.file}`}
            alt="placeholder"
            style={{width: '100%', objectFit: 'cover'}}
            onError={(e) => {
                e.target.src = '/login-image.jpg';
            }}
            />

            </div>
            <div className=' w-100 text-center'>
                <p className='text-light m-0'>{userData.username}</p>
            </div>

            {userData.facebook && ( // if facebook link is not present. dont show this
            <div className=' w-100 text-start mt-2'>
                <a className='text-light m-0 bi-facebook text-decoration-none' href={`${userData.facebook}`} target='_blank' style={{fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}> Facebook Profile</a>
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
            {ratings.filter(rating => rating.product_id).length > 0 ? (
            ratings
            .filter(rating => rating.product_id)
            .map(rating => (
            <Link to={`/products/${rating.product_id._id}`} className='text-decoration-none'>
            <div className='w-100 mb-3 border  rounded-3 shadow p-2' key={rating._id} style={{backdropFilter: 'blur(10px)'}}>
            <div className='p-2 d-flex gap-2'>
                <div className=' ' style={{ width: '50px', height: '50px' }}>
                <img className='w-100 h-100' src={`http://localhost:3001/Images/${rating.product_id.file}`} alt="" style={{ objectFit: 'cover' }} />
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
            </Link>
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

export default PeopleIndividual