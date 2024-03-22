// activity solution @ s57 React.js - Routing and Conditional Rendering; line 39: route
import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts'; // step 2 Session 60- React JS - Feature Development and Common Use Case


export default function Home() {

	const data = {
		title: "Modern Modular Design",
		content: "Modular Marvels, Your Space, Your Way!",
		destination: "/products",
		label: "Buy now!"
	}

	return(
		<>
			<Banner data={data}/>
			<FeaturedProducts />
			<Highlights />
		</>
	)
}


// Group 3 Josh code----------------------
// import Banner from "../components/Banner"
// import Highlights from "../components/Highlights"


// export default function Home() {

//     return(
//         <>
//         <Banner isNotFoundPage={false} />
//         <Highlights />
//         </>
//         )
// }