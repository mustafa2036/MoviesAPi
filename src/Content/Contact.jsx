import React from 'react'

export default function Contact() {
  return (
    <>
    <div className='w-75 mx-auto py-5'>
      <div className="row">
        <div className="col-md-6">
          <input type="text" placeholder='User_First_Name' className='form-control py-3 my-3' />
        </div>
        <div className="col-md-6">
          <input type="text" placeholder='User_Last_Name' className='form-control  py-3 my-3' />
        </div>
        <div className="col-md-12">
          <input type="number" placeholder='User_Age' className='form-control w-100 py-3 my-3' />
        </div>
        <div className="col-md-6">
          <input type="email" placeholder='User_Email' className='form-control w-100  py-3 my-3' />
        </div>
        <div className="col-md-6">
          <input type="text" placeholder='User_Password' className='form-control w-100  py-3 my-3' />
        </div>
      <button className='btn btn-info mx-auto w-75 py-3 mt-2'>Send Message</button>
      </div>
    </div>
    </>
  )
}
