export class FavoriteService {

    constructor(api) {
        this.api = api;
    }

    async toggle(pageId, downloaded = false) {
        const userId = localStorage.getItem("user_id");
        if (!userId) return false;

        const res = await this.api.post(`/users/${userId}/favorites`, {
            page_path: pageId,
            title: document.querySelector("h1")?.innerText || "Vault",
            downloaded: downloaded
        });

        return res.ok;
    }
}
