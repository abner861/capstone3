import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Navigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import UserContext from "../UserContext";

export default function Login() {

	// Allows us to consume the User context object and it's properties to use for user validation
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(false)

	function authenticate(e){
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/b4/users/login`, {
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

			// If no user infromation is found, the "access" property will not be available and will return undefined
			if(typeof data.access !== "undefined") {

				// Set the token of the authenticated user in the local storage
				// Syntax:
					// localStorage.setItem("propertyName", value)
				localStorage.setItem("token", data.access);

				// function for retrievcing details
				retrieveUserDetails(data.access);

				// alert('You are now logged in');
				Swal.fire({
					title: "Login Successful",
					icon: "success",
					text: "Welcome to Odchigue Furniture!"
				})

				// Set the global state "user" to the token recieved from logged in.
				// setUser({
				// 	token: localStorage.getItem("token")
				// });
				


			} else {
				// alert(`${email} does not exist`);
				Swal.fire({
					title: "authentication failed",
					icon: "error",
					text: "Check your login details and try again"
				})
			}
		});

		// Clear input fields after submission
		setEmail('');
		setPassword('');

	}


	const retrieveUserDetails = (token) => {

		fetch(`${process.env.REACT_APP_API_URL}/b4/users/retrieveUserDetails`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			// Changes the global "user" state to store the "id" and the "isAdmin" properties of the user which will be used for validation across the whole application
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	}
	useEffect(() => {

		if(email !== "" && password !== ""){
			setIsActive(true)
		} else {
			setIsActive(false)
		}

	}, [email, password]);

	return (
		(user.id !== null) ?
			<Navigate to="/products" />
			:
			<div className="container d-flex justify-content-center">
				<Card className="mt-5" style={{ width: '35rem' }}>
					<Card.Body>
						<Form onSubmit={(e) => authenticate(e)}>
							<h1 className="my-5 text-center">Login</h1>
							<Form.Group controlId="userEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control 
									type="email" 
									placeholder="Enter email" 
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control 
									type="password" 
									placeholder="Password" 
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>

							<div className="d-flex justify-content-end">
								{isActive ?
									<Button className="mt-2" variant="primary" type="submit" id="submitBtn">
										Submit
									</Button>
									:
									<Button className="mt-2" variant="danger" type="submit" id="submitBtn" disable>
										Submit
									</Button>
								}
							</div>
						</Form>       
					</Card.Body>
					<Card.Body>
						<h5 className="text-center">
						Don't have an account yet? <Link to="/register" className="click">Click here to register</Link></h5>
					</Card.Body>
				</Card>	
			</div>
	)
}
							


			
// --------------Divera member 5-------------

// import { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';


// export default function Login() {

// 	// State hooks to store the values of the input fields
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	// State to determine whether submit button is enabled or not
// 	const [isActive, setIsActive] = useState(true);
	
// 	// Check if values are successfully binded
// 	console.log(email);
// 	console.log(password);

// 	// Handler function for registering our user 
// 	function logIn(e) {

// 		// Prevents page reload everytime we submit in the form
// 		e.preventDefault();

// 		fetch('http://localhost:4000/users/login', {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json"
// 			},
// 			body: JSON.stringify({
// 				email: email,
// 				password: password
// 			})
// 		})
// 		.then(res => res.json())
// 		.then(data => {
// 			console.log(data);

// 			if(data){

// 				// To reset the form fields after registration alert pops up.
// 				setEmail("");
// 				setPassword("");

// 				alert("You are now logged in");
// 			} else {
// 				alert("Unsuccessful Login.");
// 			}
// 		})
// 	}



// 	// useEffect is used to create "side effects" or execute a codeblock everytime the component renders or if there are changes in the state that is listed in the dependecy array
// 	useEffect(() => {
// 	  // Check if the fields are filled properly, checks if the password matches the confirm password, and checks if the length of mobileNo is 11.
// 	  if (
// 	    email !== "" &&
// 	    password !== ""
// 	  ) {
// 	    setIsActive(true);
// 	  } else {
// 	    setIsActive(false);
// 	  }

// 	  // Dependency Array
// 	}, [email, password]);

// 	return (

// 		<Form onSubmit={(e) => logIn(e)} >
// 			<Form.Group>
// 				<Form.Label>Email:</Form.Label>
// 				<Form.Control 
// 					type="email" 
// 					placeholder="Enter Email" 
// 					required 
// 					value={email}
// 					onChange={e => {setEmail(e.target.value)}}/>
// 			</Form.Group>
// 			<Form.Group>
// 				<Form.Label>Password:</Form.Label>
// 				<Form.Control 
// 					type="password" 
// 					placeholder="Enter Password." 
// 					required 
// 					value={password}
// 					onChange={e => {setPassword(e.target.value)}}/>
// 			</Form.Group>

// 			{/* conditionally render submit button based on isActive state */}

// 			{isActive ? (
// 			  <Button variant="primary" type="submit">
// 			    Submit
// 			  </Button>
// 			) : (
// 			  <Button variant="danger" type="submit" disabled>
// 			    Submit
// 			  </Button>
// 			)}


			
// 		</Form>

// 	)
// }

// perfect--------------------------
// import { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';


// export default function Login() {

// // set ans use statte
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [isActive, setIsActive] = useState(true);


// // connect to backend
// function loginUser(e) {

// 		e.preventDefault();

// 		fetch('http://localhost:4000/users/login', {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json"
// 			},
// 			body: JSON.stringify({

// 				email: email,
// 				password: password
// 			})
// 		})
// 		.then(res => res.json())
// 		.then(data => {
// 			console.log(data);

// 			if(data){

// 				setEmail("");
// 				setPassword("");

// 				alert("Thank you for logging in");
// 			} else {
// 				alert("Unsuccessful Login")
// 			}
// 		})
// 	}


// // use effect 
// 	useEffect(() => {
// 		if(
// 			email !== "" &&
// 			password !== "" )
// 		 {
// 			setIsActive(true);
// 		} else {
// 			setIsActive(false);
// 		}

// 	}, [email, password,]);

// 	return (

// 	// form
// 		<Form onSubmit={(e) => loginUser(e)} >
// 			<h1>Login</h1>
// 			<Form.Group>
// 				<Form.Label>Email</Form.Label>
// 				<Form.Control 
// 					type="email" 
// 					placeholder="Enter your email" 
// 					required 
// 					value={email}
// 					onChange={e => {setEmail(e.target.value)}}
// 				/>
// 			</Form.Group>
// 			<Form.Group>
// 				<Form.Label>Password:</Form.Label>
// 				<Form.Control 
// 					type="password" 
// 					placeholder="Enter Password." 
// 					required 
// 					value={password}
// 					onChange={e => {setPassword(e.target.value)}}
// 				/>
// 			</Form.Group>

// 				{ isActive ?
// 				<Button className="mt-2 btn btn-success" type="submit">Submit</Button>
// 				:
// 				<Button className="mt-2 disabled" type="submit" >Submit</Button>
				
// 			}
// 		</Form>

// 		)
// }

// ------------------Filamor-----------------------
// import { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';

// export const Login = () => {
//     // State hooks to store the values of the input fields
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     // State to determine whether submit button is enabled or not
//     const [isActive, setIsActive] = useState(true);


//     // Handler function for registering our user 
//     function loginUser(e) {

//         // Prevents page reload everytime we submit in the form
//         e.preventDefault();

//         fetch('http://localhost:4000/users/login', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 email: email,
//                 password: password
//             })
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data);

//                 if (data.access) {

//                     // To reset the form field after registration
//                     setEmail("");
//                     setPassword("");

//                     alert("Thank you for loggin in");
//                     console.log(data);
//                 } else {
//                     alert("Unsuccessful login")
//                 }
//             })
//     }



//     // useEffect is used to create "side effects" or execute a codeblock everytime the component renders or if there are changes in the state that is listed in the dependecy array
//     useEffect(() => {
//         // Check if the fields are filled properly, checks if the password matches the confirm password, and checks if the length of mobileNo is 11.
//         if ((email !== "" ) && (password !== "")) {
//             setIsActive(true);
//         } else {
//             setIsActive(false);
//         }

//         // Dependency Array
//     }, [email,password]);

//     return (

//         <Form onSubmit={(e) => loginUser(e)} >
//             <Form.Group className='mb-3'>
//                 <Form.Label>Email:</Form.Label>
//                 <Form.Control
//                     type="email"
//                     placeholder="Enter Email"
//                     required
//                     value={email}
//                     onChange={e => { setEmail(e.target.value) }}
//                 />
//             </Form.Group>

//             <Form.Group className='mb-3'>
//                 <Form.Label>Password:</Form.Label>
//                 <Form.Control
//                     type="password"
//                     placeholder="Enter Password."
//                     required
//                     value={password}
//                     onChange={e => { setPassword(e.target.value) }}
//                 />
//             </Form.Group>

//             {/* conditionally render submit button based on isActive state */}

//             {isActive ?
//                 <Button variant="primary" type="submit" >Login</Button>
//                 :
//                 <Button variant="danger" type="submit" disabled>Login</Button>

//             }


//         </Form>

//     )
// }

