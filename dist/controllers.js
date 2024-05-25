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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherDashboard = void 0;
const Weather_1 = require("./Weather");
const pgConfig_1 = require("./pgConfig");
const getWeatherDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const city = req.query.city;
    try {
        if (city) {
            const weatherData = yield Weather_1.Weather.findAll({
                where: { city },
                attributes: ['id', 'city', 'country', 'time', 'weather'],
                order: [['id', 'ASC']]
            });
            res.status(200).json(weatherData);
        }
        else {
            const weatherData = yield Weather_1.Weather.findAll({
                attributes: [
                    'id',
                    'city',
                    'country',
                    [pgConfig_1.sequelize.fn('MAX', pgConfig_1.sequelize.col('time')), 'date'],
                    'weather'
                ],
                group: ['id', 'city', 'country', 'weather'],
                order: [['id', 'ASC']]
            });
            res.status(200).json(weatherData);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data.' });
    }
});
exports.getWeatherDashboard = getWeatherDashboard;
//# sourceMappingURL=controllers.js.map