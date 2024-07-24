import React, { useEffect, useState } from 'react'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { updateActivity } from '../../services/api';
import { getMinDate, getDateFromString, convertTo24Hour } from '../../Utils';

const EditActivity = ({ d, trip, open, close, fetchActivities, setAlertData }) =>  {

  const [activityName, setActivityName] = useState(d.activity_name);
  const [startDate, setStartDate] = useState(`${getDateFromString(d.start_date)}T${convertTo24Hour(d.start_time)}`);
  const [endDate, setEndDate] = useState(`${getDateFromString(d.end_date)}T${convertTo24Hour(d.end_time)}`);
  const [description, setDescription] = useState(d.description);

  const handleEditActivity = async (e) => {
    e.preventDefault();
    try {
      const response = await updateActivity(d.activity_id, {
        "activity_name": activityName,
        "start_time": `${startDate}`,
        "end_time": `${endDate}`,
        "description": description
      });
      if(response.status === 200){
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
          <form onSubmit={handleEditActivity}>
            <MDBModalBody className='d-flex flex-column gap-3 flex-grow-0'>
              
              <div className="form-outline">
                <label htmlFor="activity_name" className='m-1'>Activity Name <span style={{color: 'red'}}>*</span></label>
                <input type="text" className="form-control" id="activity_name" style={{border: '1px solid lightgray'}} required value={activityName} onChange={(e) => setActivityName(e.target.value)} />
              </div>
            
                <div className="form-outline datepicker">
                  <label htmlFor="start_date" className='m-1'>Start Time <span style={{color: 'red'}}>*</span></label>
                  <input type="datetime-local" className="form-control" id="start_date" style={{border: '1px solid lightgray'}} required value={startDate} onChange={(e) => setStartDate(`${e.target.value}:00`)} min={`${getDateFromString(trip.start_date)}T00:00`} max={`${getDateFromString(trip.end_date)}T23:59`} />
                </div>

                <div className="form-outline datepicker">
                  <label htmlFor="end_date" className='m-1'>End Time <span style={{color: 'red'}}>*</span></label>
                  <input type="datetime-local" className="form-control" id="end_date" style={{border: '1px solid lightgray'}} required value={endDate} onChange={(e) => setEndDate(`${e.target.value}:00`)} min={startDate || `${getDateFromString(trip.start_date)}T00:00`} max={`${getDateFromString(trip.end_date)}T23:59`} />
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

export default EditActivity;