"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("../controllers/api"));
const joi_1 = require("../middleware/joi");
const router = express_1.default.Router();
router.get('/', api_1.default.home);
router.get('/login', (0, joi_1.ValidateJoi)(joi_1.LoginSchema), api_1.default.login);
router.get('/register', (0, joi_1.ValidateJoi)(joi_1.RegisterSchema), api_1.default.register);
router.get('/logout', api_1.default.logout);
exports.default = router;
