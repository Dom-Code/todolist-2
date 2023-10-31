"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const logging_1 = __importDefault(require("./src/config/logging"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./src/config/config"));
const allRoutes_1 = __importDefault(require("./src/routes/allRoutes"));
const NAMESPACE = 'Index';
const app = (0, express_1.default)();
// Connect to Mongo
mongoose_1.default
    .connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then((result) => {
    logging_1.default.info(NAMESPACE, 'Connected to mongoDB!');
})
    .catch((err) => {
    logging_1.default.error(NAMESPACE, err.message, err);
});
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `Method: [${req.method}], URL: [$Preq.url], IP: [${req.socket.remoteAddress}]`);
    res.on(`finish`, () => {
        logging_1.default.info(NAMESPACE, `Method: [${req.method}], URL: [$Preq.url], IP:[${req.socket.remoteAddress}], STATUS: [${res.statusCode}]`);
    });
    next();
});
// parsing request
// injections allows us to send nested json to our API.
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Rules for our API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization,  application/json');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT OPTIONS');
        return res.status(200).json();
    }
    next();
});
// if request body is blank.
// add other errors.
// app.use(errMiddleWare);
app.use('/', allRoutes_1.default);
const httpServer = http_1.default.createServer(app);
httpServer.listen(4000, () => {
    console.log('listening');
    return 'listening...';
});
