const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(`mongodb://localhost:27017/${process.env.DB_NAME}?replicaSet=rs0&retryWrites=true&w=majority`, {
    useNewUrlParser: true,         // Use the new URL parser
    useUnifiedTopology: true,      // Use the new Server Discovery and Monitoring engine
    useCreateIndex: true,          // Ensure compatibility with `createIndexes`
    useFindAndModify: false        // Use `findOneAndUpdate` or `findOneAndDelete` instead of deprecated methods
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5001, () => {
      console.log('Server is running on port 5001');
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });