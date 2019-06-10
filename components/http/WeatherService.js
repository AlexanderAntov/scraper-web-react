import { config } from '../../app.const.js';

class WeatherService {
    getRawData() {
        return fetch(`${config.API_URL}/weather-raw`).then((data) => {
            return data.json();
        });
    }
}

export const weatherService = new WeatherService();
