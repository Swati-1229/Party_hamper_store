import React, { useState, useEffect } from 'react'
import "./Header.css"
import { Link } from 'react-router-dom';

function Header() {
    // const [showPopup, setShowPopup] = useState(false);
    const [activeCategory, setActiveCategory] = useState();
    const [count, setCount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showaccountmodalbox, setShowAccountModalBox] = useState(false)
    const toggleBox = () => {
        setShowAccountModalBox(prev => !prev);
    }


    useEffect(() => {
        const storeduserdata = JSON.parse(localStorage.getItem("loginUser")) || []
        if (storeduserdata) {
            setLoggedInUser(storeduserdata)
            console.log("logged", storeduserdata)

        }


    }, [])

    useEffect(() => {
        const updateQuantity = () => {
            const cartQuantity = parseInt(localStorage.getItem("cartQuantity")) || 0;
            setQuantity(cartQuantity);
        };
        updateQuantity();
    }, []);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
        setCount(stored.length);
    }, []);
    useEffect(() => {

        const handleWishlistUpdate = () => {
            const updated = JSON.parse(localStorage.getItem('wishlist')) || [];
            setCount(updated.length);
        };
        window.addEventListener("wishlistUpdated", handleWishlistUpdate)
        return () => {
            window.removeEventListener("wishlistUpdated", handleWishlistUpdate)
        }
    }, [])



    return (

        <div className='Header'>
            <div className='nav'>
                <a className='Help'> Help</a>
                <span >Currency-<strong>INR</strong> </span>
                <a className='CG'>Corporate Gifts</a>
                <span> Partner With Us</span>
                <a className='TO'>Track Order</a>
            </div>
            <div className='part2'>
                <div className='rows'>
                    <div className='col-1image'>
                        <img src='/images/th.jpg' alt='logo' className='logo' />
                    </div>
                    <div className='hide'>

                    </div>
                    <div className='col-1serchbar'>
                        <form className='search-form'>
                            <input
                                type='text'
                                className='search-input'
                            />
                            <button type='submit' className='search-button'>
                                🔍
                            </button>
                        </form>

                    </div>
                    <div className='col-1location-section'>
                        {/* <div className='location-section'> */}
                        <div className='top-right'>
                            <div className='location'>
                                <div className='citysearch'>
                                    <img src='https://flagcdn.com/w40/in.png' alt='India' className='flag' />
                                    <span className='country-code'>IND</span>
                                </div>
                                <div className='location-select-section'>
                                    <div className='location-section-section'>
                                        <div className='location-texts'>
                                            <span className='choose-location'>Choose Delivery Location</span>
                                        </div>
                                        <span className='edit'>✏️</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                    <div className='col-1icon-section'>
                        <div className='icon-group'>
                            <div className='account-box' onMouseLeave={() => setShowAccountModalBox(false)}>


                                {loggedInUser ? (
                                    <div className='icon Account' onMouseEnter={() => setShowAccountModalBox(true)}>
                                        <i class="bi bi-person-fill"></i>
                                        <span style={{ fontSize: "10px" }}>{loggedInUser.name}</span>
                                    </div>)
                                    : (<div className='icon Account' onMouseEnter={() => setShowAccountModalBox(true)}>
                                        <i class="bi bi-person-fill"></i>
                                    </div>
                                    )}
                                {showaccountmodalbox && (
                                    <div className='account-dropdown'>
                                        {loggedInUser ? (
                                            <div style={{
                                                borderBottom: "1px solid gray",
                                                lineHeight: "1.8"
                                            }}>
                                                <p style={{ fontSize: "14px", marginBottom: "0" }}>Hello,<span style={{ fontWeight: "600" }}>Ms.{loggedInUser.name}</span></p>
                                                <span>{loggedInUser.email}</span>
                                            </div>) : (
                                            <div>
                                                <h3 style={{ fontSize: "22px", fontWeight: "600" }}>
                                                    Welcome
                                                </h3>

                                                <p style={{ fontSize: "12px" }}>To access account and manage orders</p>
                                            </div>
                                        )

                                        }
                                        {!loggedInUser && (
                                            <div className='SignLoginbox'>
                                                <span><Link to="/SignupPAge" style={{ color: "#ff1493", textDecoration: "none" }}>SignIn</Link>/<Link to="/LoginPage" style={{ color: "#ff1493", textDecoration: "none" }}>Login</Link></span>
                                            </div>
                                        )
                                        }
                                        <p>My Address Book</p>

                                        {loggedInUser && (
                                            <p onClick={() => {
                                                localStorage.removeItem("loginUSer")
                                                setLoggedInUser(null)
                                            }}>Logout</p>
                                        )}
                                    </div>

                                )
                                }
                            </div>
                            <Link to='/wishlist'>
                                <div className='icon wishlists'>
                                    <i class="bi bi-suit-heart-fill"></i>
                                    <span class="badge rounded-pill badge-notification " style={{
                                        position: "absolute",
                                        top: "-7px",
                                        right: "-10px",
                                        fontSize: "11px",
                                        backgroundColor: " rgb(209, 42, 70)"
                                    }}>{count}</span>
                                </div>
                            </Link>
                            <Link to="/Addtocart">
                                <div className='icon addtocart'>
                                    <i class="bi bi-cart-fill"></i>
                                    <span class="badge rounded-pill badge-notification " style={{
                                        position: "absolute",
                                        top: "-5px",
                                        right: "-3px",
                                        fontSize: "11px",
                                        backgroundColor: " rgb(209, 42, 70)"
                                    }}>{quantity}</span>


                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* onMouseLeave={() => setShowPopup(false)} */}
            <div className='part3'>
                <ul className='Category'>
                    <li
                        onMouseEnter={() => setActiveCategory("EXPRESS")}
                        onMouseLeave={() => setActiveCategory(false)}
                        style={{ position: "relative", cursor: "pointer" }}
                    >
                        <span style={{ color: "#C91E39", fontWeight: "bold", fontSize: "14px" }}>
                            EXPRESS
                        </span>
                        {activeCategory === "EXPRESS" && (
                            <div style={{
                                paddingTop: "20px", position: "absolute",
                                top: "100%",
                                left: 0,
                                zIndex: 1000
                            }}>
                                <div style={{
                                    backgroundColor: "white", width: "180px", height: "auto"
                                    , boxShadow: " 5px 5px 3px 6px #00000029",
                                }}>

                                    <ul className="dropdown-list" style={{ color: "" }}>
                                        <li style={{ color: "black", margin: " 2px 0px 7px 0px" }}>
                                            <a>same day Delivery</a>
                                        </li>
                                        <li style={{ color: "gray", margin: " 7px 0px", background: "#f5f5f5", padding: "10px 0px" }}>
                                            <a>Cakes</a>
                                        </li>
                                        <li style={{ color: "gray", margin: " 7px 0px" }}>
                                            <a>Flowers</a>
                                        </li>
                                        <li style={{ background: "#f5f5f5", margin: " 7px 0px" }}>
                                            <a>Plants</a>
                                        </li>
                                        <li style={{ color: "gray", margin: " 7px 0px" }}>
                                            <a>Combos</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </li>

                    <li style={{ position: "relative", cursor: "pointer" }}
                        onMouseEnter={() => setActiveCategory("CAKES")}
                        onMouseLeave={() => setActiveCategory(null)}>

                        <span style={{ fontSize: "13px" }}>CAKES</span>
                        {activeCategory === "CAKES" && (
                            <div className="popup-wrapper">
                                <div className="popup-box winni-cakes-dropdown">
                                    <div className='cake-left'>
                                        <div className="column">
                                            <h4>Cakes By Type</h4>
                                            <ul>
                                                <li>Eggless Cakes</li>
                                                <li>Photo Cakes</li>
                                                <li>Heart Shape Cakes</li>
                                                <li>Number Cakes</li>
                                                <li>Tier Cakes</li>
                                                <li>Pinata Cakes</li>
                                                <li>Pull Me Up Cakes</li>
                                                <li>Bomb Cakes</li>
                                            </ul>
                                        </div>

                                        <div className="column">
                                            <h4>Cakes By Flavour</h4>
                                            <ul>
                                                <li>Chocolate Cakes</li>
                                                <li>Black Forest Cakes</li>
                                                <li>Butterscotch Cakes</li>
                                                <li>Vanilla Cakes</li>
                                                <li>Pineapple Cakes</li>
                                                <li>Red Velvet Cakes</li>
                                                <li>Strawberry Cakes</li>
                                            </ul>
                                        </div>

                                        <div className="column">
                                            <h4>Cakes By Occasion</h4>
                                            <ul>
                                                <li>Birthday Cakes</li>
                                                <li>Anniversary Cakes</li>
                                                <li>Wedding Cakes</li>
                                                <li>Baby Shower Cakes</li>
                                                <li>Congratulations Cakes</li>
                                                <li>Farewell Cakes</li>
                                            </ul>
                                        </div>

                                        <div className="column">
                                            <h4>Cakes By Recipient</h4>
                                            <ul>
                                                <li>For Kids</li>
                                                <li>For Him</li>
                                                <li>For Her</li>
                                                <li>For Parents</li>
                                                <li>For Siblings</li>
                                            </ul>
                                        </div>

                                        <div className="column">
                                            <h4>Cakes By City</h4>
                                            <ul>
                                                <li>Delhi</li>
                                                <li>Mumbai</li>
                                                <li>Bangalore</li>
                                                <li>Hyderabad</li>
                                                <li>Pune</li>
                                                <li>Chennai</li>
                                                <li>Kolkata</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="vertical-line"></div>
                                    <div className="cakes-right">
                                        <div className="trending-links">
                                            <div className="title">Top Trending Links</div>
                                            <ul>
                                                <li>Pinata Cakes</li>
                                                <li>Pull Me Up Cakes</li>
                                                <li>Bento Cake</li>
                                            </ul>
                                            <hr />
                                            <ul>
                                                <li><strong>All Cakes</strong></li>
                                                <li><strong>Best Seller Cakes</strong></li>
                                            </ul>
                                        </div>
                                        <div className='cakes-images'>
                                            <div className="image-section">
                                                <img src="/images/cake1.avif" alt="New Arrivals" />
                                                <span>NEW ARRIVALS</span>
                                            </div>
                                            <div className="image-section">
                                                <img src="/images/cake2.avif" alt="Premium Cakes" />
                                                <span>PREMIUM CAKES</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </li>
                    <li style={{ position: "relative", cursor: "pointer" }} onMouseEnter={() => setActiveCategory("FLOWERS")}
                        onMouseLeave={() => setActiveCategory(null)}>
                        <span style={{ fontSize: "13px" }}>FLOWERS</span>
                        {activeCategory === "FLOWERS" && (
                            <div className="popup-wrapper">
                                <div className="popup-box winni-cakes-dropdown">
                                    <div className='cake-left'>
                                        <div className="column">
                                            <h4>By Type</h4>
                                            <ul>
                                                <li>Eggless Cakes</li>
                                                <li>Photo Cakes</li>
                                                <li>Heart Shape Cakes</li>
                                                <li>Number Cakes</li>
                                                <li>Tier Cakes</li>
                                                <li>Pinata Cakes</li>
                                                <li>Pull Me Up Cakes</li>
                                                <li>Bomb Cakes</li>
                                            </ul>
                                        </div>

                                        <div className="column">
                                            <h4>By Occasion</h4>
                                            <ul>
                                                <li>Chocolate Cakes</li>
                                                <li>Black Forest Cakes</li>
                                                <li>Butterscotch Cakes</li>
                                                <li>Vanilla Cakes</li>
                                                <li>Pineapple Cakes</li>
                                                <li>Red Velvet Cakes</li>
                                                <li>Strawberry Cakes</li>
                                            </ul>
                                        </div>

                                        <div className="column">
                                            <h4>By Color</h4>
                                            <ul>
                                                <li>Birthday Cakes</li>
                                                <li>Anniversary Cakes</li>
                                                <li>Wedding Cakes</li>
                                                <li>Baby Shower Cakes</li>
                                                <li>Congratulations Cakes</li>
                                                <li>Farewell Cakes</li>
                                            </ul>
                                        </div>

                                        <div className="column">
                                            <h4>Flower By collection</h4>
                                            <ul>
                                                <li>For Kids</li>
                                                <li>For Him</li>
                                                <li>For Her</li>
                                                <li>For Parents</li>
                                                <li>For Siblings</li>
                                            </ul>
                                            <hr></hr>
                                            <div className="column">
                                                <h4>By Combo</h4>
                                                <ul>
                                                    <li>Delhi</li>
                                                    <li>Mumbai</li>
                                                    <li>Bangalore</li>
                                                    <li>Hyderabad</li>
                                                    <li>Pune</li>
                                                    <li>Chennai</li>
                                                    <li>Kolkata</li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="vertical-line"></div>
                                    <div className="cakes-right">
                                        <div className="trending-links">
                                            <div className="title">Top Trending Links</div>
                                            <ul>
                                                <li>Pinata Cakes</li>
                                                <li>Pull Me Up Cakes</li>
                                                <li>Bento Cake</li>
                                            </ul>
                                            <hr />
                                            <ul>
                                                <li><strong>All Cakes</strong></li>
                                                <li><strong>Best Seller Cakes</strong></li>
                                            </ul>
                                        </div>
                                        <div className='cakes-images'>
                                            <div className="image-section">
                                                <img src="/images/cake1.avif" alt="New Arrivals" />
                                                <span>NEW ARRIVALS</span>
                                            </div>
                                            <div className="image-section">
                                                <img src="/images/cake2.avif" alt="Premium Cakes" />
                                                <span>PREMIUM CAKES</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </li>
                    <li style={{ fontSize: "13px" }}>
                        PLANTS
                    </li>
                    <li style={{ fontSize: "13px" }}>
                        GIFT'S
                    </li>
                    <li style={{ fontSize: "13px" }}>
                        PERSONLIZED GIFTS
                    </li>
                    <li style={{ fontSize: "13px" }}>
                        CHOCLATES
                    </li>
                    <li style={{ fontSize: "13px" }}>
                        COMBOS
                    </li>
                    <li style={{ fontSize: "13px" }}>
                        BIRTHDAY
                    </li>
                    <li style={{ fontSize: "13px" }}>
                        ANNIVERSIRY
                    </li>
                    <li style={{ fontSize: "13px" }}>
                        OCCASIONS
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Header