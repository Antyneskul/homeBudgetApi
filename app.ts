import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import filter from 'content-filter';

import {applyRoutes} from './app/routes';

mongoose.connect('mongodb://mongodb/budget', {
    promiseLibrary: global.Promise,
    useNewUrlParser: true
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('x-powered-by', false);
app.use(cors());
app.use(helmet());
app.use(filter());

applyRoutes(app);

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
});

// error handler
app.use((err: {
    status?: number;
    message?: string;
}, req: express.Request, res: express.Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
