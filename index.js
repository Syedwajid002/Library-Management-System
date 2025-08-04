const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/Schemas/libraraySchema');
const resolvers = require('./graphql/resolvers/libraryResolvers');

// REST Routes
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const reportRoutes = require('./routes/reportRoutes');
const connectDB = require('./config/dbConfig');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// REST endpoints
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrowings', borrowRoutes);
app.use('/api/reports', reportRoutes);


// Connect to DB and start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

