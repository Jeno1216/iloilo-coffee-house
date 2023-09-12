import axios from 'axios'
import React, { useState, useContext} from 'react'
import { userContext } from './App'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateProducts() {

    const user = useContext(userContext) // session, where we can access user data here

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [file, setFile] = useState()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('author_id', user._id)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('file', file)
      axios.post('http://localhost:3001/createproducts', formData)
      .then(res => {
          if (res.data === "Success") {
            toast.success('Product Added Successfully.', {
                position: toast.POSITION.BOTTOM_CENTER // Change position here
              });      
      }
      else{
        toast.error('Server Error.', {
            position: toast.POSITION.BOTTOM_CENTER // Change position here
          });      

  
      }
      })
      .catch(err => console.log(err))
  }  

  return (
    <>
    <div className='vh-100 d-flex align-items-center justify-content-center'>
      <div className='container d-flex justify-content-center align-items-center'>
        <div className='row col-10 '>
        <form action="" className='col-12 border rounded d-flex flex-column gap-3 p-5' onSubmit={handleSubmit} style={{backdropFilter: 'blur(10px)'}}>

        <div className='px-4 py-2 border rounded d-flex gap-2' >
            <i className='bi-envelope text-light'> </i>
            <input type="text" style={{border: 'transparent', background: 'none', outline: 'none', color: 'white'}} placeholder='Name of the Product' 
            onChange={e => setTitle(e.target.value)} />
        </div>

        <div className='px-4 py-2 border rounded d-flex gap-2' >
            <i className='bi-envelope text-light'> </i>
            <textarea id="desc" rows="3" cols="100" style={{border: 'transparent', background: 'none', outline: 'none', color: 'white'}} placeholder='Description of the Product' 
            onChange={e => setDescription(e.target.value)}/>
        </div>

        <div className='px-4 py-2 border rounded  gap-2' >
            <i className='bi-image text-light'> </i>
            <input type="file" accept='.jpg, .png' style={{border: 'transparent', background: 'none', outline: 'none', color: 'white'}} 
            onChange={e => setFile(e.target.files[0])} />
        </div>

          <button className='border shadow rounded p-2' style={{ background: 'none', outline: 'none', color: 'white', width: '200px'}} > Add Product </button>

        </form>
        </div>
      </div>
    </div>

    </>
  )
}

export default CreateProducts