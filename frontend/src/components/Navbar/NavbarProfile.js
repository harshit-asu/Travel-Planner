import React, { useCallback, useEffect, useState } from 'react'
import {
    MDBDropdown, 
    MDBDropdownMenu, 
    MDBDropdownToggle, 
    MDBDropdownItem,
    MDBRow,
    MDBCol,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardLink
} from 'mdb-react-ui-kit';
import { getUserDataForNavbar, logout, markNotificationsRead } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import CustomAlert from '../Misc/CustomAlert';
import { Skeleton } from '@mui/material';
import NotificationItem from './NotificationItem';
import NoNotifications from './NoNotifications';

const NavbarProfile = props => {
    const [userName, setUserName] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [alertData, setAlertData] = useState({
        showAlert: false,
        severity: "",
        message: ""
    });
    const { setAuth } = useAuth();
    let navigate = useNavigate();

    const fetchData = useCallback(async () => {
        const { data } = await getUserDataForNavbar();
        setUserName(data.user_name);
        setNotifications(data.notifications);
        setNotificationCount(data.notifications.length);
    }, []);

    useEffect(() => {
       fetchData(); 
    }, [fetchData]);

    const handleLogout = (e) => {
        e.preventDefault();
        const response = logout();
        if(response.return_value){
            setAuth(false);
            navigate('/login', { state: {
                alertData: {
                    showAlert: true,
                    severity: "success",
                    message: "Logout successful"
                }
            } });
        }
        else{
            setAlertData({
                showAlert: true,
                severity: "error",
                message: response.message
            });
        }
    };

    const handleMarkAllRead = async () => {
        const response = await markNotificationsRead();
        if(response === 200){
            await fetchData();
        }
    };

    return (
        <MDBRow className='w-100 mx-0'>
            <CustomAlert alertData={alertData} setAlertData={setAlertData} />
            <MDBCol className=' d-flex flex-row justify-content-end align-items-center '>
            <MDBNavbarItem>
                <MDBDropdown className='me-3'>
                    <MDBDropdownToggle className='dropdown-custom'>
                        <MDBNavbarLink href='#'>
                            <MDBIcon fas icon="bell fa-2x" style={{ color: 'white' }} />
                        </MDBNavbarLink>
                    </MDBDropdownToggle>
                        <span className="badge rounded-pill badge-notification bg-danger">{(notificationCount !== 0) && notificationCount}</span>
                    <MDBDropdownMenu responsive='end' style={{position: 'absolute', width: 'auto', height: 'auto', marginTop: '10px', minWidth: '400px', borderRadius: 0}}>
                        <MDBCard>
                            <MDBCardHeader>
                                <MDBRow className='d-flex flex-row align-items-center'>
                                    <MDBCol>
                                        <h6 className='m-0 fw-bold' style={{color: '#04b4bd', letterSpacing: 0.5}}>Notifications</h6>
                                    </MDBCol>
                                    <MDBCol className='d-flex justify-content-end'>
                                        {(notificationCount !== 0) && <MDBCardLink className='m-0 underline' style={{cursor: 'pointer'}} onClick={handleMarkAllRead}>Mark all read</MDBCardLink>}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardHeader>
                            <MDBCardBody className='w-100 p-0'>
                                {(notifications.length === 0) ? <NoNotifications /> : notifications.map((n) => <NotificationItem key={n.notification_id} notification={n} />) }
                            </MDBCardBody>
                        </MDBCard>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavbarItem>
            </MDBCol>
            <MDBCol className='d-flex flex-grow-0 flex-row justify-content-end'>
            <MDBNavbarItem>
                <MDBDropdown>
                    <MDBDropdownToggle className='dropdown-custom'>
                        <span className="fw-bold mt-0 me-2 username">{userName}</span>  
                        <MDBIcon fas icon="chevron-circle-down  ms-8 " style={{ color: 'white' }} />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <Link to={'/profile'}><MDBDropdownItem link>My Profile</MDBDropdownItem></Link>
                        <Link to={'/trips'}><MDBDropdownItem link>My Trips</MDBDropdownItem></Link>
                        <Link onClick={handleLogout}><MDBDropdownItem link>Logout</MDBDropdownItem></Link>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBNavbarItem>
            </MDBCol>
        </MDBRow>
    );
}

NavbarProfile.propTypes = {}

export default NavbarProfile