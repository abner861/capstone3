import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

import { Navigate } from "react-router-dom"; // s58 activity solution // 1
import UserContext from '../UserContext'; // s58 activity solution // 1


export default function Register() {

	const { user } = useContext(UserContext);
	// State hooks to store the values of the input fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(true);
	
	// Check if values are successfully binded
	console.log(email);
	console.log(password);
	console.log(confirmPassword);

	// Handler function for registering our user 
	function registerUser(e) {

		// Prevents page reload everytime we submit in the form
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({

				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data){

				// To reset the form fields after registration alert pops up.
				setEmail("");
				setPassword("");
				setConfirmPassword("");

				alert("Thank you for registering");
			} else {
				alert("Please try again later.")
			}
		})
	}



	// useEffect is used to create "side effects" or execute a codeblock everytime the component renders or if there are changes in the state that is listed in the dependecy array
	useEffect(() => {
		// Check if the fields are filled properly, checks if the password matches the confirm password, and checks if the length of mobileNo is 11.
		if(
			(email !== "" &&
			password !== "" &&
			confirmPassword !== "") &&
			(password === confirmPassword)
		
			
		) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}

		// Dependency Array
	}, [email, password, confirmPassword]);

	return (
		(user.id !== null) ? // s58 activity solution
			<Navigate to="/" />
		:
		<div className="container d-flex justify-content-center">
			<Card className="mt-5" style={{ width: '35rem' }}>
				<h1 className="text-center p-2">Register</h1>
		   		<Card.Body>
					<Form onSubmit={(e) => registerUser(e)} >
				<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control 
						type="email" 
						placeholder="Enter Email" 
						required 
						value={email}
						onChange={e => {setEmail(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control 
						type="password" 
						placeholder="Enter Password." 
						required 
						value={password}
						onChange={e => {setPassword(e.target.value)}}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Confirm Password:</Form.Label>
					<Form.Control 
						type="password" 
						placeholder="Confirm Password." 
						required 
						value={confirmPassword}
						onChange={e => {setConfirmPassword(e.target.value)}}
					/>
				</Form.Group>

						{/* conditionally render submit button based on isActive state */}

						<div className="d-flex justify-content-end">
							{ isActive ?
								<Button className="mt-2" variant="primary" type="submit" >Submit</Button>
								:
								<Button className="mt-2" variant="danger" type="submit" >Submit</Button>
							}
						</div>
					</Form>
		   		</Card.Body>
		 	</Card>	
		</div>
	)
}




			