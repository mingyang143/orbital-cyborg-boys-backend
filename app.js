const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const gameRouter = require('./routes/gameRoutes');

const app = express();

// Implement CORS
app.use(cors());
app.options('*', cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// 1) MIDDLEWARES
app.use(express.json());
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/games', gameRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
