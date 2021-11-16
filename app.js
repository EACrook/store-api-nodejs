require('dotenv').config();

// async errors

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
});

// products route
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`SERVER IS LISTENING ON ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();