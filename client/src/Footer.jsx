import React from 'react'

function Footer() {
  return (
    <>
   <footer className='text-light border-top pt-5'>
  <div className="container">
    <div className="row">
      <div className="col-md-4 p-3 ">
        <div className="logo rounded border shadow w-100" style={{backdropFilter: 'blur(10px)'}}>
        <div className=''>
            <h2 className='logo m-1 text-light text-center' style={{  fontWeight: '900'}}>Iloilo Coffee House</h2>
        </div>
        </div>
      </div>
      <div className="col-md-4 p-3 ">
        <div className='border w-100 rounded p-3' style={{backdropFilter: 'blur(10px)'}}>
      <p className='' style={{fontWeight: '900', color: 'white', fontSize: '20px', textAlign: 'start'}}> Contact us </p>
        <p className='m-0 bi-building'> 1234 Random Street</p>
        <p className='m-0 '>Cityville, Countryland</p>
        <p className='m-0 bi-envelope'> Email: info@example.com</p>
        <p className='m-0 bi-phone'>Phone: +1 (123) 456-7890</p>
      </div>
      </div>

      <div className="col-md-4 p-3 ">
        <div className='border w-100 rounded p-3' style={{backdropFilter: 'blur(10px)'}}>
        <h3>Follow Us</h3>
        <div className='d-flex flex-column gap-2'>
          <a href="#" className='text-decoration-none'><i className="bi-facebook text-light"> Iloilo Coffee House</i></a>
          <a href="#" className='text-decoration-none'><i className="bi-twitter text-light"> @ich</i></a>
          <a href="#" className='text-decoration-none'><i className="bi-instagram text-light"> @iloilocoffeehouse</i></a>
        </div>
      </div>
      </div>

    </div>
  </div>
  <div className="text-center py-3">
    &copy; 2023 Random Company. All rights reserved.
  </div>
</footer>
    </>
  )
}

export default Footer;