
import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import { cake_collections } from './Data';
import Header from './Header';
import { Link } from 'react-router-dom';


export default function Product_Details() {
    const navigate = useNavigate()
    const { id } = useParams()

    console.log("iddd", id)
    console.log("cake_collections", cake_collections);

    const images = [
        '/images/cake6.webp',
        '/images/cake6.webp',
        '/images/cake6.webp',
        '/images/cake6.webp',
    ];

    const [mainImage, setMainImage] = useState(null);
    const [selectedWeight, setSelectedWeight] = useState("500 gm");
    const [pincode, setPincode] = useState("");
    // const [addwishlist, setaddwishlist] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const togglePopup = () => setShowPopup(!showPopup);
    const closePopup = () => setShowPopup(false);
    const [quantity, setQuantity] = useState(0);
    const [wishlisted, setwishlisted] = useState([])


    const togglewishlist = (productId) => {
        const updatedwishlist = wishlisted.includes(productId) ?
            wishlisted.filter(id => id !== productId) :
            [...wishlisted, productId]
        setwishlisted(updatedwishlist)
        localStorage.setItem("wishlist", JSON.stringify(updatedwishlist))
        window.dispatchEvent(new Event("wishlistUpdated"))
        // const newState = !addwishlist;
        // setaddwishlist(newState)
        // setMessage(newState ? 'Added to Wishlist ❤️' : 'Removed from Wishlist 💔');
        // setTimeout(() => setMessage(''), 2000);
    }

    useEffect(() => {
        const savedwishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setwishlisted(savedwishlist);
    }, []);
    const product = cake_collections.find(p => p.id === id);
    useEffect(() => {
        if (product?.image) {
            setMainImage(product.image)
        }
    }, [product])
    if (!product) return <div>Loading...</div>;

    const onAddtoCart = (product) => {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const exist = cart.find((item) => item.id === product.id)
        let updatedCart = [];
        if (exist) {

            updatedCart = cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        const totalQantity = updatedCart.reduce((acc, item) => acc + item.quantity, 0)
        localStorage.setItem("cartQuantity", totalQantity);
        setQuantity(totalQantity)
        console.log("cart", totalQantity, cart, (cart).length)
        navigate('/Addtocart', { state: { cart: updatedCart } });
    }

    return (
        <div className="product-details-container">
            <Header></Header>
            <div className='main'>
                <div className="breadcrumb">
                    <span>Home &gt; Cakes &gt; Fudge Cream Cake</span>
                </div>

                <div className="product-content">
                    <div className="left-section">
                        <div className="thumbnail-images">
                            {product && product.smallimages && product.smallimages.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`thumb-${i}`}
                                    onClick={() => setMainImage(img)}
                                    className="thumb"
                                    onMouseEnter={() => setMainImage(img)} // Hover par image change
                                    style={{ cursor: "pointer", }}
                                />
                            ))}
                        </div>
                        <div className="main-image">
                            <img src={mainImage} alt="main" />
                        </div>
                    </div>

                    <div className="right-section">
                        <h2>{product.name}</h2>
                        <div>
                            <span style={{ display: "flex" }}>
                                <div className='ratings'>
                                    <span>{product.rating}</span>

                                    <span className="star">{'\u2606'}</span>
                                </div>
                                <span style={{
                                    color: "#878787",
                                    fontSize: "13px"
                                }} className='rating-review-section'>
                                    Rating & 674 Reviews
                                </span>
                            </span>
                            <h3>₹{product.price}</h3>
                            <div className='Serving_info'>
                                weight: <span onClick={togglePopup}>Serving info</span>
                                {showPopup && (
                                    <div className="serving-popup " onClick={closePopup}>
                                        <div className="popup-box" onClick={e => e.stopPropagation()}>
                                            <div className="popup-header">
                                                <span>Information</span>
                                                <button className="close-btn" onClick={closePopup}>×</button>
                                            </div>
                                            <table className='table'>
                                                <tbody>
                                                    <tr>
                                                        <td>1kg</td>
                                                        <td>8-10 Person</td>

                                                    </tr>
                                                    <tr>
                                                        <td>1.5kg</td>
                                                        <td>10-12 Person</td>

                                                    </tr>
                                                    <tr>
                                                        <td>2kg</td>
                                                        <td>18-20 Person</td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="weight-options">
                                {["500 gm", "1 kg", "1.5 kg", "2 kg", "3 kg", "4 kg"].map((weight) => (
                                    <button
                                        key={weight}
                                        onClick={() => setSelectedWeight(weight)}
                                        className={selectedWeight === weight ? "selected" : ""}
                                    >
                                        {weight}
                                    </button>
                                ))}
                            </div>

                            {/* <div className='type-of-food'>
                        <lable>
                            <input type='checkbox' ></input>
                            <span>Eggless</span>

                        </lable>
                    </div> */}
                            <div className="message-input">
                                <input
                                    type="text"
                                    placeholder="Message on cake"

                                />
                            </div>
                            <div className="pincode-check">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode to check delivery"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                                <button>Check</button>
                            </div>

                            <div className='wishlist-box'>

                                <div className='wishlist'>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={wishlisted.includes(product.id) ? 'red' : 'none'}
                                        viewBox="0 0 24 24"
                                        stroke="red"
                                        strokeWidth="1"
                                        // width="100"
                                        // height="35"
                                        style={{ paddingTop: "10px" }}
                                        onClick={() => togglewishlist(product.id)}
                                        className="wishlist-icon"
                                    >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                                  2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
                                   C13.09 3.81 14.76 3 16.5 3 
                                   19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54 
                                   L12 21.35z" />
                                    </svg>
                                    <span className="tooltip-text">
                                        {wishlisted.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                    </span>
                                </div>

                                <div className='add-to-cart-section'>
                                    <button className="add-to-cart" onClick={() => onAddtoCart(product)}>ADD TO CART</button>
                                </div>

                            </div>

                        </div>
                        <div className='offers-section'>
                            <div className='offer-icons'>
                                <span>
                                    <img src='/images/discount.avif' ></img>
                                </span>
                                <span>Available Offers</span>
                            </div>
                            <div style={{ textAlign: "left" }}>
                                <div className='offers-details'>
                                    <ul>
                                        <li>Get upto ₹100 cashback on UPI payment through Paytm, minimum order value ₹499 <span><a>*T&C</a></span></li>
                                        <li>Get up to 10% cashback on payments via MobiKwik UPI at Winni, minimum order value ₹699 <span><a>*T&C</a></span></li>
                                        <li>Use Coupon Code: TRYWINNI to get 20% off</li>
                                        <li>Use Coupon Code: WIN50 to get ₹50 off</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='product-description-container'>
                            <div>
                                <h3 style={{
                                    padding: " 0",
                                    color: " #636466",
                                    fontWeight: " 600",
                                    fontSize: "23px"
                                }}>Product Description</h3>
                            </div>
                            <div className='product-description-part1'>
                                <p style={{ textAlign: "left" }}>
                                    <strong style={{ color: "#636466" }}>Product Details:</strong>
                                </p>
                                <ul>
                                    <li>Cake Flavour:</li>
                                    <li>Type of Cake: Cream&nbsp;</li>
                                    <li>Type of Sponge: Chocolate&nbsp;</li>
                                    <li>Type of Cream: Chocolate&nbsp;</li>
                                    <li>Filling in Layers: Dark Chocolate Cream&nbsp;</li>
                                    <li>Toppings: Red Cherry &amp; Chocolate Garnish&nbsp;</li>
                                    <li>Net Quantity: 1 Cake&nbsp;</li>
                                </ul>
                                <p style={{ textAlign: "left", paddingTop: "15x", fontSize: "14px" }}>
                                    <strong style={{ fontWeight: "500", color: "#636466" }}>Ingredients:</strong>
                                </p>
                                <p style={{
                                    color: "#636466", fontSize: "14px", width: "100%", textAlign: "left",
                                    paddingTop: "12px", paddingBottom: "16px"
                                }}>&nbsp;Chocolate premix, Refined oil, Breakfast Sugar, Chocolate Truffle Base, Dark Chocolate compound, Karonda Cherry, Chocolate Glaze</p>

                                <p style={{ textAlign: "left", paddingTop: "15x", fontSize: "14px" }}>
                                    <strong style={{ fontWeight: "500", color: "#636466" }}>Delivery Information:</strong>
                                </p>
                                <ul><li>The image displayed is representative. The actual product may vary in shape, size, brand, and colour as per local availability.</li>
                                    <li>The delivery time selected is an estimate and depends on the products' availability and the location to which the product is to be delivered.</li>
                                    <li>It is not possible to reroute the delivery to another&nbsp;address.</li>
                                    <li>This product is delivered by hand and will not be delivered with courier products.</li>
                                    <li>A Slight delay might be expected during the Festival Season.&nbsp;</li>
                                    <li>Messages on cards may not be available in a few areas.</li>
                                </ul>
                                <p style={{ textAlign: "left", paddingTop: "15x", fontSize: "14px" }}>
                                    <strong style={{ fontWeight: "500", color: "#636466" }}>Care Instruction:</strong>

                                </p>
                                <ul><li>Store cream cakes in a refrigerator.</li>
                                    <li>Fondant cakes should be stored in an air-conditioned environment.</li>
                                    <li>The cake should be consumed&nbsp;within 24 hours.</li>
                                    <li>Slice and serve the cake at room temperature and make sure it is not exposed to heat.</li>
                                    <li>Sculptural elements and figurines may contain wire supports toothpicks or wooden skewers for support.</li>
                                    <li>Please check the placement of these items before serving them to small children.</li>
                                </ul>
                                <p style={{ textAlign: "left", paddingTop: "15x", fontSize: "14px" }}>
                                    <strong style={{ fontWeight: "500", color: "#636466" }}>Note:</strong>
                                </p>
                                <ul><li>The cake base, cutlery, &amp; accessories used in the image are only for representation. They are not delivered with the cake.</li></ul>
                            </div>
                            <div className='details-about-winni'>
                                <p>If you are a chocolate lover, the Yummylicious Chocolate Cake by Winni is your dream come true. This triple chocolate delight will transport your taste buds to heaven.
                                    Made with only the finest ingredients, this cake makes a perfect centerpiece for birthdays, anniversaries, retirement parties, or any other special occasion.
                                    The moist chocolate sponge of the cake is sandwiched between creamy chocolate and dark chocolate cream.
                                    Adding to the visual appeal of this are bright red cherries and delicate chocolate icing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recommended-section">
                    <div className="recommended-title">
                        <h5>Recommended Categories</h5>
                    </div>
                    <div className='recommended-product-list'>

                        <div className='recommended-product-card'>
                            <a>
                                <img src='https://assets.winni.in/groot/2022/06/27/productdetailpage/desktop/chocolate.jpg?w=255'>
                                </img>
                                <div className="product-label">
                                    Choclates
                                </div>
                            </a>
                        </div>


                        <div className='recommended-product-card'>
                            <a>
                                <img src='https://assets.winni.in/groot/2022/06/27/productdetailpage/desktop/combos.jpg?w=255'>
                                </img>
                                <div className="product-label">
                                    Combos
                                </div>
                            </a>
                        </div>


                        <div className='recommended-product-card'>
                            <a>
                                <img src='https://assets.winni.in/groot/2022/06/27/productdetailpage/desktop/cushions.jpg?w=255'>
                                </img>
                                <div className="product-label">
                                    Cushions
                                </div>
                            </a>
                        </div>


                        <div className='recommended-product-card'>
                            <a>
                                <img src='https://assets.winni.in/groot/2022/06/27/productdetailpage/desktop/mugs.jpg?w=255'>
                                </img>
                                <div className="product-label">
                                    Mugs
                                </div>
                            </a>
                        </div>


                        <div className='recommended-product-card'>
                            <a>
                                <img src='https://assets.winni.in/groot/2022/06/27/productdetailpage/desktop/flower.jpg?w=255'>
                                </img>
                                <div className="product-label">
                                    Flowers
                                </div>
                            </a>
                        </div>


                        <div className='recommended-product-card'>
                            <a>
                                <img src='https://assets.winni.in/groot/2022/06/27/productdetailpage/desktop/giftbasket.jpg?w=255'>
                                </img>
                                <div className="product-label">
                                    Gift Basket
                                </div>
                            </a>
                        </div>


                    </div>

                </div>
                <div class="more-product-section">
                    <div class="recommended-inner">
                        <h5>Find more Products</h5>
                    </div>
                    <div>
                        <div>
                            <span style={{ color: "#888", fontSize: "12px" }}>
                                UPCOMING OCCASIONS:
                            </span>
                            <span class="internal_link_slider">
                                <a href="/gifts/fathers-day">Father's Day</a> |
                                <a href="/gifts/parents-day">Parent's Day</a> |
                                <a href="/friendship-day-gifts">Friendship Day</a>
                            </span>
                        </div>
                        <div style={{ marginTop: "5px" }}>
                            <span style={{ color: " #888", fontSize: "12px" }}>TOP SEARCHES :</span>
                            <span class="internal_link_slider">
                                <a href="/cake">Cake Delivery</a> |
                                <a href="/flowers">Flowers Delivery</a> |
                                <a href="/gifts">Gifts Delivery </a> |
                                <a href="/eggless-cake">Eggless Cakes</a> |
                                <a href="/plants">Plant Delivery</a> |
                                <a href="/personalised-gifts">Personalised Gifts</a> |
                                <a href="/chocolates">Chocolates Delivery</a>
                            </span>
                        </div>
                        <div style={{ marginTop: "5px" }}>
                            <span style={{ color: "#888", fontSize: "12px" }}>MOST SEARCHED ON WINNI :</span>
                            <span class="internal_link_slider">
                                <a href="/birthday-cakes">Birthday Cake</a> |
                                <a href="/birthday-flowers">Birthday Flowers</a> |
                                <a href="/birthday-gifts">Birthday Gifts</a> |
                                <a href="/personalised-gifts">Personalised Gifts</a>
                            </span>
                        </div>
                        <div style={{ marginTop: "5px" }}>
                            <span style={{ color: "#888", fontSize: "12px" }}>ANNIVERSARY :</span>
                            <span class="internal_link_slider"> <a href="/anniversary-cakes">Anniversary Cake</a> |
                                <a href="/anniversary-flowers">Anniversary Flowers</a> |
                                <a href="/anniversary-gifts">Anniversary Gifts</a>
                            </span>
                        </div>
                        <div style={{ marginTop: "5px" }}>
                            <span style={{ color: "#888", fontSize: "12px" }}>TOP CAKE CITIES :</span>
                            <span class="internal_link_slider">
                                <a href="/cake/bangalore">Cake Delivery in Bangalore </a> |
                                <a href="/cake/delhi">Cake Delivery in Delhi</a> |
                                <a href="/cake/mumbai">Cake Delivery in Mumbai</a> |
                                <a href="/cake/pune">Cake Delivery in Pune</a> |
                                <a href="/cake/gurgaon">Cake Delivery in Gurgaon</a> |
                                <a href="/cake/hyderabad">Cake Delivery in Hyderabad</a> |
                                <a href="/cake/chennai">Cake Delivery in Chennai</a> |
                                <a href="/cake/kolkata">Cake Delivery in Kolkata </a> |
                                <a href="/cake/noida">Cake Delivery in Noida</a> |
                                <a href="/cake/ahmedabad">Cake Delivery in Ahmedabad</a> |
                                <a href="/cake/chandigarh">Cake Delivery in Chandigarh</a> |
                                <a href="/cake/jaipur"> Cake Delivery in Jaipur</a> |
                                <a href="/cake/dehradun"> Cake Delivery in Dehradun</a> |
                                <a href="/cake/patna">  Cake Delivery in Patna </a> |
                                <a href="/cake/vizag"> Cake Delivery in Vizag</a> |
                                <a href="/cake/bhopal">  Cake Delivery in Bhopal</a> |
                                <a href="/cake/nagpur"> Cake Delivery in Nagpur </a> |
                                <a href="/cake/indore">   Cake Delivery in Indore</a> |
                                <a href="/cake/agra"> Cake Delivery in Agra </a> |
                                <a href="/cake/lucknow"> Cake Delivery in Lucknow</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <footer>

                <div className='full-width-footer'>
                    <div className="footer-highlight-bar">
                        <div className="footer-highlight-item">
                            <div>
                                <img src="/images/happy-delivery.webp" alt="Delivery" />
                            </div>
                            <div>
                                <div className="title">700+ Cities</div>
                                <div className="subtitle">Happily Delivering</div>
                            </div>
                        </div>
                        <div className="footer-highlight-item">
                            <div>
                                <img src="/images/secure-payment.webp" alt="Payments" />
                            </div>
                            <div>
                                <div className="title">100% Secure Payments</div>
                                <div className="subtitle">All Credit & Debit Cards Accepted</div>
                            </div>
                        </div>
                        <div className="footer-highlight-item">
                            <div>
                                <img src="/images/customer-across-the-world.webp" alt="Customers" />
                            </div>
                            <div>
                                <div className="title">20,000,000+</div>
                                <div className="subtitle">Customers Across The World</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='company-details-related-container'>
                    <div className='col-13'>
                        <ul>
                            <li style={{
                                color: " #000000",
                                fontSize: "16px",
                                fontWeight: "600",
                                paddingBottom: "10px"
                            }}>Our Company</li>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className='col-13'>
                        <ul>
                            <li style={{
                                color: " #000000",
                                fontSize: "16px",
                                fontWeight: "600",
                                paddingBottom: "10px"
                            }}>Quick Links</li>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className='col-13'>
                        <ul>
                            <li style={{
                                color: " #000000",
                                fontSize: "16px",
                                fontWeight: "600",
                                paddingBottom: "10px"
                            }}>Policy & Secruity</li>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Contact Us</li>
                            <li>Contact Us</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className='col-13'>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>
                <div className='connection-plateform'>
                    <div className='connection-platform-part1' >
                        <div class="footer-top">
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <strong>Connect with Us</strong>
                                <div class="social-icons">
                                    <a href="#"><img src="/images/facebook.webp" alt="Facebook" width="20" /></a>
                                    <a href="#"><img src="/images/instagram.webp" alt="Instagram" width="20" /></a>
                                    <a href="#"><img src="/images/youtube.webp" alt="YouTube" width="20" /></a>
                                    <a href="#"><img src="/images/linkdin.webp" alt="LinkedIn" width="20" /></a>
                                    <a href="#"><img src="/images/twiter.webp" alt="X" width="20" /></a>
                                    <a href="#"><img src="/images/whatsapp.webp" alt="WhatsApp" width="20" /></a>
                                </div>
                            </div>
                            <div>© 2013 - 2025 Winni.in. All Rights Reserved</div>

                        </div>
                        <div class="footer-mobile">
                            <div>Experience Winni on mobile</div>
                            <img src="/images/google-play.webp" alt="Google Play" width="200" height="500" />
                            <img src="/images/app-store.webp" alt="App Store" width="200" height="500" />
                        </div>
                    </div>
                    <div class="footer-mid">
                        <div><img src="/images/help-center.webp" width="20" /> Help Center</div>
                        <div><img src="/images/vendor-tie.webp" width="20" /> Vendor Tie-Ups</div>
                        <div><img src="/images/corporate-order.webp" width="20" /> Corporate Order</div>
                        <div><img src="/images/franchise-enquiry.webp" width="20" /> Franchise Enquiry</div>
                        <div><img src="/images/winni-news.webp" width="20" /> Winni In News</div>
                    </div>


                    <div class="footer-bottom">
                        Company Name: Dhawala Online Solutions Private Limited | CIN: U51109KA2012PTC065653 <br />
                        Regd. Office Address: 3rd Floor, PLOT. NO # 128/P2, EPIP Industrial Area Whitefield, Sonnenahalli Village, Bangalore – 560066 <br />
                        Contact no. +91 – 7829463510 | E-mail: info@winni.in
                    </div>
                    <div class="footer-bottom">
                        Company Name: Dhawala Online Solutions Private Limited | CIN: U51109KA2012PTC065653 <br />
                        Regd. Office Address: 3rd Floor, PLOT. NO # 128/P2, EPIP Industrial Area Whitefield, Sonnenahalli Village, Bangalore – 560066 <br />
                        Contact no. +91 – 7829463510 | E-mail: info@winni.in
                    </div>
                    <div class="footer-bottom">
                        Company Name: Dhawala Online Solutions Private Limited | CIN: U51109KA2012PTC065653 <br />
                        Regd. Office Address: 3rd Floor, PLOT. NO # 128/P2, EPIP Industrial Area Whitefield, Sonnenahalli Village, Bangalore – 560066 <br />
                        Contact no. +91 – 7829463510 | E-mail: info@winni.in
                    </div>

                </div>
            </footer>
        </div>
    );
}

