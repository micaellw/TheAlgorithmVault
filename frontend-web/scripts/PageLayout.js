import { ComponentLoader } from "./core/ComponentLoader.js";
import { UIManager } from "./ui/UIManager.js";
import { Discriptions } from "./ui/Discription.js";

class Application {

    constructor() {
        this.loader = new ComponentLoader();
        this.Dis = new Discriptions();
        this.ui = new UIManager(this.Dis);
    }
    
    async init() {
        console.log("System Initializing...");

        const stylesBase = new URL('../styles/', import.meta.url).href;

        // 1️⃣ โหลด Navbar เสมอ
        await this.loader.load(new URL('navbar.html', stylesBase).href, "content-placeholder");

        const tasks = [];

        // 2️⃣ ตรวจสอบ container เพื่อโหลด components
        if (document.getElementById("vault-index")) {
            tasks.push(
                this.loader.load(new URL('VAULT_INDEX.html', stylesBase).href, "vault-index")
            );
        }

        if (document.getElementById("paginative")) {
            tasks.push(
                this.loader.load(new URL('dot.html', stylesBase).href, "paginative")
            );
        }

        if (document.getElementById("menuactive")) {
            tasks.push(
                this.loader.load(new URL('initSaveAndDownloadIconsMenu.html', stylesBase).href, "menuactive")
            );
        }

        await Promise.all(tasks);

        // 3️⃣ หลังโหลดครบ → เรียก UI ทั้งหมด
        this.ui.initializeEverything();
    }
}

const app = new Application();
app.init();
window.switchArticle = (id) => app.ui.switchArticle(id);
window.navigatePage = (dir) => app.ui.navigatePage(dir);
window.dotscroll = () => app.ui.dotscroll();
window.nav_bar = () => app.ui.nav_bar();
