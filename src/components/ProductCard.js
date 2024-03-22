

// export default function CourseCard({courseProp}) {

// 	// Checks to see if the data was successfully passed
// 	// Every component receives information in a form of an object
// 	// console.log(props);
// 	// console.log(typeof props);

// 	const {name, description, price} = courseProp;

// 	return (
// 		<Card>
// 			<Card.Body>
// 				<Card.Title>{name}</Card.Title>
// 				<Card.Subtitle>Description:</Card.Subtitle>
// 				<Card.Text>{description}</Card.Text>
// 				<Card.Subtitle>Price:</Card.Subtitle>
// 				<Card.Text>{price}</Card.Text>
// 				<Button variant="primary">Enroll</Button>
// 			</Card.Body>
// 		</Card>

// 	)
// }
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';



export default function ProductCard({productProp}) {

	// Checks to see if the data was successfully passed
	// Every component receives information in a form of an object
	// console.log(props);
	// console.log(typeof props);

	const {_id, name, description, price} = productProp;


	// Use the state hook for this component to be able to store its state (data)
	// States are used to keep track of information related tp individual components
	/*
		Syntax:
			const [getter, setter] = useState(initialGetterValue);

		Example: 
			const [useers or products, setProducts] = useState([]);	
	*/
	const [count, setCount] = useState(0);

	// console.log(useState(0));

	const [seats, setSeats] = useState(30)

	const [btnDisable, setBtnDisable] = useState(false)

	// function enroll(){
	        
	//         if(seats > 0){
	//             setCount(count + 1);
	//             setSeats(seats - 1);
	            
	//         } else{
	//             setBtnDisable(true)
	//             alert("No more seats.")
	//         }
	//     }
console.log(_id);
	return (
		<Card>
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle>Description:</Card.Subtitle>
				<Card.Text>{description}</Card.Text>
				<Card.Subtitle>Price:</Card.Subtitle>
				<Card.Text>{price}</Card.Text>
				<Card.Text>Order/s: {count}</Card.Text>
				<Link className="btn btn-primary" to={`/products/${_id}`}>View</Link>
			</Card.Body>
		</Card>

	)
}


// Check if the ProductCard component is getting the correct prop types
ProductCard.propTypes = {
	// The "shape" method is used to check if a prop object conforms to a specific shape
	productProp: PropTypes.shape({
		// Define the properties and their expected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}


// import {Row, Col, Card, Button} from "react-bootstrap" 

// export default function CourseCard(){

// 	return(

// 		<Card className="p-3" id="courseComponent1">
// 			<Card.Title>
// 				<h3>Sample Course</h3>
// 			</Card.Title>
// 			<Card.Body>
// 				<Card.Subtitle>Description:</Card.Subtitle>
// 				<Card.Text>This is a sample course offering.</Card.Text>
// 				<Card.Subtitle>Price:</Card.Subtitle>
// 				<Card.Text>PhP 40,000</Card.Text>
// 				<Button variant="primary">Enroll</Button>
// 			</Card.Body>
// 		</Card>


// 		)
// }


// export default function CourseCard() {

//     return (
//         <Row>
//                 <Card className="mt-3" id="courseComponent1">
//                     <h3>Sample Course</h3>
//                         <h5>Description</h5>
//                             <p>Opportunities for everyone, everywhere.</p>
//                         <h5>Price</h5>
//                             <p>PHP 40,000</p>

//                     <Button variant="primary">Enroll</Button>
//                 </Card>
//         </Row>
//     )
// }



// import {Row, Col, Card} from "react-bootstrap"

// export default function CourseCard(){

//     return(
//             <Row className="mt-3 mb-3">
//                <Col xs={12} md={4}>
//                    <Card className="p-3" id="courseComponent1">
//                     </Card>
//                </Col>
//             </Row>
//         )
// }





	



