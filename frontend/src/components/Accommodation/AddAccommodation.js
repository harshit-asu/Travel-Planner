import React, { useEffect, useState } from 'react'
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
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { addAccommodation } from '../../services/api';
import { getMinDate, getDateFromString } from '../../Utils';

const AddAccommodation= ({ trip, open, close, fetchAccommodations, setAlertData }) =>  {

  const [accommodationName, setAccommodationName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(null);

  const handleAddAccommodation = async (e) => {
    e.preventDefault();
    try {
      const response = await addAccommodation(trip.trip_id, {
        "accommodation_name": accommodationName,
        "check_in": `${startDate}:00`,
        "check_out": `${endDate}:00`,
        "cost": cost,
        "description": description
      });
      if(response.status === 201){
        close();
        fetchAccommodations();
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
            <MDBModalTitle style={{color: 'white'}}>New Accommodation</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
          </MDBModalHeader>
          <form onSubmit={handleAddAccommodation}>
            <MDBModalBody className='d-flex flex-column gap-3 flex-grow-0'>
              
              <div className="form-outline">
                <label htmlFor="accommodation_name" className='m-1'>Accommodation Name <span style={{color: 'red'}}>*</span></label>
                <input type="text" className="form-control" id="accommodation_name" style={{border: '1px solid lightgray'}} required value={accommodationName} onChange={(e) => setAccommodationName(e.target.value)} />
              </div>
            
                <div className="form-outline datepicker">
                  <label htmlFor="start_date" className='m-1'>Check In Time <span style={{color: 'red'}}>*</span></label>
                  <input type="datetime-local" className="form-control" id="start_date" style={{border: '1px solid lightgray'}} required value={startDate} onChange={(e) => setStartDate(e.target.value)} min={`${getDateFromString(trip.start_date)}T00:00`} max={`${getDateFromString(trip.end_date)}T23:59`} />
                </div>

                <div className="form-outline datepicker">
                  <label htmlFor="end_date" className='m-1'>Check Out Time <span style={{color: 'red'}}>*</span></label>
                  <input type="datetime-local" className="form-control" id="end_date" style={{border: '1px solid lightgray'}} required value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate || `${getDateFromString(trip.start_date)}T00:00`} max={`${getDateFromString(trip.end_date)}T23:59`} />
                </div>

                <div className="form-outline">
                <label htmlFor="cost" className='m-1'>Cost</label>
                <input type="text" className="form-control" id="cost" style={{border: '1px solid lightgray'}} value={cost} onChange={(e) => setCost(e.target.value)} />
              </div>

              <div className="form-outline">
                <label htmlFor="budget" className='m-1'>Description</label>
                <textarea type="textarea" className="form-control" id="budget" style={{border: '1px solid lightgray'}} value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>


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

AddAccommodation.propTypes = {}

export default AddAccommodation