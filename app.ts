import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import filter from 'content-filter';
import helmet from 'helmet';

import { applyRoutes } from './app/routes';
import { IError } from './app/utils/error.interface';

//TODO: Add logging

const debug = require('debug')('homebudgetapi:server');

mongoose.connect('mongodb://mongodb/budget', {
    useNewUrlParser: true
}).catch(err => {
    debug(err);
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

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404);
    res.send('Not Found');
});

app.use((err: IError, req: express.Request, res: express.Response) => {
    res.status(err.status || 500);
    res.send(err.message);
});

export default app;
