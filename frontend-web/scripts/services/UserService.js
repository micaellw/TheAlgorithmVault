export class UserService {

    constructor(api) {
        this.api = api;
    }

    getLocalUser() {
        return {
            id: localStorage.getItem("user_id"),
            username: localStorage.getItem("username"),
            email: localStorage.getItem("user_email"),
            image: localStorage.getItem("profile_image")
        };
    }

    async updateProfile(name, file) {
        const user = this.getLocalUser();
        if (!user.id) return false;

        await this.api.put(`/users/${user.id}?username=${encodeURIComponent(name)}`);

        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const res = await this.api.upload(`/users/${user.id}/upload-avatar`, formData);
            const data = await res.json();
            localStorage.setItem("profile_image", data.image_url);
        }

        localStorage.setItem("username", name);
        return true;
    }
}
