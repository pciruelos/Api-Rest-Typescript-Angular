"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function startConnection() {
    await mongoose_1.default.connect('mongodb://localhost/angulartest-db', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log('database is connected');
}
exports.startConnection = startConnection;
