export class AuthGuard {

    isLoggedIn() {
        return !!localStorage.getItem("user_id");
    }

    requireAuth() {
        if (!this.isLoggedIn()) {
            alert("กรุณาเข้าสู่ระบบก่อน");
            window.location.href = "/frontend-web/client/login/login.html";
            return false;
        }
        return true;
    }

    logout() {
        localStorage.clear();
        window.location.href = "/frontend-web/index.html";
    }
}
