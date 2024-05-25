"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWeatherEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const Weather_1 = require("./Weather");
const sendWeatherEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = req.body;
    try {
        const weatherData = yield Promise.all(cities.map((cityInfo) => __awaiter(void 0, void 0, void 0, function* () {
            const { city, country } = cityInfo;
            const latestWeather = yield Weather_1.Weather.findOne({
                where: { city, country },
                order: [['time', 'DESC']]
            });
            return latestWeather;
        })));
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
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'dp922999@gmail.com',
                pass: 'zzdd qwpo dcop tuwz',
            },
        });
        // Set up email options
        const mailOptions = {
            from: 'dp922999@gmail.com',
            to: '184101.gvp@gmail.com',
            subject: 'Weather Report',
            html: emailContent,
        };
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Weather report emailed successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
});
exports.sendWeatherEmail = sendWeatherEmail;
//# sourceMappingURL=mail.js.map