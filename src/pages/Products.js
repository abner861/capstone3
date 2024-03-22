// Import the mock data // Parent components
// import coursesData from '../data/coursesData';
// Import CourseCard component
import { useEffect, useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';

import UserContext from "../UserContext"; // activity solution s60 step 1.
import UserView from "../components/UserView"; // activity solution s60 step 1.
import AdminView from "../components/AdminView"; // activity solution s60 step 1.

export default function Products() {

	// // Check to see if the mock data was captured
	// console.log(coursesData);

	const { user } = useContext(UserContext);

	const [products, setProducts] = useState([]);

	const fetchData = () => {

		// get all active products
		fetch(`${process.env.REACT_APP_API_URL}/b4/products/all`) 
		.then(res => res.json())
		.then(data => {

			console.log("data", data);

			// Sets the "products" state to the data retrieve from the fetch request
			setProducts(data);

		})
	}

	useEffect(() => {

		fetchData();

	}, [])



	return (
		<>
			{user.isAdmin === true ?
				<AdminView productsData={products} fetchData={fetchData} />
			:
				<UserView productsData={products} />

			}
		</>
	)
}
