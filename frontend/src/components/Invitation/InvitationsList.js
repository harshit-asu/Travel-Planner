import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer } from 'mdb-react-ui-kit'
import React, { useCallback, useEffect, useState } from 'react'
import InvitationListItem from './InvitationListItem';
import { getUserInvitations } from '../../services/api';
import Loading from '../Misc/Loading';
import CustomAlert from '../Misc/CustomAlert';

const InvitationsList = () => { 
    const [invitations, setInvitations] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [alertData, setAlertData] = useState({
        showAlert: false,
        severity: "",
        message: ""
    });

    const fetchInvitations = useCallback(async () => {
        setIsDataLoading(true);
        try {
            const response = await getUserInvitations();
            if(response.status === 200){
                setInvitations(response.data.invitations);
                console.log(response);
            }
            else{
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
        setIsDataLoading(false);
    }, []);

    useEffect(() => {
        fetchInvitations();
    }, [fetchInvitations]);

    if(isDataLoading){
        return <Loading />
    }

    return (
        <MDBContainer className='d-flex flex-row justify-content-center my-4'>
            <CustomAlert alertData={alertData} setAlertData={setAlertData} />
            <MDBCol md={8}>
                <MDBCard className='mt-2'>
                    <MDBCardHeader>
                        <h4 className="py-1 mb-0 ms-2 ps-2" style={{ color: "#04b4bd" }}>
                            <strong>My Invitations ({(invitations) ? invitations.length : 0})</strong>
                        </h4>
                    </MDBCardHeader>
                    <MDBCardBody className='d-flex flex-column m-1 gap-4'>
                        {(invitations.length !== 0) ? invitations.map((invitation) => <InvitationListItem invitation={invitation} setAlertData={setAlertData} fetchInvitations={fetchInvitations} />) : `No invitations`}
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBContainer>
    )
}

export default InvitationsList