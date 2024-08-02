import { MDBCard, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'

const NotificationItem = ({ notification }) => {
    return (
        <div className='d-flex flex-row gap-3 align-items-center notification-item p-3 justify-content-space-around'>
            <div className='col-md-1 d-flex flex-row justify-content-center'>
                <MDBIcon fas icon="users" style={{color: '#04b4bd'}} />
            </div>
            <div className='col-md-10'>
                {notification.message}
            </div>
        </div>
    )
}

export default NotificationItem