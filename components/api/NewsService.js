import { apiService } from './ApiService.js';
import { config } from '../../app.const.js';

class NewsService {
    getNewsList(suffix, useCache = true) {
        return apiService.get({
            url: `${config.API_URL}/${suffix}`,
            cacheKey: `newsList${suffix}`,
            useCache
        });
    }

    getNewsKeywords(useCache = true) {
        return apiService.get({
            url: `${config.API_URL}/news-keywords`,
            cacheKey: 'newsKeywords',
            useCache
        });
    }

    getNewsProvidersList(useCache = true) {
        return apiService.get({
            url: `${config.API_URL}/news-providers`,
            cacheKey: 'newsProviders',
            useCache
        });
    }

    scrape(id, useCache = true) {
        return apiService.get({
            url: `${config.API_URL}/scrape/${id}`,
            cacheKey: `scrape${id}`,
            useCache
        });
    }
}

export const newsService = new NewsService();
