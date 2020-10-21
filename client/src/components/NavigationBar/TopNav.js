import React, { useState, useContext } from 'react';
import {
    Nav,
    NavLink,
    Button,
} from 'reactstrap';
import { UserContext } from '../../user-context';
import "../../pages/Dashboard/Dashboard.css";
import './assets/css/main.css'

const TopNav = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        setTimeout(() => {
            setIsLoggedIn(false);
        }, 500);
    }

    return isLoggedIn ?
        <div>

            <header id="header">
                <div className="inner">
                    <a href="/" className="logo">Down To Meet</a>
                    <Nav className="mr-auto" id="nav">
                        <NavLink href="/" style={{ color: "white" }}>Dashboard</NavLink>
                        <NavLink href="/events" style={{ color: "white" }}>Create Event</NavLink>
                        <NavLink href="/myregistrations" style={{ color: "white" }}>Registrations Request</NavLink>
                        <NavLink href="/login" style={{ color: "Red" }} onClick={logoutHandler}>
                            <Button color="danger">Logout</Button>
                        </NavLink>
                    </Nav>
                </div>
            </header>

            <a href="#menu" className="navPanelToggle"><span className="fa fa-bars"></span></a>
        </div>
        :
        <div><header id="header">
            <div className="inner">
                <center><a href="/" className="logo">Down To Meet</a></center>
            </div>
        </header>
        </div>;
}

export default TopNav;