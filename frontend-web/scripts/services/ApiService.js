export class ApiService {

    constructor() {
        this.BASE = "http://localhost:8000";
    }

    async get(endpoint) {
        const res = await fetch(this.BASE + endpoint);
        return res.json();
    }

    async post(endpoint, body) {
        const res = await fetch(this.BASE + endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        return res;
    }

    async put(endpoint) {
        const res = await fetch(this.BASE + endpoint, {
            method: "PUT"
        });
        return res;
    }

    async upload(endpoint, formData) {
        return await fetch(this.BASE + endpoint, {
            method: "POST",
            body: formData
        });
    }
}
