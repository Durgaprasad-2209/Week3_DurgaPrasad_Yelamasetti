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
exports.ADrouter = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const Weather_1 = require("../Weather");
exports.ADrouter = (0, express_1.Router)();
const GEOCODING_API_KEY = 'F0g3cgopNC+zRzozCvqs0A==Cdc9BsuF8cUHQXOd';
const WEATHER_API_KEY = 'd7ea9cabf6mshb5009a168ed092ep1b4196jsne51432b4599b';
exports.ADrouter.post('/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = req.body;
    try {
        for (const cityInfo of cities) {
            const { city, country } = cityInfo;
            const geoResponse = yield axios_1.default.get('https://api.api-ninjas.com/v1/geocoding', {
                params: { city, country },
                headers: { 'X-Api-Key': GEOCODING_API_KEY }
            });
            console.log('GeoCoding API Response:', geoResponse.data);
            if (!geoResponse.data.length) {
                throw new Error(`Geocoding API did not return data for ${city}, ${country}`);
            }
            const { latitude, longitude } = geoResponse.data[0];
            const weatherResponse = yield axios_1.default.get('https://weatherapi-com.p.rapidapi.com/current.json', {
                params: { q: `${latitude},${longitude}` },
                headers: {
                    'x-rapidapi-key': WEATHER_API_KEY,
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                }
            });
            const weatherData = weatherResponse.data.current.condition.text;
            yield Weather_1.Weather.create({
                city,
                country,
                weather: weatherData,
                time: new Date(),
                longitude,
                latitude
            });
        }
        res.status(200).send('Weather data saved successfully');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred ');
    }
}));
exports.default = exports.ADrouter;
//# sourceMappingURL=AD.js.map