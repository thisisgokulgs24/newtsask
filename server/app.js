const express = require('express');
const mongooseConnect = require("./config/config");
const dataRoutes = require('./routes/routes');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongooseConnect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', dataRoutes);

// Start server 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 
});
