import {Request, Response} from 'express';
import path from 'path';
import fs from 'fs-extra';

import Photo from '../models/photo.model'

// export function holaMundo(req: Request, res: Response): Response {
//     return res.send('hola mundo 2')
// }

export async function createFoto(req: Request, res: Response) {

    const { title, descripcion } = req.body;
    const newFoto = {
        title: title,
        descripcion: descripcion,
        imgPath: req.file.path,
    };
    const photo = new Photo(newFoto);
    await photo.save();
    console.log(photo);
    
    return res.json({        
        message: 'foto guardada',
        photo
    })
}

export async function getFoto(req: Request, res:Response): Promise <Response> {
    const photos = await Photo.find();
    return res.json(photos);
}

export async function get1foto(req: Request, res:Response): Promise <Response> {
    const {id} = req.params
const foto = await Photo.findById(id);
return res.json(foto);
}

export async function deleteFoto(req: Request, res:Response): Promise <Response> {
    const { id } = req.params;
const delFoto = await Photo.findByIdAndDelete(id);
if (delFoto) {
    await fs.unlink(path.resolve(delFoto.imgPath))
}

return res.json({message:"foto borrada"});
}

export async function updateFoto(req: Request, res:Response): Promise <Response> {
    const {id} = req.params;
    const { title, descripcion } = req.body;
    const updatedFoto = await Photo.findByIdAndUpdate(id, {
        title,
        descripcion
    }, {new: true});

return res.json({
    message:"foto updated bro",
    updatedFoto
});
}