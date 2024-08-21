import { Avatar } from '@mui/material'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardImage, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'
import { Link } from 'react-router-dom'

const AboutCard = ({ name, picture, description, linkedin, email, github }) => {
    return (
        <>
            <MDBCard className='mt-2 py-4'>
                <MDBCardBody className='d-flex gap-1' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div>
                        <Avatar
                            alt={name}
                            src={picture}
                            sx={{ width: 150, height: 150, border: '3px solid #04b4bd' }}
                        />
                    </div>
                    <div className='about-title mt-3'>
                        <div className='d-flex flex-row justify-content-center'>
                            <span className="h5 fw-bold" style={{ color: '#04b4bd' }} >{name}</span>
                        </div>
                    </div>
                    <div className='about-description'>
                        <div className='d-flex flex-row justify-content-center'>
                            <span className="fw-normal" style={{ color: 'gray' }} >{description}</span>
                        </div>
                    </div>
                    <div className='about-contact mt-4'>
                        <MDBRow>
                            <MDBCol md={4}>
                                <a target='_blank' rel='noopener noreferrer' href={linkedin}>
                                    <MDBIcon fab icon="linkedin" className='fa-2x' />
                                </a>
                            </MDBCol>
                            <MDBCol md={4}>
                                <a target='_blank' rel='noopener noreferrer' href={email} style={{color: '#c71610'}}>
                                    <MDBIcon fas icon="envelope" className='fa-2x'  />
                                </a>
                            </MDBCol>
                            <MDBCol md={4}>
                                <a target='_blank' rel='noopener noreferrer' href={github} style={{color: 'black'}}>
                                    <MDBIcon fab icon="github" className='fa-2x'  />
                                </a>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </>
    )
}

export default AboutCard