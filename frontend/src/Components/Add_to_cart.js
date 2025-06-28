import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Add_to_cart.css"
import { cake_collections } from './Data';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Add_to_cart() {
    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const [quantity, setQuantity] = useState(0);

    //  function to update cart quantity in localStorage
    const updateCartQuantityInStorage = (updatedCart) => {
        const totalQuantity = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
        localStorage.setItem("cartQuantity", totalQuantity);
        console.log("asb", totalQuantity)



    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
        console.log("storecart", storedCart)
        const totalQuantity = storedCart.reduce((acc, item) => acc + item.quantity, 0);
        setQuantity(totalQuantity);

    }, []);
    const handleIncrease = (id) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                // return { ...item, quantity: item.quantity + 1 };
                const updatedItem = { ...item, quantity: item.quantity + 1 };
                // console.log(`Item ID: ${id}, Updated Quantity: ${updatedItem.quantity}`, `quantity:${item}`); // ✅ Correct
                return updatedItem;
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateCartQuantityInStorage(updatedCart);
    }

    const handleDecrese = (id) => {
        const item = cart.find((item) => item.id === id);

        if (item.quantity <= 1) {
            alert("Quantity cannot be less than 1");
            return;
        }
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateCartQuantityInStorage(updatedCart); // ✅ Add this
    };
    const confirmRemove = (id) => {
        setItemToRemove(id);
        setShowModal(true);
    };

    const handleRemove = () => {
        const updatedCart = cart.filter(item => item.id !== itemToRemove);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        // alert("Are youbsure you want to delete")
        setShowModal(false)
        updateCartQuantityInStorage(updatedCart); // ✅ Add this

    };

    const cancelRemove = () => {
        setItemToRemove(null);
        setShowModal(false);
    };
    const discount = 50;
    const MRPTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = MRPTotal + discount;

    const navigate = useNavigate()
    const goToCheckOutPage = () => {
        navigate('/CheckOutPage', { state: { MRPTotal, total, discount } });
    };
    return (
        <div>
            <div className='' style={{ marginBottom: "82px" }}>
                <div class="container mt-4">
                    <ul class="nav justify-content-between">
                        <li class="nav-item flex-fill text-center">
                            <a class="nav-link active" aria-current="page">1. Cart</a>
                        </li>
                        <li class="nav-item flex-fill text-center">
                            <a class="nav-link">2. Address</a>
                        </li>
                        <li class="nav-item flex-fill text-center">
                            <a class="nav-link">3. Personalize</a>
                        </li>
                        <li class="nav-item flex-fill text-center">
                            <a class="nav-link">4. Payment</a>
                        </li>
                    </ul>
                    <div class="progress mt-3" style={{ height: "5px" }}>
                        <div class="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>

            <div className='Addedproductsection'>
                {/* <h2 className='Cart-title'>
                    🛒Cart </h2> */}

                {cart.length === 0 ? (
                    <p className='cartempty'>Cart Empty</p>
                ) : (
                    <div className="add-to-cart-sections" >
                        <div className='Cart-Part '>
                            <div className='Cart'>
                                {cart.map((item) => (
                                    <div className='added-product-container' key={item.id}>
                                        <div className='added-product-section' style={{
                                        }}>
                                            <div className='product-image-section' >
                                                <div className='product-image'>
                                                    <img src={item.image}></img>
                                                </div>
                                            </div>
                                            <div className='added-product-details'>
                                                <div>
                                                    <h3>{item.name}</h3>
                                                </div>
                                                <p className='EsDlv'>
                                                    Estimate Delivery:
                                                    <span className='dte'>Today</span>
                                                </p>
                                                <div>
                                                    <div style={{
                                                        padding: "0",
                                                        fontSize: " 12px",
                                                        minHeight: "25px",

                                                    }}>
                                                        <div className='prdtQty'>
                                                            "Qty":
                                                            <button onClick={() => handleDecrese(item.id)} style={{ padding: "2px 8px", fontSize: "16px" }}>-</button>
                                                            <span className='countqnty'>{item.quantity}</span>
                                                            <button onClick={() => handleIncrease(item.id)} style={{ padding: "2px 8px", fontSize: "16px" }}>+</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='item-price' style={{ width: "17%", alignItems: "center", justifyContent: "center" }}>
                                                <div>
                                                    <h3>{item.price * item.quantity}</h3>
                                                    <span className='delete-item-wrapper '>
                                                        <a className="remove-btn" onClick={() => confirmRemove(item.id)}>
                                                            <img src="https://assets.winni.in/groot/2023/03/13/desktop/gift-box/delete-icon-blue.png" style={{ width: "11px", verticalAlign: "textTop" }} />Remove
                                                        </a>
                                                    </span>
                                                </div>
                                                {/* <p>{item.flavor}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                )

                                )}
                                {showModal && (
                                    <div className="modal show fade" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1" role="dialog">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Remove Item</h5>
                                                    <button type="button" className="close" onClick={cancelRemove}>
                                                        <span>&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>Are you sure you want to remove this item from the cart?</p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={cancelRemove}>
                                                        Cancel
                                                    </button>
                                                    <button type="button" className="btn btn-danger" onClick={handleRemove}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='totl-price-container-part'>

                            <div className='totl-price-container'>
                                <div className='totl-price-container-section'>
                                    <h3 className="total-price-title">Order Summary</h3>
                                    <div className="price-row">
                                        <span>MRP Total</span>
                                        <span>{MRPTotal}</span>
                                    </div>
                                    <div className="price-row">
                                        <span>Delivery Fee</span>
                                        <span>₹{discount}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Total Amount</span>
                                        <span>{total}</span>
                                    </div>
                                </div>
                                <button className="checkout-btn" onClick={goToCheckOutPage}>Proceed to Checkout</button>

                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
