// activity solution s60 step 3.Modify the Courses.js page If the user is an Admin, Show the Admin Dashboard If not, Show the Regular Courses Page.

import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Navigate, Link } from "react-router-dom";
import ArchiveProduct from './ArchiveProduct'; // step 2 (2) for acrchieving courses

import EditProduct from './EditProduct'; // activity solution s60 step 2. for Editing course also line 24.


 
export default function AdminView({ productsData, fetchData }) {

	const [products, setProducts] = useState([]);


	useEffect(() => {
		const productArr = productsData.map(product => {
			return (
				<tr>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>{product.isActive ? "Available" : "Unavailable"}</td>
					<td><EditProduct product={product._id} fetchData={fetchData} /></td>
					<td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} /></td> {/*step 2 (1) for acrchieving courses*/}
					{/*<td><button className="btn btn-danger">Archive</button></td>*/}
				</tr>

			)
		})

		setProducts(productArr);

	}, [productsData])

	return (
		<>
			<div className="container text-center mb-3">
				<h1 className="my-4">Admin Dashboard</h1>
				<Link className="btn btn-primary mx-2" to="/addProduct">Add New Product</Link>
				<Link className="btn btn-success" to="{`/products/${_id}`}">Show User Orders</Link>
			</div>

			<Table table-md-6 sm-12 striped bordered hover responsive>
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th colSpan="2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products}
				</tbody>
			</Table>
		</>
	)
}