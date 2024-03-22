// this file act like .html file but exclusive for navbar only
import { useState, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink} from "react-router-dom";
import UserContext from "../UserContext";

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	console.log(user); // checking if we recieved the login tokin

	return (
		// JSX
		<Navbar bg="light" expand="lg">
		    <Container fluid>
		        <Navbar.Brand href="#home">Welcome to Odchigue Furniture</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
		        <Navbar.Collapse id="basic-navbar-nav">
		            <Nav className="ms-auto">
			            <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
			            <Nav.Link as={NavLink} to="/products" exact>Our Products</Nav.Link>

			            {(user.id !== null) ?

			            	(user.isAdmin) ?
			            	
				            	<>
				            		<Nav.Link as={NavLink} to="/addProduct" exact>Add Product</Nav.Link> {/*activity solution s59 step 2.*/}
				            		<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
				            	</>

				            	:
				            	<>
				            		<Nav.Link as={NavLink} to="/profile" exact>Profile</Nav.Link> 
				            		<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
				            	</>

			            	:

			            	<>
								<Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
								<Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
			            	</>

			            }

		   		    </Nav>
		        </Navbar.Collapse>
		    </Container>
		</Navbar>
	)
}
			            	
			            	
			           


