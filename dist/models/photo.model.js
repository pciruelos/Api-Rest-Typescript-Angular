"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PhotoSchema = new mongoose_1.Schema({
    title: String,
    descripcion: String,
    imgPath: String,
});
exports.default = mongoose_1.model('Photo', PhotoSchema);
