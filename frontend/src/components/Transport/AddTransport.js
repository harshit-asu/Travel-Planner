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
import { addTransport } from '../../services/api';
import { getMinDate, getDateFromString } from '../../Utils';

const AddTransport= ({ trip, open, close, fetchTransports, setAlertData }) =>  {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [departureLocation, setDepartureLocation] = useState('');
  const [modeOfTransport, setModeOfTransport] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');

  const handleAddTransport = async (e) => {
    e.preventDefault();
    try {
      const response = await addTransport(trip.trip_id, {
        "arrival_time": `${endDate}:00`,
        "departure_time": `${startDate}:00`,
        "description": description,
        "arrival_location": arrivalLocation,
        "departure_location": departureLocation,
        "mode_of_transport": modeOfTransport,
        "cost": cost
      });
      console.log(response.data.message);
      if(response.status === 201){
        close();
        fetchTransports();
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
        message: error.response.message
      });
      console.log(error);
    }
  };

  return (
    <MDBModal tabIndex='-1' open={open} onClose={close}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader style={{backgroundColor: '#04b4bd'}}>
            <MDBModalTitle style={{color: 'white'}}>New Transport</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
          </MDBModalHeader>
          <form onSubmit={handleAddTransport}>
            <MDBModalBody className='d-flex flex-column gap-3 flex-grow-0'>
              
              <div className="form-outline">
                <label htmlFor="transport_name" className='m-1'>Mode of Transport <span style={{color: 'red'}}>*</span></label>
                <input type="text" className="form-control" id="transport_name" style={{border: '1px solid lightgray'}} required value={modeOfTransport} onChange={(e) => setModeOfTransport(e.target.value)} />
              </div>

              <div className="form-outline">
                <label htmlFor="departure_location" className='m-1'>Departure Location <span style={{color: 'red'}}>*</span></label>
                <input type="text" className="form-control" id="departure_location" style={{border: '1px solid lightgray'}} required value={departureLocation} onChange={(e) => setDepartureLocation(e.target.value)} />
              </div>
            
                <div className="form-outline datepicker">
                  <label htmlFor="start_date" className='m-1'>Departure Time<span style={{color: 'red'}}>*</span></label>
                  <input type="datetime-local" className="form-control" id="start_date" style={{border: '1px solid lightgray'}} required value={startDate} onChange={(e) => setStartDate(e.target.value)} min={`${getDateFromString(trip.start_date)}T00:00`} max={`${getDateFromString(trip.end_date)}T23:59`} />
                </div>

                <div className="form-outline">
                  <label htmlFor="arrival_location" className='m-1'>Arrival Location <span style={{color: 'red'}}>*</span></label>
                  <input type="text" className="form-control" id="arrival_location" style={{border: '1px solid lightgray'}} required value={arrivalLocation} onChange={(e) => setArrivalLocation(e.target.value)} />
                </div>

                <div className="form-outline datepicker">
                  <label htmlFor="end_date" className='m-1'>Arrival Time<span style={{color: 'red'}}>*</span></label>
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

AddTransport.propTypes = {}

export default AddTransport