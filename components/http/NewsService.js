import { config } from '../../app.const.js';

class NewsService {
    getNewsList(suffix) {
        return fetch(`${config.API_URL}/${suffix}`).then((list) => {
            return list.json();
        });
    }

    getNewsKeywords() {
        return fetch(`${config.API_URL}/news-keywords`).then((list) => {
            return list.json();
        });
    }

    getNewsProvidersList() {
        return fetch(`${config.API_URL}/news-providers`).then((list) => {
            return list.json();
        });
    }

    scrape(id) {
        return fetch(`${config.API_URL}/scrape/${id}`).then((model) => {
            return model.json();
        });
    }
}

export const newsService = new NewsService();
