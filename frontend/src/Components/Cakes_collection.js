import React, { useEffect } from 'react'
import "./Cakes_collection.scss"
import { useState, useRef } from 'react';
import { cake_collections } from './Data';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function Cakes_collection() {
    const [date, setDate] = useState(new Date());
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.showPicker();
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cake_collections.slice(indexOfFirstItem, indexOfLastItem); // Get current page items
    const totalPages = Math.ceil(cake_collections.length / itemsPerPage);  // Calculate total pages
    const pageNumbers = [...Array(totalPages).keys()].map(n => n + 1);// Page numbers for buttons
    const [wishlisted, setWishlisted] = useState([]);

    // const toggleWishlist = (productId) => {
    //     const updatedwishlisted = wishlisted.includes(productId)
    //         ? wishlisted.filter(id => id !== productId)
    //         : [...wishlisted, productId]
    //     setWishlisted(updatedwishlisted)
    //     localStorage.setItem("wishlist", JSON.stringify(updatedwishlisted))
    //     const totalWishlist = updatedwishlisted.length;
    //     localStorage.setItem("wishlistCount", totalWishlist)
    //     window.dispatchEvent(new Event("wishlistUpdated"));
    //     console.log("Abc", updatedwishlisted)



    // };
    const toggleWishlist = (productId) => {
        const updatedWishlist = wishlisted.includes(productId)
            ? wishlisted.filter(id => id !== productId)
            : [...wishlisted, productId];

        setWishlisted(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        window.dispatchEvent(new Event("wishlistUpdated"));
    };

    useEffect(() => {
        const savedwishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlisted(savedwishlist);
    }, []);
    console.log("wishlist", wishlisted.length)
    const badgeColor = (tag) => {
        switch (tag) {
            case 'Premium':
                return '#B80000';
            case 'Trending':
                return '#FF8C00';
            case 'Bestseller':
                return 'Green';
            default:
                return '#999';
        }
    };
    return (
        <div>
            <Header></Header>
            <div>
                {/* <div>
                    <h5>Cakes</h5>
                </div> */}
                <div className='BHCpages'>
                    <div>
                        <span>Home</span>
                    </div>
                    <div>
                        <span>Cakes</span>
                    </div>
                </div>
            </div>
            <div className='dtfs' style={{
                margin: "0px 40px",
                borderRadius: "4px",
                background: "#EFEFEF",
                padding: " 2px 10px",
                height: "48px",
                display: "flex"
            }}>
                <div style={{ width: "40%", paddingTop: "8px" }}>
                    <div className='totalItems' style={{
                        fontWeight: "600",
                        fontSize: "18px",
                        textAlign: "left"
                    }}>Cakes <span>(32)</span>
                    </div>
                </div>
                <div
                    onClick={handleClick}
                    style={{
                        display: 'flex',
                        width: '200px',
                        padding: '15px 12px',
                        // backgroundColor: 'white',
                        cursor: 'pointer',
                        fontFamily: 'sans-serif',
                        fontSize: '14px', width: "20%",
                    }}
                >
                    <span style={{ color: date ? '#000' : '#888' }}>
                        {date ? new Date(date).toDateString() : 'Select Delivery Date'}
                    </span>
                    <span role="img" aria-label="calendar">📅</span>

                    <input
                        type="date"
                        ref={inputRef}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{
                            position: 'absolute',
                            opacity: 0,
                            pointerEvents: 'none'
                        }}
                    />
                    <span style={{
                        position: "absolute",
                        marginLeft: "35px",
                        marginTop: "5px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#333",
                        pointerEvents: "none"
                    }}>
                        Delivery Date
                    </span>
                </div>
                <div style={{ width: "20%", position: "relative", display: "inline-block" }}>
                    <span style={{
                        fontSize: "14px",
                        position: "absolute",
                        marginLeft: "7px",
                        marginTop: "15px",
                        pointerEvents: "none"
                    }}>
                        ₹
                    </span>

                    <span style={{
                        position: "absolute",
                        marginLeft: "35px",
                        marginTop: "5px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#333",
                        pointerEvents: "none"
                    }}>
                        Filter By Price
                    </span>

                    <span style={{
                        position: "absolute",
                        marginLeft: "35px",
                        marginTop: "25px",
                        fontSize: "15px",
                        color: "green",
                        pointerEvents: "none"
                    }}>
                        ALL Products
                    </span>
                </div>
                <div style={{ width: "20%", position: "relative", display: "inline-block" }}>
                    <span style={{
                        fontSize: "16px",
                        position: "absolute",
                        marginLeft: "7px",
                        marginTop: "15px",
                        pointerEvents: "none"
                    }}>
                        ⇅
                    </span>

                    <span style={{
                        position: "absolute",
                        marginLeft: "35px",
                        marginTop: "5px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#333",
                        pointerEvents: "none"
                    }}>
                        Sort By
                    </span>

                    <span style={{
                        position: "absolute",
                        marginLeft: "35px",
                        marginTop: "25px",
                        fontSize: "15px",
                        color: "green",
                        pointerEvents: "none"
                    }}>
                        Popularity
                    </span>
                </div>
            </div>
            <div className='cake_collection'>
                {currentItems.map((item, index) => (
                    <div className='cake_card' key={item.id}>
                        {item.tag && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '0px',
                                    left: '0px',
                                    backgroundColor: badgeColor(item.tag),
                                    color: 'white',
                                    padding: '4px 10px',
                                    borderRadius: '6px 0px 6px 0px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    zIndex: 5,
                                }}
                            >
                                {item.tag}
                            </div>
                        )}
                        <Link to={`/product/${item.id}`}><img src={item.image} alt={item.title} /></Link>
                        <span
                            onClick={() => toggleWishlist(item.id)}
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
                                fill={wishlisted.includes(item.id) ? 'red' : 'none'}
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
                            <span className="tooltip-text">
                                {wishlisted.includes(item.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            </span>
                        </span>
                        <div className="cake_details">
                            <div className="cake_title">{item.name}</div>
                            <div className="cake_price"><span>₹ {item.price}</span>
                                <div className='rating'>{item.rating}<span className="star">{'\u2606'}</span></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "20px" }}>
                {pageNumbers.map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        style={{
                            margin: "5px",
                            padding: "8px 12px",
                            backgroundColor: currentPage === pageNum ? "rgb(237, 33, 124)" : "#ccc",
                            color: currentPage === pageNum ? "#fff" : "#000",
                            border: "none",
                            borderRadius: "50px",
                            cursor: "pointer"
                        }}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
            {/* <Footer></Footer> */}
        </div>
    )
}
