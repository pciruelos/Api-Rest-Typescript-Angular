"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 84000
    });
}
exports.signUp = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'algo esta mal' });
    }
    const user = await users_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ msg: 'el usuario ya existe' });
    }
    const newUser = new users_1.default(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
};
exports.signIn = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ msg: 'algo esta mal' });
    }
    const user = await users_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ msg: 'the user does not exixst' });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        return res.status(200).json({ token: createToken(user) });
    }
    return res.status(400).json({ msg: 'puto' });
};
