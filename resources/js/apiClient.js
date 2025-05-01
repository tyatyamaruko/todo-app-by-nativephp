export default class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(endpoint) {
        return await fetch(`${this.baseURL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }

    async post(endpoint, data = {}) {
        return await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

}

