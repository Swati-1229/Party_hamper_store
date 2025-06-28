import React, { useState } from 'react'
import "./Address_Details_Page.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { country } from './Data'


function Address_Details_Page() {
    const location = useLocation()
    const { MRPTotal, total, discount } = location.state || {}
    const [selected, setSelected] = useState('Home')
    const navigate = useNavigate()
    const [selectedCountry, setSelectedCountry] = useState("India")


    const handleChange = (e) => {
        setSelectedCountry(e.target.value);
    };
    const selectedCode = country.find(country => country.name === selectedCountry)?.CountyCode || ""

    return (
        <div className="checkout-page">
            <div className="checkout-wrapper container">
                <div className="checkout-inner d-flex">
                    {/* LEFT: Address Form */}
                    <div className="checkout-form  ">
                        <div>
                            <h5 className="mb-3">Add Delivery Address</h5>

                        </div>
                        <form className=' card shadow-sm' style={{ padding: "20px" }}>
                            <div className="mb-2 address-section">
                                <label>Select Country</label>
                                <select className="form-control" onChange={handleChange}><option>-- Choose --</option>
                                    {
                                        country.map((country, index) => (
                                            <option key={index} value={country.name}>{country.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-2 address-section">
                                <label>Recipient Name *</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="mb-2 address-section">
                                <label>Recipient Address *</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="mb-2  address-section">
                                <label>Landmark (optional)</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="PincodeCity-Section">
                                <div className="col-md-6 mb-2 address-section input-box">
                                    <label>Pin Code *</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-6 mb-2 address-section input-box">
                                    <label>City *</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>

                            <div className="Mobile-Number-Section">


                                <div className="col-md-6 mb-2 address-section input-box">
                                    <label>Recipient Mobile Number *</label>
                                    <span>{selectedCode}</span>
                                    <input type="text" className="form-control number-input" placeholder="" />
                                </div>

                                <div className="col-md-6 mb-2 address-section input-box">
                                    <label>Alternate Mobile Number</label>
                                    <span>{selectedCode}</span>
                                    <input type="text" className="form-control number-input" placeholder="" />
                                </div>

                            </div>
                            <div className=" gap-2 my-3 btnofficehomeother" style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)"
                            }} >
                                <button type="button" className="" onClick={() => setSelected("Home")} style={{ color: selected === 'Home' ? 'white' : 'black', background: selected === "Home" ? "rgb(218, 14, 104)" : "transparent", cursor: 'pointer' }}>🏠 Home</button>
                                <button type="button" className="" onClick={() => setSelected("Office")} style={{ color: selected === 'Office' ? 'white' : 'black', background: selected === "Office" ? "rgb(218, 14, 104)" : "transparent", cursor: 'pointer' }}>🏢 Office</button>
                                <button type="button" className="" onClick={() => setSelected("Other")} style={{ color: selected === 'Other' ? 'white' : 'black', background: selected === "Other" ? "rgb(218, 14, 104)" : "transparent", cursor: 'pointer' }}>📦 Other</button>
                            </div>

                        </form>
                        <div className=" justify-content-between mt-3 cancelsave-section">
                            <button className="btn btn-outline-danger" onClick={() => navigate("/Addtocart")}>CANCEL</button>
                            <button className="btn btn-success">SAVE</button>
                        </div>
                    </div>

                    {/* RIGHT: Order Summary */}
                    <div className="checkout-summary ">
                        <h6 className="mb-3">Delivery Address & Order Summary</h6>
                        <div className="summary-details card shadow-sm" style={{ padding: "20px" }}>
                            <div className='count-price-section'><span>Price Details</span><span>(4)</span></div>
                            <div className="d-flex justify-content-between mb-1"><span>MRP Total</span><span>₹{MRPTotal}</span></div>
                            <div className="d-flex justify-content-between text-success mb-1"><span>MRP Discount</span><span>- ₹ 900</span></div>
                            <div className="d-flex justify-content-between mb-1"><span>Delivery Charge</span><span>FREE</span></div>
                            <div className="d-flex justify-content-between mb-3"><span>Convenience Charge</span><span>₹ {discount}</span></div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold"><span>Total Amount</span><span>₹ {total}</span></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    )
}

export default Address_Details_Page