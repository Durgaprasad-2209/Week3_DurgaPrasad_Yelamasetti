import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { Weather } from './Weather';

export const sendWeatherEmail = async (req: Request, res: Response) => {
  const cities = req.body;
  
  try {
    const weatherData = await Promise.all(cities.map(async (cityInfo: any) => {
      const { city, country } = cityInfo;
      const latestWeather = await Weather.findOne({
        where: { city, country },
        order: [['time', 'DESC']]
      });

      return latestWeather;
    }));

    const validWeatherData = weatherData.filter(data => data !== null);

    if (validWeatherData.length === 0) {
      return res.status(404).json({ message: 'No weather data found for the provided cities' });
    }

    const emailContent = `
      <h1>Weather Report</h1>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Country</th>
            <th>Date</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          ${validWeatherData.map(weather => `
            <tr>
              <td>${weather.id}</td>
              <td>${weather.city}</td>
              <td>${weather.country}</td>
              <td>${new Date(weather.time).toLocaleString()}</td>
              <td>${weather.weather}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

   
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dp922999@gmail.com', 
        pass: 'zzdd qwpo dcop tuwz',  
      },
    });

    const mailOptions = {
      from: 'dp922999@gmail.com',
      to: '184101.gvp@gmail.com',
      subject: 'Weather Report',
      html: emailContent,
    };

   
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Weather report emailed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
};
