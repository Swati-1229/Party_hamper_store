const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// import payment from "./routes/payment.js"
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const productRoutes = require('./routes/ProductRoutes');
const paymentRoutes = require('./routes/payment');
// const payment= require('./routes/payment');
app.use('/', productRoutes);
app.use("/api", paymentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port  http://localhost:${PORT}`);
});
