import React from 'react'
import homeImage from '../../assets/home.jpg';
import { MDBCard, MDBCardImage, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

const Home = props => {
	return (
		<div className='homepage'>
			<MDBContainer className="my-5" style={{ maxWidth: '80%', display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }} >
				<MDBRow className='d-flex justify-content-center text-center' style={{ alignItems: 'center' }}>
					<MDBCol md={8}>
						<MDBRow>
							<div className='d-flex flex-row justify-content-center mt-2 mb-2'>
								<span className="h1 fw-bold mb-4" style={{ color: '#04b4bd' }} >Make your travel planning easy!</span>
							</div>
						</MDBRow>
						<MDBRow>
							<div className='d-flex flex-row justify-content-center mt-2 mb-2 px-5'>
								<span className="fw-normal mb-4" style={{ color: '#04b4bd' }} >
								Transform your dream trips into reality with our ultimate travel planner app - plan, organize, and embark on unforgettable journeys effortlessly!
								</span>
							</div>
						</MDBRow>
					</MDBCol>
				</MDBRow>
				<MDBRow className='d-flex justify-content-center align-items-center'>
					<MDBCol md={7} className='d-flex justify-content-center align-items-center' >
						<MDBCard className='' style={{ borderRadius: 30, width: '80%' }}>
							<MDBCardImage src={homeImage} style={{ borderRadius: 20, border: '2px solid #04b4bd' }}  />
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</div>
	)
}

Home.propTypes = {}

export default Home