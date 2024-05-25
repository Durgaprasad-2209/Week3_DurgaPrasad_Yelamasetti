import { Router,Request, Response } from 'express';
import axios from 'axios';
import {Weather} from '../Weather';
import  {sequelize } from '../pgConfig';

export const ADrouter=Router()

const GEOCODING_API_KEY = 'F0g3cgopNC+zRzozCvqs0A==Cdc9BsuF8cUHQXOd';
const WEATHER_API_KEY = 'd7ea9cabf6mshb5009a168ed092ep1b4196jsne51432b4599b';

ADrouter.post('/SaveWeatherMapping', async (req: Request, res: Response) => {
  const cities: { city: string, country: string }[] = req.body;
  
    try {
      
      for (const cityInfo of cities) {
        const { city, country } = cityInfo;
  
        const geoResponse = await axios.get('https://api.api-ninjas.com/v1/geocoding', {
          params: { city, country },
          headers: { 'X-Api-Key': GEOCODING_API_KEY }
        });
        console.log('GeoCoding API Response:', geoResponse.data);
        if (!geoResponse.data.length) {
          throw new Error(`Geocoding API did not return data for ${city}, ${country}`);
        }
  
        const { latitude, longitude } = geoResponse.data[0];
  
        const weatherResponse = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
          params: { q: `${latitude},${longitude}` },
          headers: {
            'x-rapidapi-key': WEATHER_API_KEY,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
          }
        });
  
        const weatherData = weatherResponse.data.current.condition.text;
  
        await Weather.create({
          city,
          country,
          weather: weatherData,
          time: new Date(),
          longitude,
          latitude
        });
      }
  
      res.status(200).send('Weather data saved successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred ');
    }
  });
  
 
  

export default ADrouter;
