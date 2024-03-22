// activity solution s60 step 2.Modify the Courses.js page If the user is an Admin, Show the Admin Dashboard If not, Show the Regular Courses Page.

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import{ Container, Row, Col } from "react-bootstrap";

export default function UserView({productsData}){

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const productsArr = productsData.map(product => {

			if(product.isActive === true){
				return (
						<Col md={3}>
					     	<ProductCard className="col-3 min-height-100%" productProp={product} key={product._id}/>
					    </Col>
				)
			} else {
				return null
			}

		})

		setProducts(productsArr);
		<div className="row">
			{ products}
		</div>

	}, [productsData]);

	return (
		<>
			<Container>
			   <Row>
					{ products }		
			   </Row>
			 </Container>
		</>
	)
}

					


