import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./style.css"
function People() {

    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    const searchUser = async (e) => {
        setName(e.target.value);
        if (e.target.value !== '') {
            const res = await axios.get(`https://iloilo-coffee-house-api.onrender.com/search?name=${e.target.value}`);
            setUsers(res.data);
        } else {
            setUsers([]);
        }
    };

  return (
    <>
        <div className=" d-flex flex-column vh-100  align-items-center" >

        <div className=' container p-3 d-flex flex-column align-items-center' style={{marginTop: '100px'}}>
        <div className='row col-12 d-flex justify-content-center'>
        <div className='col-lg-6 col-12 order-lg-1 order-md-1 order-2  p-3'>
        <div className='px-4 py-2 border rounded d-flex gap-2' style={{backdropFilter: 'blur(10px)'}}>
          <i className='bi-search text-light'> </i>
          <input type="text" className='w-100' value={name} style={{border: 'transparent', background: 'none', outline: 'none', color: 'white'}} placeholder='Search a fellow coffee lover...' onChange={searchUser}/>
        </div>
        
            {users.map(user => (
                <Link to={`/people/${user._id}`}  className='people border rounded mt-3 d-flex gap-2 p-2 align-items-center text-decoration-none' style={{backdropFilter: 'blur(10px)'}}>
                    <div className='border rounded-circle' style={{height: '40px', width: '40px'}}>
                        <img className='element-tilt rounded-circle' src={`https://iloilo-coffee-house-api.onrender.com/Images/${user.file}`} alt="Image" style={{width: '100%', objectFit: 'cover'}}
                        onError={(e) => {
                            e.target.src = '/login-image.jpg';
                        }} />
                    </div>

                    <div className=' d-flex justify-content-between w-100'>
                    <p className=' people-name m-0' style={{fontWeight: '600'}} key={user._id}>{user.username}</p>
                    <div className='d-flex gap-2'>
                    <p className=' m-0 people-rating' style={{fontSize: '14px', fontWeight: '200'}} key={user._id}>{user.numRatings} <i style={{fontSize: '14px', fontWeight: '200'}} >ratings </i>  | </p>
                    <p className=' m-0 people-review' style={{fontSize: '14px', fontWeight: '200'}} key={user._id}>{user.numReviews} <i style={{fontSize: '14px', fontWeight: '200'}} > reviews</i></p>
                    </div>
                    </div>

                </Link>
            ))}
        </div>

        <div className='col-lg-6 order-lg-2 order-md-2 order-1 col-md-6 col-sm-8 col-8  d-flex  p-3'>
            <img className='' src="/people-bg.png" alt="" style={{width: '100%'}} />
        
        </div>

        </div>
        </div>

        </div>

    </>
  )
}

export default People