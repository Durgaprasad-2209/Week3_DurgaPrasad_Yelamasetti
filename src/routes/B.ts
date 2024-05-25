import express, { Request, Response } from 'express';

export const Brouter = express.Router()

import { getWeatherDashboard } from '../controllers';

Brouter.get('/weatherDashboard', getWeatherDashboard);

export default Brouter;
