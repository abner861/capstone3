// activity solution s60 step 1. for Editing course
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }){

	// state for courseId for the fetch URL
	const [productId, setProductId] = useState('');

	//Forms state
	// Add state for the forms of course
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	// state for editCourse Modals to open/close
	const [showEdit, setShowEdit] = useState(false);


	// Function for opening the modal
	const openEdit = (productId) => {

		console.log("productId", productId);

		// to still get the actual data from the from
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			// Populate all the input values with course info
			setProductId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		});

		// Then, open the modal
		setShowEdit(true);

	}

	const closeEdit = () => {
		setShowEdit(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	// Function to update the course
	const editProduct = (e, productId) => {

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
			method: "PUT",
			headers: {
				'Content-Type': "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data === true){
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product Successfully Updated'
				});

				closeEdit();
				// Trigger the fetchData function from the Courses component to render the changes created when updating the course.
				fetchData();
			} else {
				Swal.fire({
					title: "Error!",
					icon: 'error',
					text: 'Please try again'
				});

				closeEdit();
				fetchData();
			}

		})

	}



	return (
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Edit</Button>

			{/*EDIT MODAL*/}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={ e => editProduct(e, product) }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={name}
                            	onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
	                            type="text" 
	                            required
	                            value={description}
	                            onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
	                            type="number" 
	                            required
	                            value={price}
	                            onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

		</>

	)
}