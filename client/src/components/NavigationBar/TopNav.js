import React, { useState, useContext } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button
  } from 'reactstrap';
import { UserContext } from '../../user-context';
import "../../pages/Dashboard/Dashboard.css";
import './assets/css/main.css'

const TopNav = () => {

    const [isOpen, setIsOpen] = useState(false);
    
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    // const [collapsed, setCollapsed] = useState(true);
  
    // const toggleNavbar = () => setCollapsed(!collapsed);
  
    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        setTimeout(() => {
            setIsLoggedIn(false);
        }, 500);
    }
    
  const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div  style={{background: "#1c1c1c", color: "#d5d5d5"}}>
//       <Navbar dark expand="md" style={{background: "#1c1c1c", color: "#d5d5d5",display:'flex', justifyContent:'space-evenly'}}>
//         <NavbarBrand href="/" style={{marginLeft:"5em"}}>
//             <a href="/" className="navbarLogo">Down To Meet</a>
//         </NavbarBrand>
//           <div style={{marginLeft:"1em"}}></div>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mr-auto" navbar>
//             <NavItem>
//               <NavLink href="/" style={{color:"#d5d5d5"}}>Dashboard</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/events" style={{color:"#d5d5d5"}}>Create event</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/myregistrations" style={{color:"#d5d5d5"}}>Registration Requests</NavLink>
//             </NavItem>
//           </Nav>
//           <Nav>
//           <a href="/login" style={{ color: "Red" }} onClick={logoutHandler}>                         <Button color="danger">Logout</Button></a>
//           </Nav>
//           <div style={{marginLeft:"1em"}}></div>
//           <NavbarText >Akshit Soneji</NavbarText>
//         </Collapse>
//       </Navbar>
//       <div style={{lineHeight:"80px"}} />

//     </div>
//   )
    return isLoggedIn ?
    <div  style={{background: "#1c1c1c", color: "#d5d5d5",paddingBottom:"80px"}}>
    <Navbar dark expand="md" style={{background: "#1c1c1c", color: "#d5d5d5",display:'flex', justifyContent:'space-evenly',position: "fixed",top: 0,width: "100%",zIndex:99999}}>
      <NavbarBrand href="/">
          <a href="/" className="navbarLogo">Down To Meet</a>
      </NavbarBrand>
        {/* <div style={{marginLeft:"5em"}}></div> */}
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar style={{display:"flex", justifyContent:"space-between"}}>
          <NavItem>
            <NavLink href="/" style={{color:"#d5d5d5"}}>Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/events" style={{color:"#d5d5d5"}}>Create event</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/myregistrations" style={{color:"#d5d5d5"}}>Registration Requests</NavLink>
          </NavItem>
        </Nav>
        <NavbarText ><strong></strong></NavbarText>
        <div style={{marginLeft:"1em"}}></div>
        <Nav>
        <a href="/login" style={{ color: "Red" }} onClick={logoutHandler}>                         <Button color="danger">Logout</Button></a>
        </Nav>
        <div style={{marginLeft:"1em"}}></div>
        <NavbarText >Made by Akshit Soneji</NavbarText>
      </Collapse>
    <div style={{lineHeight:"80px"}} />
    </Navbar>
  </div>
    :
    <div  style={{background: "#1c1c1c", color: "#d5d5d5"}}>
      <Navbar dark expand="md" style={{background: "#1c1c1c", color: "#d5d5d5",display:'flex', justifyContent:'space-evenly'}}>
        <NavbarBrand href="/" style={{marginLeft:"1em"}}>
            <a href="/" className="navbarLogo">Down To Meet</a>
        </NavbarBrand>
        <NavbarText>Made by Akshit Soneji</NavbarText>
        </Navbar>
    </div>
}

export default TopNav;