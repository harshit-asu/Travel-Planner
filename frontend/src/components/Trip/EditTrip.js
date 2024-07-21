import React, { useState } from 'react';
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
import { updateTrip } from '../../services/api';

const EditTrip = ({ open, close, trip, fetchTripData }) => {

    const getDateFromString = (date) => {
        const months = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12',
        };
        var dateArr = date.split(' ');
        return dateArr[2] + '-' + months[dateArr[1]] + '-' + dateArr[0];
    };

    const [tripName, setTripName] = useState(trip.trip_name || '');
    const [startDate, setStartDate] = useState(getDateFromString(trip.start_date) || '');
    const [endDate, setEndDate] = useState(getDateFromString(trip.end_date) || '');
    const [budget, setBudget] = useState(trip.budget || '');

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

    const handleEditTrip = async (e) => {
        e.preventDefault();
        try {
            const response = await updateTrip(trip.trip_id, {
                "trip_name": tripName,
                "start_date": startDate,
                "end_date": endDate,
                "budget": budget
            });
            close();
            fetchTripData();  
        } catch (error) {
            console.log(error);
        }
    };
  
  return (
    <MDBModal tabIndex='-1' open={open} onClose={close}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader style={{backgroundColor: '#04b4bd'}}>
            <MDBModalTitle style={{color: 'white'}}>Edit Trip</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={close}></MDBBtn>
          </MDBModalHeader>
          <form onSubmit={handleEditTrip}>
            <MDBModalBody>

                <div className="form-outline">
                <label htmlFor="trip_name" className='m-1'>Trip Name <span style={{color: 'red'}}>*</span></label>
                <input type="text" className="form-control" id="trip_name" style={{border: '1px solid lightgray'}} required onChange={(e) => setTripName(e.target.value)} value={tripName} />
                </div>
                
                <MDBRow className='my-3'>
                <MDBCol>
                    <div className="form-outline datepicker">
                    <label htmlFor="start_date" className='m-1'>Start Date <span style={{color: 'red'}}>*</span></label>
                    <input type="date" className="form-control" id="start_date" style={{border: '1px solid lightgray'}} required onChange={(e) => setStartDate(e.target.value)} min={getMinDate()} value={startDate}/>
                    </div>
                </MDBCol>
                <MDBCol>
                    <div className="form-outline datepicker">
                    <label htmlFor="end_date" className='m-1'>End Date <span style={{color: 'red'}}>*</span></label>
                    <input type="date" className="form-control" id="end_date" style={{border: '1px solid lightgray'}} required onChange={(e) => setEndDate(e.target.value)} min={(startDate) ? startDate : getMinDate()} value={endDate} />
                    </div>
                </MDBCol>

                </MDBRow>

                <div className="form-outline">
                <label htmlFor="budget" className='m-1'>Budget</label>
                <input type="text" className="form-control" id="budget" style={{border: '1px solid lightgray'}} onChange={(e) => setBudget(e.target.value)} value={budget} />
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

export default EditTrip