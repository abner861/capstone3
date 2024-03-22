// This file is our Main Component
import { useState, useEffect } from 'react'; // 1
import { UserProvider } from './UserContext'; // 1

//   This file is our Main Component
// import logo from './logo.svg';
import './App.css';

// Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import React Router DOM
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

// Pages
import AppNavbar from './components/AppNavbar'; // 1

import Home from './pages/Home'
import Register from './pages/Register' // 1
import Login from './pages/Login'; // 1
import Logout from './pages/Logout'; // 1
import ProductView from './pages/ProductView';
import Products from './pages/Products' // 2
import AddProduct from './pages/AddProduct'; // step 1/s66








// Bootstrap
import { Container } from 'react-bootstrap'; // 1

function App() {
  // State hook for user state that's defined here for a global scope
  // This will be used to store the user information and will be used for validating if a user is logged in on the app or not
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  // Used to check if the user information is properly stored upon login and the localStorage information is cleared upon logout.
  useEffect(() => {
    console.log(user);
    console.log(localStorage);

    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Changes the global "user" state to store the "id" and the "isAdmin" properties of the user which will be used for validation across the whole application
      if(typeof data._id !== "undefined"){

        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        })
      } else {

        setUser({
          id: null,
          isAdmin: null
        })
      }

    })

  }, []);

  return (
    // JSX - JavaScript XML
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <Container fluid> {/* pati pud sir si Container wala pa sad naimport gikan sa react-bootstrap */}
          <AppNavbar /> {/* Wala pa nato naimport sir is AppNavBar sa taas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            {<Route path="/products" element={<Products />} />}
            {/*<Route path="/profile" element={<Profile />} />*/} {/*step 2*/}
            <Route exact path="/products/:productId" element={<ProductView />} />
            {<Route path="/AddProduct" element={<AddProduct/>} />} {/*activity solution s59 step 3 then import above*/}
            <Route path="/logout" element={<Logout/>} />

            {/*<Route path="*" element={<Error />} />*/}
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
