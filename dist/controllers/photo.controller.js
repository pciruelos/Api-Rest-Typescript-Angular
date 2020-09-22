"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFoto = exports.deleteFoto = exports.get1foto = exports.getFoto = exports.createFoto = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const photo_model_1 = __importDefault(require("../models/photo.model"));
// export function holaMundo(req: Request, res: Response): Response {
//     return res.send('hola mundo 2')
// }
async function createFoto(req, res) {
    const { title, descripcion } = req.body;
    const newFoto = {
        title: title,
        descripcion: descripcion,
        imgPath: req.file.path,
    };
    const photo = new photo_model_1.default(newFoto);
    await photo.save();
    console.log(photo);
    return res.json({
        message: 'foto guardada',
        photo
    });
}
exports.createFoto = createFoto;
async function getFoto(req, res) {
    const photos = await photo_model_1.default.find();
    return res.json(photos);
}
exports.getFoto = getFoto;
async function get1foto(req, res) {
    const { id } = req.params;
    const foto = await photo_model_1.default.findById(id);
    return res.json(foto);
}
exports.get1foto = get1foto;
async function deleteFoto(req, res) {
    const { id } = req.params;
    const delFoto = await photo_model_1.default.findByIdAndDelete(id);
    if (delFoto) {
        await fs_extra_1.default.unlink(path_1.default.resolve(delFoto.imgPath));
    }
    return res.json({ message: "foto borrada" });
}
exports.deleteFoto = deleteFoto;
async function updateFoto(req, res) {
    const { id } = req.params;
    const { title, descripcion } = req.body;
    const updatedFoto = await photo_model_1.default.findByIdAndUpdate(id, {
        title,
        descripcion
    }, { new: true });
    return res.json({
        message: "foto updated bro",
        updatedFoto
    });
}
exports.updateFoto = updateFoto;
