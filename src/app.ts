//encargado de CREAR Y CONFIGURAR el servidor

import express from 'express';
import morgan from 'morgan';
import indexRoutes from './routes/index.routes';
import authRoutes from './routes/auth.routes';
import path from 'path';
import cors from 'cors';

const app = express();

//inicializaciones

//settings
app.set('port', process.env.PORT || 3000);

//midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//global variables

//routes
app.use('/api', indexRoutes);
app.use(authRoutes);

//static files
app.use('/uploads', express.static(path.resolve('uploads')));


export default app;

