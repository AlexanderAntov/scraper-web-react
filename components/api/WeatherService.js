import { apiService } from './ApiService.js';
import { config } from '../../app.const.js';

class WeatherService {
    getRawData(useCache = true) {
        return apiService.get({
            url: `${config.API_URL}/weather-raw`,
            cacheKey: `weatherRaw`,
            useCache
        });
    }
}

export const weatherService = new WeatherService();
