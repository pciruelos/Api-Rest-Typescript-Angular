import {Schema, model, Document} from 'mongoose';

const PhotoSchema = new Schema ({
    title: String,
    descripcion: String,
    imgPath: String,

});

interface Iphoto extends Document {
    title: string;
    descripcion: string;
    imgPath: string;
}

export default model<Iphoto>('Photo', PhotoSchema)