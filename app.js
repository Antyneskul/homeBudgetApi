const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const filter = require('content-filter');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const debug = require('debug')('homebudgetapi:app');



const connectWithRetry = () => mongoose.connect('mongodb://mongodb/budget', {
    promiseLibrary: global.Promise,
    useNewUrlParser: true
}).catch((err) => {
    debug('Failed to connect to mongo on startup - retrying in 1 sec', err);
    setTimeout(connectWithRetry, 2000);
});

connectWithRetry();



const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('x-powered-by', false);
app.use(cors());
app.use(helmet());
app.use(filter());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
