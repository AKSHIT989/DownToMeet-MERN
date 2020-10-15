import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../user-context';
import "../pages/Dashboard/Dashboard.css";

const TopNav = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        setIsLoggedIn(false);
    }

    return isLoggedIn ?
        <div>
            <Navbar color="faded" light>
                {/* <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand> */ }
                <NavbarToggler onClick={ toggleNavbar } />
                <Link to="/login" onClick={ logoutHandler } className="logoutBtn">Logout</Link>
                <Collapse isOpen={ !collapsed } navbar>
                    <Nav navbar>
                        <NavItem>
                            <Link to="/">Dashboard</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/events">Create Event</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/myregistrations">My Registrations</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
        : "";
}

export default TopNav;