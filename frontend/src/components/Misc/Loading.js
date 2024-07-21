import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit';

const Loading = () => {
  return (
    <div className='vh-100 align-items-center d-flex justify-content-center'>
    <MDBSpinner role='status' color='info'>
        <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
    </div>
  )
}

export default Loading