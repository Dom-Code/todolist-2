import express from 'express';
import http from 'http';
import logging from './src/config/logging';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './src/config/config';
import router from './src/routes/allRoutes';

const NAMESPACE = 'Index';

const app = express();

// Connect to Mongo
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    logging.info(NAMESPACE, 'Connected to mongoDB!');
  })
  .catch((err) => {
    logging.error(NAMESPACE, err.message, err);
  });

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logging.info(
      NAMESPACE,
      `Method: [${req.method}], URL: [$Preq.url], IP: [${req.socket.remoteAddress}]`
    );

    res.on(`finish`, () => {
      logging.info(
        NAMESPACE,
        `Method: [${req.method}], URL: [$Preq.url], IP:[${req.socket.remoteAddress}], STATUS: [${res.statusCode}]`
      );
    });
    next();
  }
);

// parsing request
// injections allows us to send nested json to our API.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rules for our API

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-with, Content-Type, Accept, Authorization,  application/json'
  );

  if (req.method == 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET PATCH DELETE POST PUT OPTIONS'
    );
    return res.status(200).json();
  }
  next();
});

// if request body is blank.
// add other errors.
// app.use(errMiddleWare);
app.use('/', router);

const httpServer = http.createServer(app);
httpServer.listen(4000, () => {
  console.log('listening');
  return 'listening...';
});
