import {Router} from 'express';
const router = Router();

import {createFoto, getFoto, get1foto, deleteFoto, updateFoto } from '../controllers/photo.controller';

import multer from '../libs/multer';

router.route('/photos')
.post(multer.single('image'), createFoto)
.get(getFoto);

router.route('/photos/:id')
.get(get1foto)
.put(updateFoto)
.delete(deleteFoto);


export default router;
