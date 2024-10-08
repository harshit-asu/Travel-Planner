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
import { addActivity } from '../../services/api';
import { getMinDate, getDateFromString } from '../../Utils';

const AddActivity= ({ trip, open, close, fetchActivities, setAlertData }) =>  {

  const [activityName, setActivityName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await addActivity(trip.trip_id, {
        "activity_name": activityName,
        "start_time": `${startDate}:00`,
        "end_time": `${endDate}:00`,
        "description": description
      });
      console.log(response.data.message);
      if(response.status === 201){
        close();
        fetchActivities();
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
            <MDBModalTitle style={{color: 'white'}}>New Activity</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
          </MDBModalHeader>
          <form onSubmit={handleAddActivity}>
            <MDBModalBody className='d-flex flex-column gap-3 flex-grow-0'>
              
              <div className="form-outline">
                <label htmlFor="activity_name" className='m-1'>Activity Name <span style={{color: 'red'}}>*</span></label>
                <input type="text" className="form-control" id="activity_name" style={{border: '1px solid lightgray'}} required value={activityName} onChange={(e) => setActivityName(e.target.value)} />
              </div>
            
                <div className="form-outline datepicker">
                  <label htmlFor="start_date" className='m-1'>Start Time <span style={{color: 'red'}}>*</span></label>
                  <input type="datetime-local" className="form-control" id="start_date" style={{border: '1px solid lightgray'}} required value={startDate} onChange={(e) => setStartDate(e.target.value)} min={`${getDateFromString(trip.start_date)}T00:00`} max={`${getDateFromString(trip.end_date)}T23:59`} />
                </div>

                <div className="form-outline datepicker">
                  <label htmlFor="end_date" className='m-1'>End Time <span style={{color: 'red'}}>*</span></label>
                  <input type="datetime-local" className="form-control" id="end_date" style={{border: '1px solid lightgray'}} required value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate || `${getDateFromString(trip.start_date)}T00:00`} max={`${getDateFromString(trip.end_date)}T23:59`} />
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

AddActivity.propTypes = {}

export default AddActivity