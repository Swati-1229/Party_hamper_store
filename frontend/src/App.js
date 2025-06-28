import './App.css';
import Home from './Components/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cakes_collection from './Components/Cakes_collection';
import Product_Details from './Components/Product_Details';
import Header from './Components/Header';
// import wishlist from './Components/Wishlist';
import Wishlist from "./Components/Wislist";
import Add_to_cart from './Components/Add_to_cart';
import Address_Details_Page from './Components/Address_Details_Page';
import CheckOutPage from './Components/CheckOutPage';
// import Wishlist from './Components/Wislist';
import LoginPage from './Components/Login_Page';
import SignupPage from './Components/SignupPage';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='Cakes_collection' element={<Cakes_collection></Cakes_collection>}></Route>
          <Route path="/product/:id" element={<Product_Details></Product_Details>}></Route>
          <Route path="/Header" element={<Header></Header>}></Route>
          {/* <Route path="/wishlist" element={<Wishlist></Wishlist>}></Route> */}
          {/* <Route
            path="/Cakes_collection"
            element={
              <Cakes_collection
                wishlist={wishlisted}
                toggleWishlist={toggleWishlist}
              />
            }
          /> */}

          <Route
            path="/wishlist"
            element={
              <Wishlist
              />
            }
          />
          <Route path="/Addtocart" element={<Add_to_cart ></Add_to_cart>}></Route>
          <Route path="/AddressDetailsPage" element={<Address_Details_Page></Address_Details_Page>}></Route>
          <Route path="/CheckOutPage" element={<CheckOutPage></CheckOutPage>}></Route>
          <Route path="/LoginPage" element={<LoginPage></LoginPage>}></Route>
          <Route path="/SignupPage" element={<SignupPage></SignupPage>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
