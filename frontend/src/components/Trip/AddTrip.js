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
  MDBIcon,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import PropTypes from 'prop-types'
import { createTrip } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AddTrip = ({ open, close }) => {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(null);

  let navigate = useNavigate();

  const handleAddTrip = async (e) => {
    e.preventDefault()
    try {
      const response = await createTrip({
        "trip_name": tripName,
        "start_date": startDate,
        "end_date": endDate,
        "budget": budget
      });
      console.log(response); 
      navigate('/trips');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getMinDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  };

  return (
    <MDBModal tabIndex='-1' open={open} onClose={close}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader style={{backgroundColor: '#04b4bd'}}>
            <MDBModalTitle style={{color: 'white'}}>New Trip</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>

            <div className="form-outline">
              <label htmlFor="trip_name" className='m-1'>Trip Name <span style={{color: 'red'}}>*</span></label>
              <input type="text" className="form-control" id="trip_name" style={{border: '1px solid lightgray'}} required onChange={(e) => setTripName(e.target.value)}/>
            </div>
            
            <MDBRow className='my-3'>
              <MDBCol>
                <div className="form-outline datepicker">
                  <label htmlFor="start_date" className='m-1'>Start Date <span style={{color: 'red'}}>*</span></label>
                  <input type="date" className="form-control" id="start_date" style={{border: '1px solid lightgray'}} required onChange={(e) => setStartDate(e.target.value)} min={getMinDate()}/>
                </div>
              </MDBCol>
              <MDBCol>
                <div className="form-outline datepicker">
                  <label htmlFor="end_date" className='m-1'>End Date <span style={{color: 'red'}}>*</span></label>
                  <input type="date" className="form-control" id="end_date" style={{border: '1px solid lightgray'}} required onChange={(e) => setEndDate(e.target.value)} min={(startDate) ? startDate : getMinDate()} />
                </div>
              </MDBCol>

            </MDBRow>

            <div className="form-outline">
              <label htmlFor="budget" className='m-1'>Budget</label>
              <input type="text" className="form-control" id="budget" style={{border: '1px solid lightgray'}} onChange={(e) => setBudget(e.target.value)} />
            </div>


          </MDBModalBody>
          <MDBModalFooter className='d-flex justify-content-center'>
            <MDBBtn className='btn-custom' onClick={handleAddTrip} >Save</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  )
}

AddTrip.propTypes = {}

export default AddTrip