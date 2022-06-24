import express from 'express';
import imagesBrowser from './api/imagesBrowser';
import image from './api/image';

const routes = express.Router();

routes.use('/imagesBrowser', imagesBrowser);
routes.use('/image', image);

export default routes;
