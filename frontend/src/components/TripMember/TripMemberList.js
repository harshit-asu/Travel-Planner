import React, { useCallback, useEffect, useState } from 'react'
import TripMember from './TripMember'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBRow, MDBInput, MDBBtn } from 'mdb-react-ui-kit'
import { getTripMembers, sendInvite } from '../../services/api';
import { useAuth } from '../../AuthProvider';
import PendingInvitations from './PendingInvitations';
import Loading from '../Misc/Loading';
import CustomAlert from '../Misc/CustomAlert';
import { getPendingInvitations } from '../../services/api';

const TripMemberList = ({ trip }) => {
    const [tripMembers, setTripMembers] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [inviteeUsername, setInviteeUsername] = useState(null);
    const [pending, setPending] = useState([]);
    const [alertData, setAlertData] = useState({
        showAlert: false,
        severity: "",
        message: ""
    })

    const { userId } = useAuth();

    const fetchTripMembers = useCallback(async () => {
        setIsDataLoading(true);
        try {
            const response = await getTripMembers(trip.trip_id);
            if(response.status === 200){
                setTripMembers(response.data.trip_members);
            }
            else{
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        setIsDataLoading(false);
    }, [trip]);

    const handleSendInvitation = async (e) => {
        e.preventDefault();
        try {
            const response = await sendInvite(trip.trip_id, inviteeUsername);
            if(response.status === 201){
                setAlertData({
                    showAlert: true,
                    severity: "success",
                    message: response.data.message
                });
                fetchPendingInvitations();
                setInviteeUsername(null);
            }
            else{
                setAlertData({
                    showAlert: true,
                    severity: "error",
                    message: response.data.message
                });
                console.log(response.data.message);
            }
        } catch (error) {
            setAlertData({
                showAlert: true,
                severity: "error",
                message: String(error)
            });
            console.log(error);
        }
    };

    const fetchPendingInvitations = useCallback(async () => {
        setIsDataLoading(true);
        try {
            const response = await getPendingInvitations(trip.trip_id);
            setPending(response.data.pending_invitations);
        } catch (error) {
            console.log(error);
        }
        setIsDataLoading(false);
    }, [trip]);

    useEffect(() => {
        fetchTripMembers();
        fetchPendingInvitations();
    }, [fetchTripMembers, fetchPendingInvitations]);

    if(isDataLoading){
        return (
            <Loading />
        )
    }

    return (
        <MDBRow>
            <CustomAlert alertData={alertData} setAlertData={setAlertData} />
            <MDBCol md={6}>
                <MDBCard>
                    <MDBCardHeader>
                        <h4 className="mb-0 ps-2" style={{ color: "#04b4bd" }}>
                            {/* <MDBIcon fas icon="chevron-right" className="me-2" /> */}
                            <strong>Trip Members ({(tripMembers) ? tripMembers.length : 0})</strong>
                        </h4>
                    </MDBCardHeader>
                    <MDBCardBody>
                        <div className="d-flex flex-wrap m-2 gap-4">
                            {(tripMembers.length !== 0) && tripMembers.map((member) => <MDBCol md={12} key={member.trip_member_id}><TripMember  member={member} trip={trip} currentUserId={userId} /></MDBCol>)}
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol md={6} className='d-flex flex-column gap-3'>
                <MDBCard>
                    <MDBCardHeader>
                        <h4 className="mb-0 ps-2" style={{ color: "#04b4bd" }}>
                            {/* <MDBIcon fas icon="chevron-right" className="me-2" /> */}
                            <strong>Invite people</strong>
                        </h4>
                    </MDBCardHeader>
                    <form onSubmit={handleSendInvitation}>
                        <MDBCardBody className='d-flex flex-row gap-2'>
                            <MDBCol md={8}>
                            <MDBInput label="Username" id="invitee_username" type="text" size='lg' value={inviteeUsername} onChange={(e) => setInviteeUsername(e.target.value)} />
                            </MDBCol>
                            <MDBCol md={4}>
                            <MDBBtn className='btn btn-custom h-100' type='submit' size='md'>Send Invite</MDBBtn>
                            </MDBCol>
                        </MDBCardBody>
                    </form>
                </MDBCard>
                <PendingInvitations trip={trip} userId={userId} fetchPendingInvitations={fetchPendingInvitations} pending={pending} />
            </MDBCol>
        </MDBRow>
    )
}

export default TripMemberList