import React, { useCallback, useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCol } from 'mdb-react-ui-kit'
import TripMember from './TripMember';

const PendingInvitations = ({ trip, userId, pending }) => {
    return (
        <MDBCard>
            <MDBCardHeader>
                <h4 className="mb-0 ps-2" style={{ color: "#04b4bd" }}>
                    {/* <MDBIcon fas icon="chevron-right" className="me-2" /> */}
                    <strong>Pending Invitations ({(pending) ? pending.length : 0})</strong>
                </h4>
            </MDBCardHeader>
            <MDBCardBody>
                <div className="d-flex flex-wrap m-2 gap-4">
                    {(pending.length !== 0) ? pending.map((user) => <MDBCol md={12} key={user.user_id}><TripMember  member={user} trip={trip} currentUserId={userId} /></MDBCol>) : <h5>No pending invitations</h5>}
                </div>
            </MDBCardBody>
        </MDBCard>
    );
}

export default PendingInvitations