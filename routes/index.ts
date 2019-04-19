import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World');
});

module.exports = router;
