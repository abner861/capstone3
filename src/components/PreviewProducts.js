// step 3 Session 60- React JS - Feature Development and Common Use Case
import	{ Col, Card	} from	"react-bootstrap";
import	{ Link } from "react-router-dom";


export	default	function  ({data, breakPoint}) {

	// Destructure the courses the data here
	const { _id, name, description, price } = data;

	return	(
			<Col xs={12} md={breakPoint}>
				<Card className="cardHighlight mx-2">
					<Card.Body>
						<Card.Title className="text-center">
							<Link to={`/products/${_id}`}>{name}</Link>
						</Card.Title>
							<Card.Text>{description}</Card.Text>
							<Card.Footer>
								<h5 className="text-center">₱{price}</h5>
								<Link to={`/products/123`} className="btn btn-primary d-block">View</Link>
							</Card.Footer>	
					</Card.Body>
				</Card>
			</Col>

	)
}


