import { Request, Response } from 'express';
import { Weather } from './Weather';
import  {sequelize}  from './pgConfig';

export const getWeatherDashboard = async (req: Request, res: Response) => {
  const city = req.query.city as string;

  try {
    if (city) {
      const weatherData = await Weather.findAll({
        where: { city },
        attributes: ['id', 'city', 'country', 'time', 'weather'],
        order: [['id', 'ASC']]
      });
      res.status(200).json(weatherData);
    } else {
      const weatherData = await Weather.findAll({
        attributes: [
          'id',
          'city',
          'country',
          [sequelize.fn('MAX', sequelize.col('time')), 'date'],
          'weather'
        ],
        group: ['id', 'city', 'country', 'weather'],
        order: [['id', 'ASC']]
      });
      res.status(200).json(weatherData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
};
