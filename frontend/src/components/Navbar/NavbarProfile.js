import React, { useEffect, useState } from 'react'
import {
    MDBDropdown, 
    MDBDropdownMenu, 
    MDBDropdownToggle, 
    MDBDropdownItem,
    MDBRow,
    MDBCol,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon
} from 'mdb-react-ui-kit';
import { getUserDataForNavbar, logout } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider';
import CustomAlert from '../Misc/CustomAlert';
import { Skeleton } from '@mui/material';

const NavbarProfile = props => {
    const [userName, setUserName] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [alertData, setAlertData] = useState({
        showAlert: false,
        severity: "",
        message: ""
    });
    const { setAuth } = useAuth();
    let navigate = useNavigate();

    const fetchData = async () => {
        const { data } = await getUserDataForNavbar();
        setUserName(data.user_name);
        setNotifications(data.notifications);
    };

    useEffect(() => {
       fetchData(); 
    }, []);

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

    return (
        <MDBRow className='w-100 mx-0'>
            <CustomAlert alertData={alertData} setAlertData={setAlertData} />
            <MDBCol className=' d-flex flex-row justify-content-end align-items-center '>
            <MDBNavbarItem>
                <MDBNavbarLink href='#'>
                <MDBIcon fas icon="bell fa-1x" style={{ color: 'white' }} />
                <span className="badge rounded-pill badge-notification bg-danger">{(notifications.length !== 0) && notifications.length}</span>
                </MDBNavbarLink>
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