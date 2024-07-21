import React from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import login_page from '../../assets/login_page.jpg'

const Filter = () => {
    return (
        <MDBContainer className='py-4 w-100'>
            <MDBCard className='px-4'>
                <form className='w-100 mt-4'>
                    <MDBRow className='mb-2 justify-content-center'>
                        <h4 className="mb-0 ms-4" style={{ color: '#04b4bd' }}>
                            {/* <MDBIcon fas icon="chevron-right" className="me-2" /> */}
                            <strong>Filter</strong>
                        </h4>
                    </MDBRow>

                    <MDBInput wrapperClass='mb-4' label='Activity' id='formControlLgEmail' type='text' size="lg" />
                    <MDBInput wrapperClass='mb-4' label='Start Time' id='formControlLgSTartTime' type='text' size="lg" />
                    <MDBInput wrapperClass='mb-4' label='End Time' id='formControlLgEndTime' type='text' size="lg" />
                    <MDBInput wrapperClass='mb-4' label='Expenses' id='formControlExpenses' type='text' size="lg" />
                    {/* <div class="form-outline datetimepicker">
                        <input type="text" class="form-control" id="datetimepickerExample"/>
                            <label for="datetimepickerExample" class="form-label">Select Date and Time</label>
                    </div> */}


                    <MDBBtn type="submit" className="mb-4 px-5 btn-custom w-100" size="md" >Apply</MDBBtn>

                </form>
            </MDBCard>
        </MDBContainer>
    );
};

export default Filter;