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
exports.Drouter = void 0;
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
exports.Drouter = (0, express_1.Router)();
exports.Drouter.post('/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.body;
    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }
    try {
        const apiNinjasUrl = `https://api.api-ninjas.com/v1/geocoding?city=${encodeURIComponent(address)}`;
        const response = yield axios_1.default.get(apiNinjasUrl, {
            headers: {
                'X-Api-Key': 'F0g3cgopNC+zRzozCvqs0A==Cdc9BsuF8cUHQXOd'
            }
        });
        const data = response.data;
        console.log(data); // Log the response data for debugging
        // Ensure data is an array before attempting to access its elements
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(404).json({ error: 'Location not found or invalid response from API' });
        }
        const location = data[0]; // Assuming the first result is the most relevant
        return res.status(200).json(location);
    }
    catch (error) {
        console.error('Error while fetching data from API:', error);
        if (axios_1.default.isAxiosError(error) && error.response) {
            // Handle HTTP errors
            return res.status(error.response.status).json({ error: error.response.statusText });
        }
        // Handle unexpected errors
        return res.status(500).json({ error: 'An error occurred while processing your request' });
    }
}));
exports.default = exports.Drouter;
//# sourceMappingURL=D.js.map