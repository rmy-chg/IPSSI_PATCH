const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initDb } = require('./src/models');
const apiRoutes = require('./src/routes/api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Security Middleware
app.use(helmet());
app.use(cors());

// Body parsers
app.use(express.json());
app.use(express.text());

// Routes
app.use('/', apiRoutes);

// Database initialization and server start
initDb().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
