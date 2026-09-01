export class UIManager {

    constructor(dis) {
        this.dis = dis;
        this.contentPages = [];
        this.currentIndex = 0;

    }

    initializeEverything() {
        this.updateContentPagesArray();
        this.nav_bar();
        this.initSaveAndDownloadIcons();
        this.dotscroll();

        if (this.contentPages.length > 0) {
            this.switchArticle(this.contentPages[0]);
        }
    }

    // =========================
    // 🔹 SWITCH ARTICLE
    // =========================
    switchArticle(targetId) {

        // ซ่อนทุกหน้า
        document.querySelectorAll('.article-section').forEach(sec => {
            sec.classList.remove('active');
            sec.style.display = 'none';
        });

        // แสดงหน้าเป้าหมาย
        const target = document.getElementById(targetId);
        if (target) {
            target.classList.add('active');
            target.style.display = 'block';

            const container = target.querySelector('.explanation-container');
            if (container) container.scrollTop = 0;

            // อัปเดตสถานะปุ่มและเมนู
            this.updateContentPagesArray();
            this.updateButtonState(targetId);
            this.updateSidebarHighlight(targetId);
        }
    }

    // =========================
    // 🔹 NAVIGATE PAGE
    // =========================
    navigatePage(direction) {

        const activeSection = document.querySelector('.article-section.active');
        let currentIndex = 0;

        if (activeSection) {
            currentIndex = this.contentPages.indexOf(activeSection.id);
        }

        const nextIndex = currentIndex + direction;

        // เช็คขอบเขต Array
        if (nextIndex < 0 || nextIndex >= this.contentPages.length) {
            return;
        }

        this.switchArticle(this.contentPages[nextIndex]);
    }

    // =========================
    // 🔹 UPDATE SIDEBAR
    // =========================
    updateSidebarHighlight(id) {
        document.querySelectorAll('.toc-link, .sub-link').forEach(l => l.classList.remove('active'));

        const links = document.querySelectorAll(`a[onclick*="${id}"]`);

        links.forEach(link => {
            // ไฮไลท์ตัวมันเอง
            link.classList.add('active');

            // 3. เช็คเพิ่ม: ถ้าตัวที่เจอเป็นลูก (sub-link) ให้ไปไฮไลท์แม่มันด้วย
            // (กรณี Dijkstra ที่แม่ไม่ได้ลิงก์ไปที่เดียวกัน แต่เราอยากให้แม่ติดไฟด้วย)
            if (link.classList.contains('sub-link')) {
                // วิ่งย้อนขึ้นไปหา <li> ที่คลุม Group นี้อยู่
                const parentGroup = link.closest('.toc-list > li');
                if (parentGroup) {
                    // หาหัวข้อแม่ใน Group นั้น
                    const parentLink = parentGroup.querySelector('.toc-link');
                    if (parentLink) parentLink.classList.add('active');
                }
            }
        });
    }

    // =========================
    // 🔹 UPDATE BUTTON STATE
    // =========================
    updateButtonState(currentId) {
        const currentIndex = this.contentPages.indexOf(currentId);
        const totalPages = this.contentPages.length;

        const currentSection = document.getElementById(currentId);
        if (!currentSection) return;

        // หาปุ่มในหน้านั้นๆ
        const buttons = currentSection.querySelectorAll('.nav-buttons-container .nav-button');
        if (buttons.length < 2) return;

        const btnBack = buttons[0];
        const btnNext = buttons[1];

        // รีเซ็ตให้กดได้ก่อน
        if (btnBack) this.enableButton(btnBack);
        if (btnNext) this.enableButton(btnNext);

        // --- ส่วนเงื่อนไข (ลบบรรทัดที่ซ้ำกันออกให้เหลือแค่นี้) ---

        // ถ้าอยู่หน้าแรก -> ปิด Back
        if (currentIndex <= 0 && btnBack) this.disableButton(btnBack);
        // ถ้าอยู่หน้าสุดท้าย -> ปิด Next
        if (currentIndex >= totalPages - 1 && btnNext) this.disableButton(btnNext);
    }

    disableButton(btn) {
        btn.classList.add('disabled');
        btn.style.opacity = "0.3";
        btn.style.pointerEvents = "none";
    }

    enableButton(btn) {
        btn.classList.remove('disabled');
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
    }

    // =========================
    // 🔹 DOT SCROLL
    // =========================
    dotscroll() {

        const paginationContainer = document.getElementById('pagination-container');
        const pages = document.querySelectorAll('.page');
        const container = document.querySelector('.container');
        const backhead = document.querySelector('.top');
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';


        pages.forEach((page, index) => {


            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('selected');
            dot.addEventListener('click', () => {
                if (pages[index]) {
                    pages[index].scrollIntoView({ behavior: 'smooth' });
                }
            });


            paginationContainer.appendChild(dot);

        });

        const allDots = document.querySelectorAll('.dot');

        if (backhead && pages.length > 0) {
            backhead.addEventListener('click', () => {
                pages[0].scrollIntoView({ behavior: 'smooth' });
            });
        }


        if (container && allDots.length > 0 && pages.length > 0) {
            const observerOptions = {
                root: container,
                threshold: 0.5
            };

            const selectswitch = document.querySelectorAll('.selectswitch')

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = Array.from(pages).indexOf(entry.target);
                        allDots.forEach(dot => dot.classList.remove('selected'));
                        if (allDots[index]) allDots[index].classList.add('selected');

                        if (backhead) {
                            backhead.style.display = (index === 0) ? 'none' : 'block';
                        }

                        selectswitch.forEach((el) => {
                            el.style.display = (index > 0) ? 'none' : 'block';
                        });
                    }
                    if (entry.isIntersecting) {
                        const index = Array.from(pages).indexOf(entry.target);

                        if (index === 1) {

                            const hasActive = document.querySelector('.article-section.active');
                            if (!hasActive) {
                                this.switchArticle('theory-section');
                            }
                        }
                    }
                });

            }, observerOptions);

            pages.forEach(page => observer.observe(page));
        }

    }

    // =========================
    // 🔹 NAVBAR
    // =========================
    nav_bar() {

        const hamburgerBtn = document.getElementById("hamburger-btn");
        const navLinks = document.getElementById("list-items");
        
        if (hamburgerBtn && navLinks) {
            let currentMode = 'menu';
            hamburgerBtn.addEventListener("click", () => {
                navLinks.classList.toggle("active");
                (currentMode === 'menu') ? currentMode = 'close-small' : currentMode = 'menu';
                hamburgerBtn.textContent = currentMode;
            });

            document.addEventListener("click", (e) => {

                if (!e.target.closest(".hamburger") &&
                    !e.target.closest(".list-items")) {
                    navLinks.classList.remove("active");
                    currentMode = 'menu'
                    hamburgerBtn.textContent = currentMode;
                }
                
            });
        } else {
            console.warn("หาปุ่ม Navbar ไม่เจอในขณะที่เรียกใช้ฟังก์ชัน");
        }

        const base = new URL('../../', import.meta.url).href;
        const navLinksMap = {
            "HOME": `${base}index.html`,
            "Pathfinding Visualizer": `${base}workpiece/Pathfinding Visualizer/Layout_Pathfinding_Visualizer.html`,
            "Data Structure Lab": `${base}workpiece/Linked List or Stack/Linked_List_AND_Stack.html`,
            "Math Expression Engine": `${base}workpiece/Infix to Posfix/calculatorlogic.html`,
            "Visual Pattern Studio": `${base}workpiece/Neated Loops/Pattern_Studio.html`,
            "Security & Utility Tools": `${base}workpiece/Caeser Cipher/CaesarCipher_And_AnagramChecker.html`,
            "Towers of Hanoi": `${base}workpiece/Tower_Of_Hanoi/TowerOfHanoi.html`,
            "ABOUT": `${base}about.html`
        };

        const currentPath = window.location.pathname;
        const menuLinks = document.querySelectorAll(".list-windown");
        const Topic1 = document.querySelector('#link-theory');
        const Topic2 = document.querySelector('#link-logic');
        const sub = document.querySelector('.sub-toc');
        const con = document.querySelector('.popup-content');

        menuLinks.forEach(link => {
            const text = link.textContent.trim();
            if (navLinksMap[text]) {
                link.href = navLinksMap[text];
            }
            link.classList.remove('selected');
        });

        menuLinks.forEach(link => {
            if (link.getAttribute('href') === '#') return;
            const linkPath = new URL(link.href, window.location.origin).pathname;
            const normalizedPath = currentPath.endsWith('/') ? currentPath + 'index.html' : currentPath;
            const pageName = currentPath.split("/").pop();
            if (normalizedPath.endsWith(linkPath) || linkPath.endsWith(pageName)) {
                link.classList.add('selected');
            }
            // console.log(linkPath);
            if (sub) {
                switch (pageName) {
                    case "Layout_Pathfinding_Visualizer.html":
                        sub.innerHTML = `
                <li>
                    <a href="javascript:void(0)" class="sub-link sub-show" id="link-astar" onclick="switchArticle('code-logic')">A-Star Algorithm</a>
                </li>
                <li>
                    <a href="javascript:void(0)" class="sub-link sub-show" id="link-dijkstra" onclick="switchArticle('dijkstra-logic')">Dijkstra Algorithm</a>
                </li>
                <li>
                    <a href="javascript:void(0)" class="sub-link sub-show" id="link-MinHeap" onclick="switchArticle('MinHeap-logic')">MinHeap Algorithm</a>
                </li>`;

                        con.innerHTML = this.dis.Pathfinding_Visualizer();
                        this.openPopup();
                        break;

                    case "Linked_List_AND_Stack.html":
                        Topic2.remove();
                        con.innerHTML = this.dis.LinkedListAndStack();
                        this.openPopup();
                        break;

                    case "calculatorlogic.html":
                        Topic2.remove();
                        con.innerHTML = this.dis.InfixToPostfix();
                        this.openPopup();
                        break;

                    case "Pattern_Studio.html":
                        sub.innerHTML = `
                <li>
                    <a href="javascript:void(0)" class="sub-link sub-show" id="link-astar" onclick="switchArticle('code-logic')">Pattern-logic</a>
                </li>`
                        con.innerHTML = this.dis.Pattern_Studio();
                        this.openPopup();
                        break;

                    case "CaesarCipher_And_AnagramChecker.html":
                        sub.innerHTML = `
                <li>
                    <a href="javascript:void(0)" class="sub-link sub-show" id="link-astar" onclick="switchArticle('code-logic')">Engine Architecture & Advanced Extensions</a>
                </li>`
                        con.innerHTML = this.dis.SecurityUtilityLab();
                        this.openPopup();
                        break;

                    case "TowerOfHanoi.html":
                        sub.innerHTML = `
                <li>
                    <a href="javascript:void(0)" class="sub-link sub-show" id="link-astar" onclick="switchArticle('code-logic')">RECURSIVE ENGINE</a>
                </li>`
                        con.innerHTML = this.dis.TowerOfHanoi();
                        this.openPopup();
                        break;

                    case "about.html":
                        sub.innerHTML = `
                <li>
                    <a href="javascript:void(0)" class="sub-link sub-show" id="link-astar" onclick="switchArticle('code-logic')">เหตุผลที่สร้างโครงการนี้</a>
                </li>`
                        Topic1.innerText = 'The Algorithm Vault'
                        Topic2.innerText = 'reason'
                        break;

                    default:
                        sub.innerHTML = "";
                        break;
                }
            }
        });

        const profileImg = localStorage.getItem('profile_image');
        const acc = document.getElementById('account');

        const displayImg = (profileImg && profileImg !== "undefined")
            ? profileImg
            : "/frontend-web/assets/default-avatar.png";


        const closeBtn = document.querySelector('.popup-close');
        if (closeBtn) {
            closeBtn.addEventListener("click", () => this.closePopup());
        }
    }

    openPopup() {
        document.getElementById("big-popup").classList.add("active");
    }

    closePopup() {
        document.getElementById("big-popup").classList.remove("active");
    }


    // =========================
    // 🔹 FAVORITE ICON
    // =========================
    initSaveAndDownloadIcons() {
        const fileMap = {
            Pattern_Studio: "Neated Loops.rar",
            CaesarCipher_And_AnagramChecker: "Caeser Cipher.rar",
            calculatorlogic: "Infix to Posfix.rar",
            Linked_List_AND_Stack: "Linked List or Stack.rar",
            Layout_Pathfinding_Visualizer: "Pathfinding Visualizer.rar",
            TowerOfHanoi: "Tower_Of_Hanoi.rar"
        }
        const download = document.querySelector('.download');


        download?.addEventListener("click", () => {

            const currentPage = window.location.pathname.split("/").pop();
            const currentPagename = currentPage.split(".html")
            const fileName = fileMap[currentPagename[0]];
            console.log(fileName, currentPagename[0])

            if (!fileName) {
                alert("No file mapped for this page");
                return;
            }

            window.location.href =
                `http://127.0.0.1:8000/download?file=${encodeURIComponent(fileName)}`;
        });
    }

    // =========================
    // 🔹 ACCOUNT MODAL
    // =========================


    // =========================
    // 🔹 CONTENT PAGES ARRAY
    // =========================
    updateContentPagesArray() {

        const elements = document.querySelectorAll('.sub-show');

        this.contentPages = Array.from(elements).map(el => {
            // หา element ที่เป็น tag <a>
            const link = el.tagName === 'A' ? el : el.closest('a');
            if (!link) return null;

            const onClickText = link.getAttribute('onclick');
            if (!onClickText) return null;

            // Regex ดึงค่าในวงเล็บ (รองรับทั้ง ' และ ")
            const match = onClickText.match(/['"]([^'"]+)['"]/);
            return match ? match[1] : null;
        }).filter(id => id !== null);
    }

}

