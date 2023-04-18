const express = require('express');
const contactRouter = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const app  = express();
const port = process.env.PORT || 8080;

connectDB();
app.use(express.json());
app.use('/api/contacts', contactRouter);
app.use(errorHandler);

app.listen(port, ()=> {
    console.log(`Server running on ${port}`);
});