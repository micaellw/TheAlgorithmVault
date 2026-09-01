 //send_data.js
 const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        // --- ตัวแปร Modal ---
        const modal = document.getElementById('successModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalIcon = document.getElementById('modalIcon');
        const modalCard = document.querySelector('.modal-card');

        // --- ฟังก์ชันจัดการ Modal ---
        function showModal(title, message, isError = false) {
            modalTitle.innerText = title;
            modalMessage.innerText = message;

            if (isError) {
                // 🔴 Error Mode
                modalCard.classList.add('error-mode');
                modalIcon.className = 'fas fa-times-circle'; // เปลี่ยนไอคอนเป็น X
            } else {
                // 🟢 Success Mode
                modalCard.classList.remove('error-mode');
                modalIcon.className = 'fas fa-check-circle'; // เปลี่ยนไอคอนเป็น ถูก
            }

            modal.classList.add('active');
        }

        function closeModal() {
            // if( modalIcon.className == 'fas fa-check-circle' ){
            //     window.location.href = "/frontend-web/index.html";
            // }else{
            modal.classList.remove('active');
        // }
        }

        // --- Animation สลับหน้า ---
        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });

        // 1. Logic สำหรับ Register Form
        const registerForm = document.getElementById('registerForm');
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch('http://127.0.0.1:8000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const result = await response.json();
                    showModal("Account Created!", "Welcome, " + result.username + ". Please sign in.");
                    container.classList.remove("right-panel-active"); // สลับกลับไปหน้า Login
                    registerForm.reset(); // ล้างฟอร์ม
                } else {
                    const error = await response.json();
                    showModal("Registration Failed", error.detail, true); // True = Error Mode
                }
            } catch (err) {
                showModal("Connection Error", "Cannot connect to server.", true);
            }
        });

        // 2. Logic สำหรับ Login Form
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const loginData = {
                identifier: document.getElementById('loginIdentifier').value,
                password: document.getElementById('loginPassword').value
            };

            try {
                const response = await fetch('http://127.0.0.1:8000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData)
                });

                if (response.ok) {
                    const result = await response.json();
                    localStorage.setItem('user_id', result.user_id);
                    localStorage.setItem('username', result.username);
                    localStorage.setItem('user_email', result.user_email);

                    // ดึงข้อมูล User เต็มๆ เพื่อเอารูปโปรไฟล์มาเก็บไว้ในเครื่องด้วย
                    const profileRes = await fetch(`http://localhost:8000/users/${result.username}`);
                    const profileData = await profileRes.json();
    
                    const imageUrl = `http://localhost:8000/static/profile_pics/${profileData.profile_image || 'default-avatar.png'}`;
                    localStorage.setItem('profile_image', imageUrl);

                    showModal("Welcome Back!", "Hello " + result.username + ", nice to see you again!");
                    // หลังจากปิด Modal หรือหน่วงเวลาสักพัก ให้ไปหน้าหลัก
                     setTimeout(() => {
                    window.location.href = "/frontend-web/index.html";
                    }, 1500);
                } else {
                    const error = await response.json();
                    showModal("Login Failed", error.detail, true); // True = Error Mode
                }
            } catch (err) {
                showModal("Connection Error", "Cannot connect to server.", true);
            }
        });

// ในหน้า Login ของคุณ (สมมติว่าเป็นฟังก์ชัน handleLogin)
async function handleLogin(identifier, password) {
    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
    });

    const data = await response.json();

    if (response.ok) {
        // ✅ หัวใจสำคัญ: บันทึกข้อมูลคนล็อกอินลงในเครื่อง
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('username', data.username);
        
        alert("ยินดีต้อนรับ " + data.username);
        window.location.href = "index.html"; // ไปหน้าหลัก
    } else {
        alert(data.detail);
    }
}        