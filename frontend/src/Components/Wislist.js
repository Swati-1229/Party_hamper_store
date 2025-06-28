import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Header'
import Footer from './Footer'
import { cake_collections } from './Data'
import "./wishlist.scss"

export default function Wishlist() {
    // const wishlistProducts = cake_collections.filter((p) => wishlisted.includes(p.id));
    const [wishlisted, setwishlisted] = useState([])
    const [wishlistedproduct, setWishlistProducts] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const savewishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setwishlisted(savewishlist)
        const matchedProducts = cake_collections.filter(product =>
            savewishlist.includes(product.id)
        );
        setWishlistProducts(matchedProducts);
    }, []);
    const toggleWishlist = (id) => {
        if (wishlisted.includes(id)) {
            // Already wishlisted, show confirmation modal
            setSelectedId(id);
            setShowModal(true);
        } else {
            const updated = [...wishlisted, id];
            setwishlisted(updated);
            localStorage.setItem('wishlist', JSON.stringify(updated));
        }
    };


    const removefromwishlist = (id) => {
        const afterremoveproductupdated = wishlisted.filter(pid => pid !== id);
        setwishlisted(afterremoveproductupdated)
        setWishlistProducts(cake_collections.filter(product => afterremoveproductupdated.includes(product.id)))

        localStorage.setItem("wishlist", JSON.stringify(afterremoveproductupdated))
        window.dispatchEvent(new Event("wishlistUpdated"))
        setShowModal(false);

    }
    return (
        <div>
            <Header></Header>
            <div style={{ padding: '2rem', }}>
                <h2>My Wishlist</h2>
                <div className='cake_collection'>

                    {wishlistedproduct.length === 0 ? (
                        <p>No products in wishlist.</p>
                    ) : (
                        wishlistedproduct.map((product) => (
                            <div className='cake_card product-card' key={product.id} style={{ marginBottom: '1rem' }}>
                                {selectedId === product.id ? (
                                    <div className="inline-modal">
                                        <p>Delete this item from shortlist?</p>
                                        <div className="modal-actions">
                                            <button onClick={() => removefromwishlist(product.id)}>Confirm</button>
                                            <button onClick={() => { setShowModal(false); setSelectedId(null) }}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <span
                                        onClick={() => toggleWishlist(product.id)}
                                        style={{
                                            position: 'absolute',
                                            top: '0px',
                                            right: '2px',
                                            cursor: 'pointer',
                                            fontSize: '32px',
                                            // color: wishlisted[index] ? 'red' : 'gray'

                                            zIndex: "10",
                                            color: "red", background: "white",
                                            borderRadius: "50%",
                                            width: '26px',
                                            height: "28px",
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={wishlisted.includes(product.id) ? 'red' : 'none'}
                                            viewBox="0 0 24 24"
                                            stroke="red"
                                            strokeWidth="2"
                                            width="15"
                                            height="20"

                                        >
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
             2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09 
             C13.09 3.81 14.76 3 16.5 3 
             19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54 
             L12 21.35z" />
                                        </svg>
                                        {/* <span className="tooltip-text">
                                        {wishlisted.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                    </span> */}
                                    </span>
                                )}
                                <img src={product.image} alt="main" />
                                <div className='pdc'>
                                    <h3>{product.name}</h3>
                                    <div className='price'>
                                        <span>₹ {product.price}</span>
                                        <div className='rating'>{product.rating}<span className="star">{'\u2606'}</span></div>

                                    </div>
                                </div>
                                {/* <button onClick={() => removefromwishlist(product.id)}>❌ Remove</button> */}
                            </div>
                        ))
                    )}
                </div>
                {/* {showModal && (
                    <div className="modal-box">
                        <p>Are you sure you want to remove this item?</p>
                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={() => removefromwishlist(selectedId)}>Remove</button>
                        </div>
                    </div>
                )} */}
            </div>
            <Footer></Footer>
        </div>
    )
}
