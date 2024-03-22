// Use Object Destructuring when importing react-bootstrap component
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

// export default function Banner() {

// 	return (
// 		<Row>
// 			<Col className="p-5 text-center">
// 				<h1>Zuitt Coding Bootcamp</h1>
// 				<p>Opportunities for everyone, everywhere.</p>
// 				<Button variant="primary">Enroll now!</Button>
// 			</Col>
// 		</Row>
// 	)
// }

// Activity solution for 57 React.js - Routing and Conditional Rendering
export default function Banner({data}) {

	console.log(data);
	const {title, content, destination, label} = data;

	return (
		<Row>
			<Col className="p-5 text-center">
				<h1>{title}</h1>
				<p>{content}</p>
				<Link className="btn btn-primary" to={destination} > {label}</Link>
			</Col>
		</Row>
	)
}


// Group 3 Josh code----------------------
// import React from 'react';
// import { Button, Row, Col } from 'react-bootstrap';
// import Nav from 'react-bootstrap/Nav';
// import { NavLink } from 'react-router-dom';

// export default function Banner({ isNotFoundPage }) {
//   return isNotFoundPage ? (
//     <Row>
//       <Col>
//         <h1>Page Not Found</h1>
//         <p>Go back to the <Nav.Item as={NavLink} to="/" exact>homepage</Nav.Item></p>
//       </Col>
//     </Row>
//   ) : (
//     <Row>
//       <Col className="p-5 text-center">
//         <h1>Zuitt Coding Bootcamp</h1>
//         <p>Opportunities for everyone, everywhere</p>
//         <Button variant="primary">Enroll now!</Button>
//       </Col>
//     </Row>
//   );
// }