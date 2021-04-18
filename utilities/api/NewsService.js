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

    async getNewsKeywords(limit, useCache = true) {
        const localKeywordList = [];
        const keywordList = await apiService.get({
            url: `${config.API_URL}/news-keywords`,
            cacheKey: 'newsKeywords',
            useCache
        });
        if (limit) {
            keywordList.slice(0, limit).forEach((model) => {
                localKeywordList.push([model.word, model.score]);
            });
            return localKeywordList;
        }
        return keywordList;
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
