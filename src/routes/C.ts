import { Router } from 'express';
import { sendWeatherEmail } from '../mail';

export const Crouter = Router();

Crouter.post('/sendWeatherEmail', sendWeatherEmail);

export default Crouter;
