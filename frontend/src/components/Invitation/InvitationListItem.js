import React from 'react'
import { Avatar } from '@mui/material';
import { stringAvatar } from '../../Utils';
import { MDBBtn, MDBCardTitle, MDBCol } from 'mdb-react-ui-kit';
import { acceptInvite, declineInvite } from '../../services/api';

const InvitationListItem = ({ invitation, fetchInvitations, setAlertData }) => {
    const handleAcceptInvitation = async (e) => {
        e.preventDefault();
        try {
            const response = await acceptInvite(invitation.trip_invitation_id);
            if(response.status === 201){
                fetchInvitations();
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
        }
    };

    const handleDeclineInvitation = async (e) => {
        e.preventDefault();
        try {
            const response = await declineInvite(invitation.trip_invitation_id);
            if(response.status === 201){
                fetchInvitations();
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
        }
    };

    return (
        <div className='profile-data d-flex flex-row flex-grow align-items-center w-100 m-1'>
            <MDBCol md={8} className='d-flex flex-row gap-3'>
                <Avatar {...stringAvatar(invitation.sender_name)} />
                <MDBCardTitle className='mt-2 d-flex flex-row justify-content-start flex-grow-0' >{`${invitation.sender_name} invited you to join ${invitation.trip_name}`}</MDBCardTitle>
            </MDBCol>
            <MDBCol md={4} className='d-flex flex-row gap-2'>
                <MDBBtn className='btn btn-custom' onClick={handleAcceptInvitation}>Accept</MDBBtn>
                <MDBBtn className='btn btn-danger' onClick={handleDeclineInvitation} >Decline</MDBBtn>
            </MDBCol>
        </div>
    )
}

export default InvitationListItem