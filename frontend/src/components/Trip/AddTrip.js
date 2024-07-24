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
import { createTrip } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { getMinDate } from '../../Utils';

const AddTrip = ({ open, close, fetchTrips, setAlertData }) => {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(null);

  let navigate = useNavigate();

  const handleAddTrip = async (e) => {
    e.preventDefault();
    try {
      const response = await createTrip({
        "trip_name": tripName,
        "start_date": startDate,
        "end_date": endDate,
        "budget": budget
      });
      if(response.status === 201){
        close();
        fetchTrips();
        setAlertData({
          showAlert: true,
          severity: "success",
          message: response.data.message
        });
      }
      else{
        setAlertData({
          showAlert: true,
          severity: "error",
          message: response.data.message
        });
      }
    } catch (error) {
      setAlertData({
        showAlert: true,
        severity: "error",
        message: String(error)
      });
      console.log(error);
    }
  };

  return (
    <MDBModal tabIndex='-1' open={open} onClose={close}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader style={{backgroundColor: '#04b4bd'}}>
            <MDBModalTitle style={{color: 'white'}}>New Trip</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
          </MDBModalHeader>
          <form onSubmit={handleAddTrip}>
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
            <MDBBtn className='btn-custom' type='submit' >Save</MDBBtn>
          </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  )
}

AddTrip.propTypes = {}

export default AddTrip