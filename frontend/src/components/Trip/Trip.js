import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBBtn,
  MDBTooltip,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane, 
} from 'mdb-react-ui-kit';
import DestinationList from '../Destination/DestinationList';


const Trip = props => {
  const [verticalActive, setVerticalActive] = useState('Destinations');

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
  };
  return (
    <MDBContainer fluid className="vh-100 mt-3">
    <MDBCard >
      <MDBCardHeader className="p-3">
        <MDBRow className='w-100'>
          <MDBCol md={4} className="d-flex flex-column justify-content-center">
            <h3 className="mb-0 ms-4 ps-2" style={{ color: '#04b4bd' }}>
              {/* <MDBIcon fas icon="chevron-right" className="me-2" /> */}
              <strong>Trip Name</strong>
            </h3>
            <p className="mb-0 ms-4 ps-2" style={{fontSize:"12px", color:"#803300"}}> Created by Swathi</p>
          </MDBCol>
          <MDBCol md={4} className="d-flex justify-content-center pe-5">
            
            <h5 className="mb-0 ms-4 ps-2 mt-3" style={{ color: 'grey' }}> <strong>7/19/2024  -  7/19/2024 </strong></h5>
          
          </MDBCol>
          <MDBCol md={4} className="d-flex justify-content-end pe-5 py-3">
                            <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Edit"
                          >
                            <MDBIcon
                               fas
                               icon="pencil-alt"
                               size="lg"
                               className="me-3"
                               style={{color:"#04b4bd"}}
                            />
                          </MDBTooltip>
                          <MDBTooltip
                            tag="a"
                            wrapperProps={{ href: "#!" }}
                            title="Remove"
                          >
                            <MDBIcon
                              fas
                              icon="trash-alt"
                              color="danger"
                              size="lg"
                              className="me-3"
                            />
                            </MDBTooltip>

          </MDBCol>
          <MDBCol>

          </MDBCol>
        </MDBRow>
       
      </MDBCardHeader>
      <MDBCardBody style={{margin:'0'}}>
      <MDBRow>
        <MDBCol size='2'>
          <MDBTabs className='flex-column text-center'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Destinations')} active={verticalActive === 'Destinations'}>
              Destinations
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Activities')} active={verticalActive === 'Activities'}>
              Activities
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Transport')} active={verticalActive === 'Transport'}>
              Transport
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Accomodation')} active={verticalActive === 'Accomodation'}>
              Accomodation
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('Expenses')} active={verticalActive === 'Expenses'}>
              Expenses
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('PackingList')} active={verticalActive === 'PackingList'}>
              Packing List
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('TripMembers')} active={verticalActive === 'TripMembers'}>
              Trip Members
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='10'>
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === 'Destinations'}><DestinationList/></MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'Activities'}>Activities content</MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'Transport'}>Transport content</MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'Accomodation'}>Accomodation content</MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'Expenses'}>Expenses content</MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'PackingList'}>Packing List content</MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'TripMembers'}>Trip Members List content</MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>

      </MDBCardBody>
      </MDBCard>
      </MDBContainer>
  )
}

Trip.propTypes = {}

export default Trip