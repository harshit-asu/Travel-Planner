import { MDBCardImage, MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'
import no_notifications from '../../assets/no_notifications.webp'

const NoNotifications = () => {
    return (
        <div className='w-50 d-flex flex-column gap-3 align-items-center justify-content-center w-100' style={{height: '200px'}}>
            <MDBIcon far icon="check-circle" className='fa-5x' style={{color: '#04b4bd'}} />
            <p>You are all caught up!</p>
        </div>
    )
}

export default NoNotifications