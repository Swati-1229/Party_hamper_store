// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";

// export default function LoginPage() {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             email: data.get("email"),
//             password: data.get("password"),
//         });
//     };

//     return (
//         <Container component="main" maxWidth="sm">
//             <Box
//                 sx={{
//                     boxShadow: 3,
//                     borderRadius: 2,
//                     px: 4,
//                     py: 6,
//                     marginTop: 8,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                 }}
//             >
//                 <Typography component="h1" variant="h5">
//                     Sign in
//                 </Typography>
//                 <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         id="email"
//                         label="Email Address"
//                         name="email"
//                         autoComplete="email"
//                         autoFocus
//                     />
//                     <TextField
//                         margin="normal"
//                         required
//                         fullWidth
//                         name="password"
//                         label="Password"
//                         type="password"
//                         id="password"
//                         autoComplete="current-password"
//                     />
//                     <FormControlLabel
//                         control={<Checkbox value="remember" color="primary" />}
//                         label="Remember me"
//                     />
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3, mb: 2 }}
//                     >
//                         Sign In
//                     </Button>
//                     <Grid container>
//                         <Grid item xs>
//                             <Link href="#" variant="body2">
//                                 Forgot password?
//                             </Link>
//                         </Grid>
//                         <Grid item>
//                             <Link href="#" variant="body2">
//                                 {"Don't have an account? Sign Up"}
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Box>
//         </Container>
//     );
// }



import React, { Component, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login_Page.scss"
import { Link, useNavigate } from 'react-router-dom';

// export default class Login extends Component {
//     render() {
//         return (
//             <form>
//                 <h3>Sign In</h3>
//                 <div className="mb-3">
//                     <label>Email address</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter email"
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Enter password"
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <div className="custom-control custom-checkbox">
//                         <input
//                             type="checkbox"
//                             className="custom-control-input"
//                             id="customCheck1"
//                         />
//                         <label className="custom-control-label" htmlFor="customCheck1">
//                             Remember me
//                         </label>
//                     </div>
//                 </div>
//                 <div className="d-grid">
//                     <button type="submit" className="btn btn-primary">
//                         Submit
//                     </button>
//                 </div>
//                 <p className="forgot-password text-right">
//                     Forgot <a href="#">password?</a>
//                 </p>
//             </form>
//         )
//     }
// }
export default function LoginPage() {

    const [saveLoginuserdata, setSaveLoginuserdata] = useState([])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = () => {
        const userData = {
            email,
            password: password.trim()

        }
        // const existingLoginUser = JSON.parse(localStorage.getItem("loginUser")) || []
        const allUsers = JSON.parse(localStorage.getItem("user")) || []
        console.log("AllUSer", allUsers)
        const matchuser = allUsers.find(user => user.email === userData.email && user.password === userData.password)
        console.log("matchuser", matchuser)

        // if (Array.isArray(existingLoginUser)) {
        //     existingLoginUser.push(userData)
        //     localStorage.setItem("loginUser", JSON.stringify(existingLoginUser));

        // }
        if (matchuser) {
            localStorage.setItem("loginUser", JSON.stringify(matchuser))
            alert("Login successful!");
            navigate("/")
            console.log("Logged in user:", matchuser);
        }
        else {
            const emailExist = allUsers.find(user => user.email === userData.email)
            console.log("emailExist", emailExist)
            if (!emailExist) {
                alert("Account not created Yet")



            }
            else {
                alert("Invalid Password")
            }
        }
        setSaveLoginuserdata(userData)

        console.log(userData)
    }
    return (
        <div className="container">
            <div className=" Login-box">
                <h2>Login Now</h2>
                <input type="text" placeholder="Email Or Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className="btn btn-primary" onClick={handleSubmit} >Login</button>
                <p class="forgot-password"><a href="#" style={{ color: "hwb(47 93% 4%);" }}>Forgot Password?</a></p>
                <p class="NaM">Not a member? <Link to="/SignupPage" style={{ color: "#fdd835;" }}>Signup</Link></p>
            </div>
        </div>
    )
}    
