import React, { useState } from 'react'
import "./SignupPage.scss"
import { Link } from 'react-router-dom'

function SignupPage() {
    const [saveuserdata, setSaveUserdata] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [mobile, setMobile] = useState()
    const [dob, setDob] = useState()
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // if(!name ||!email || !password)
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // 3. Password match
        if (password !== confirmpassword) {
            alert("Passwords do not match.");
            return;
        }
        const newuser = {
            name,
            email,
            password,
            confirmpassword,
            mobile,
            dob
        }
        const existingUSer = JSON.parse(localStorage.getItem("user",)) || []
        const userExists = existingUSer.find(user => user.email === email)
        if (userExists) {
            alert("Account already exist with this email")
        }
        else {
            existingUSer.push(newuser)
            alert("Account Created Succesfully")

            localStorage.setItem("user", JSON.stringify(existingUSer))
            setSaveUserdata(newuser)
        }
    }

    return (

        <div>
            <div className="signup-heading">
                <h2>SignUp Page</h2>
            </div>
            <div className="Main-container">
                <div className="container">

                    <form className='signup-box' onSubmit={handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input type="text" placeholder="Enter Name Here..." value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" placeholder="Enter Email Id..." value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label>Password</label>
                            <div style={{ position: "relative;" }}>
                                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <span className="icon-container"><i className="fa-solid fa-eye-slash"></i></span>
                            </div>

                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <div style={{ position: "relative;" }}>
                                <input type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                <span className="icon-container"><i className="fa fa-lock"></i></span>


                            </div>
                        </div>

                        <div>
                            <label>Mobile Number</label>
                            <input type="tel" placeholder="Enter Mobile Number..." value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                        </div>
                        <div>
                            <label>Dob</label>
                            <input type="date" placeholder="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary" >SignUp</button>
                    </form>
                    <p>Already have an account? <Link to="/LoginPage">Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage