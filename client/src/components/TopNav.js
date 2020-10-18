import React, { useState, useContext } from 'react';
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  Button,
  Jumbotron,
  Container
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { UserContext } from '../user-context';
import "../pages/Dashboard/Dashboard.css";
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
				<div class="inner">
					<a href="/" class="logo">Down To Meet</a>
					<Nav className="mr-auto" id="nav">
                        <NavLink href="/" style={{color:"white"}}>Dashboard</NavLink>
                        <NavLink href="/events" style={{color:"white"}}>Create Event</NavLink>
                        <NavLink href="/myregistrations" style={{color:"white"}}>Registrations Request</NavLink>
                        <NavLink href="/login" style={{color:"Red"}} onClick={ logoutHandler }>
                    <Button color="danger">Logout</Button>
                    </NavLink>
                    </Nav>
				</div>
		</header>

    	<a href="#menu" class="navPanelToggle"><span class="fa fa-bars"></span></a>
            {/* <Navbar color="primary" light expand="md" style={{backgroundColor: "#071740", position: "sticky"}} variant="dark" fixed="top">
            <NavbarBrand href="/" style={{color:"white",fontWeight:"bold"}}>Down To Meet</NavbarBrand>

                <Nav className="mr-auto">
                    <NavLink href="/" style={{color:"white"}}>Dashboard</NavLink>
                    <NavLink href="/events" style={{color:"white"}}>Create Event</NavLink>
                    <NavLink href="/myregistrations" style={{color:"white"}}>Registrations Request</NavLink>
                </Nav>
                <Button color="danger"><Link to="/login" style={{color:"white"}} onClick={ logoutHandler }>Logout</Link></Button>
                
            </Navbar>  */}
            
         </div>
        : 
        <div><header id="header">
            <div class="inner">
                <center><a href="/" class="logo">Down To Meet</a></center>    
            </div>
        </header>
        </div>;
}

export default TopNav;