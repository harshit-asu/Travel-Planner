import React, { useState } from 'react'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { updateProfile } from '../../services/api';

const EditProfile = ({ open, close, user, setAlertData, fetchUserData }) =>  {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [phone, setPhone] = useState(user.phone_number || '');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { data } = await updateProfile(user.user_id, {
      "first_name": firstName,
      "last_name": lastName,
      "phone_number": phone
    });
    close();
    fetchUserData();
    setAlertData({
      showAlert: true,
      severity: "success",
      message: data.message
    });
  }


  return (
    <MDBModal tabIndex='-1' open={open} onClose={close}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader style={{backgroundColor: '#04b4bd'}}>
            <MDBModalTitle style={{color: 'white'}}>Edit Profile</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
          </MDBModalHeader>
          <form onSubmit={handleUpdateProfile}>
            <MDBModalBody>
              <MDBRow className='my-3'>
                <MDBCol>
                  <div className="form-outline ">
                    <label htmlFor="first_name" className='m-1 d-flex justify-content-start align-items-start' style={{ color: "gray" }} >First Name <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" className="form-control" id="first_name" style={{ border: '1px solid lightgray' }} value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                </MDBCol>
                <MDBCol>
                  <div className="form-outline ">
                    <label htmlFor="last_name" className='m-1 d-flex justify-content-start align-items-start' style={{ color: "gray" }}>Last Name <span style={{ color: 'red' }}>*</span> </label>
                    <input type="text" className="form-control" id="last_name" style={{ border: '1px solid lightgray' }} value={lastName} required onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </MDBCol>

              </MDBRow>
              <MDBRow>

                <div className="form-outline">
                  <label htmlFor="phone" className='m-1 d-flex justify-content-start' style={{ color: "gray" }}>Phone</label>
                  <input type="text" className="form-control" id="phone" style={{ border: '1px solid lightgray' }} value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </MDBRow>

            </MDBModalBody>
            <MDBModalFooter className='d-flex justify-content-center'>
              <MDBBtn className='btn-custom' type='submit'>Save</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  )
}

export default EditProfile