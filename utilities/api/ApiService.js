class ApiService {
    constructor() {
        this.cache = {};
    }

    get({ url, cacheKey, useCache = true }) {
        if (useCache && this.cache[cacheKey]) {
            return Promise.resolve(this.cache[cacheKey]);
        }
        return fetch(url).then((response) => {
            return response.json().then((data) => {
                this.cache[cacheKey] = JSON.parse(JSON.stringify(data));
                return data;
            });
        });
    }
}

export const apiService = new ApiService();
