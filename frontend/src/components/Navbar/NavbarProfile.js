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

const NavbarProfile = props => {
    const [userName, setUserName] = useState('');
    const [notifications, setNotifications] = useState([]);
    let navigate = useNavigate();

    const fetchData = async () => {
        const { data } = await getUserDataForNavbar();
        setUserName(data.user_name);
        setNotifications(data.notifications);
    };

    useEffect(() => {
       fetchData(); 
    }, []);

    const handleLogout = () => {
        const response = logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <MDBRow className='w-100 mx-0'>
            <MDBCol md='7' className=' d-flex flex-row justify-content-end align-items-center '>
            <MDBNavbarItem>
                <MDBNavbarLink href='#'>
                <MDBIcon fas icon="bell fa-1x  ms-8" style={{ color: 'white' }} />
                <span className="badge rounded-pill badge-notification bg-danger">{(notifications.length !== 0) && notifications.length}</span>
                </MDBNavbarLink>
            </MDBNavbarItem>
            </MDBCol>
            <MDBCol md='5' className='d-flex flex-row justify-content-end'>
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