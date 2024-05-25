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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = 3001; // Changed port number
app.use(express_1.default.json());
app.post('/api/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude } = req.body;
    try {
        console.log(`Request received with latitude: ${latitude}, longitude: ${longitude}`);
        const geocodingResponse = yield axios_1.default.get('https://api.api-ninjas.com/v1/geocoding', {
            params: { lat: latitude, lon: longitude },
            headers: { 'X-Api-Key': 'F0g3cgopNC+zRzozCvqs0A==Cdc9BsuF8cUHQXOd' } // Replace with your actual API key
        });
        console.log(`Geocoding API response status: ${geocodingResponse.status}`);
        console.log('Geocoding API response data:', geocodingResponse.data);
        if (geocodingResponse.status !== 200) {
            console.error(`Geocoding API responded with status ${geocodingResponse.status}`);
            return res.status(geocodingResponse.status).json({ message: 'Error fetching geocoding data' });
        }
        const geocodingData = geocodingResponse.data;
        if (!geocodingData || geocodingData.length === 0) {
            return res.status(404).json({ message: 'No location data found for the provided coordinates' });
        }
        const locationInfo = geocodingData[0];
        const { name: city, country } = locationInfo;
        const newWeatherMapping = {
            id: new Date().getTime(),
            city,
            country,
            date: new Date().toISOString(),
            weather: 'Not available' // Placeholder since we're focusing on geocoding data only
        };
        console.log('New weather mapping created:', newWeatherMapping);
        res.status(201).json(newWeatherMapping);
    }
    catch (error) {
        console.error('Error saving weather mapping:', error);
        res.status(500).json({ message: 'Failed to save weather mapping', error });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=d.js.map