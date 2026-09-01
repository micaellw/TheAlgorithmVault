export class ModalRenderer {

    renderAccountModal(user) {
        
        const userId = user['id'];
        const username = user['username'] || "Guest";
        const email = user['email'] || "not-signed-in@vault.com";

        let profileImg = localStorage.getItem('profile_image');
        if (!profileImg || profileImg === "undefined") {
            profileImg = "/frontend-web/assets/default-avatar.png";
        }

        const modalHTML = `
        <div id="accountModal" class="account-modal">
            <button class="modal-close" >&times;</button>
            <div style="color: #8b949e; font-size: 0.85rem; margin-bottom: 20px; text-align: center;">${email}</div>

            <div id="modal-view-mode">
                <div style="text-align: center;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid var(--neon-blue); margin: 0 auto 15px; overflow: hidden; background: #555;">
                        <img src="${profileImg}" id="display-avatar" style="width: 105%; height:100%; object-fit: cover;">
                    </div>
                    <h2 id="display-username" style="margin: 10px 0; font-size: 1.4rem;">Hi, ${username}!</h2>
                    <button class="edit-btn"  style="background: transparent; border: 1px solid #484f58; color: var(--neon-blue); padding: 8px 20px; border-radius: 20px; cursor: pointer; margin-bottom: 20px;">
                        Edit Profile
                    </button>
                </div>
                <div class="modal-footer-btns" style="display: flex; background: #161b22; margin: 0 -20px -20px -20px; border-radius: 0 0 28px 28px; overflow: hidden;">
                    ${userId ? `
                        <button class="logout-btn"  style="flex: 1; padding: 15px; background: transparent; border: none; color: white; cursor: pointer; border-right: 1px solid #30363d;">Sign out</button>
                    ` : `
                        <button class="login-btn" style="flex: 1; padding: 15px; background: transparent; border: none; color: white; cursor: pointer;">Sign in</button>
                    `}
                </div>
            </div>

            <div id="modal-edit-mode" style="display: none;">
                <h3 style="text-align:center; margin-bottom: 15px;">Edit Profile</h3>
                <div style="position: relative; width: 80px; margin: 0 auto 20px;">
                    <img src="${profileImg}" id="edit-preview" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--neon-blue); display: block;">
                    <label for="avatar-upload" class="avatar-edit-label" style="position: absolute; bottom: 0; right: 0; background: var(--neon-blue); color: black; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 2px solid #1f1f1f;">
                        <i class="fas fa-camera" style="font-size: 12px;"></i>
                    </label>
                    <input type="file" id="avatar-upload" style="display: none;" accept="image/*" onchange="previewImage(this)">
                </div>
                <input type="text" id="edit-username-input" class="edit-input" value="${username}" style="width: 100%; background: #0d1117; border: 1px solid #30363d; color: white; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
                <div style="display: flex; gap: 10px;">
                    <button  class="save-btn" style="background: var(--neon-blue); color: black; flex: 1; border: none; padding: 10px; border-radius: 20px; cursor: pointer; font-weight: bold;">Save</button>
                    <button  class="cancel-btn" style="flex: 1; background: transparent; border: 1px solid #484f58; color: white; padding: 10px; border-radius: 20px; cursor: pointer;">Cancel</button>
                </div>
            </div>
        </div>
    `;

        const old = document.getElementById("accountModal");
        if (old) old.remove();
        
        document.body.insertAdjacentHTML("beforeend", modalHTML);

        this.bindModalEvents();
    }

    bindModalEvents() {
        
        const modal = document.getElementById("accountModal");
        if (!modal) return;

        const closeBtn = modal.querySelector(".modal-close");
        const editBtn = modal.querySelector(".edit-btn");
        const logoutBtn = modal.querySelector(".logout-btn");
        const loginBtn = modal.querySelector(".login-btn");
        const saveBtn = modal.querySelector(".save-btn");
        const cancelBtn = modal.querySelector(".cancel-btn");

        const viewMode = modal.querySelector("#modal-view-mode");
        const editMode = modal.querySelector("#modal-edit-mode");

        closeBtn?.addEventListener("click", () => modal.remove());

        editBtn?.addEventListener("click", () => {
            viewMode.style.display = "none";
            editMode.style.display = "block";
        });

        cancelBtn?.addEventListener("click", () => {
            editMode.style.display = "none";
            viewMode.style.display = "block";
        });

        logoutBtn?.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "/frontend-web/index.html";
        });

        loginBtn?.addEventListener("click", () => {
            window.location.href = "/frontend-web/client/login/login.html";
        });

        saveBtn?.addEventListener("click", () => {
            const newName = modal.querySelector(".username-input").value;
            localStorage.setItem("username", newName);
            location.reload();
        });
    }
}
