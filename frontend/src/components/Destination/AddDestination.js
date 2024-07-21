import React from 'react'
import PropTypes from 'prop-types'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

const AddDestination= ({ open, close }) =>  {
  return (
    <MDBModal tabIndex='-1' open={open} onClose={close}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader style={{backgroundColor: '#04b4bd'}}>
            <MDBModalTitle style={{color: 'white'}}>New Destination</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            
            <div class="form-outline">
              <label for="destination_name" className='m-1'>Destination Name</label>
              <input type="text" class="form-control" id="destination_name" style={{border: '1px solid lightgray'}} />
            </div>
            
            <MDBRow className='my-3'>
              <MDBCol>
                <div class="form-outline datepicker">
                  <label for="start_date" className='m-1'>Start Date</label>
                  <input type="date" class="form-control" id="start_date" style={{border: '1px solid lightgray'}} />
                </div>
              </MDBCol>
              <MDBCol>
                <div class="form-outline datepicker">
                  <label for="end_date" className='m-1'>End Date</label>
                  <input type="date" class="form-control" id="end_date" style={{border: '1px solid lightgray'}} />
                </div>
              </MDBCol>

            </MDBRow>

            <div class="form-outline">
              <label for="budget" className='m-1'>Description</label>
              <textarea type="textarea" class="form-control" id="budget" style={{border: '1px solid lightgray'}} />
            </div>


          </MDBModalBody>
          <MDBModalFooter className='d-flex justify-content-center'>
            <MDBBtn className='btn-custom'>Save</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  )
}

AddDestination.propTypes = {}

export default AddDestination