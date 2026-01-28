/**
 * WithRemit Static Site Password Protection
 * 
 * Logic:
 * 1. Check localStorage for 'auth_session'.
 * 2. If present, valid, and not expired (1 hour), allow access.
 * 3. If missing or expired, show full-screen overlay with password prompt.
 * 4. Verify password using SHA-256 hash.
 */

(function () {
    // CURRENT PASSWORD HASH (SHA-256)
    // Password: "withmoney1234!"
    const TARGET_HASH = "fd38aac89c78c7461d871a0ed09111075537b0daf7858503815dc0c3eb7f4340";
    const SESSION_KEY = "wr_auth_session";
    const EXPIRY_TIME_MS = 60 * 60 * 1000; // 1 Hour

    function initAuth() {
        if (isAuthenticated()) {
            return; // Allow access
        }

        // Lock down the page
        showLoginOverlay();
    }

    function isAuthenticated() {
        try {
            const dataStr = localStorage.getItem(SESSION_KEY);
            if (!dataStr) return false;

            const data = JSON.parse(dataStr);
            const now = new Date().getTime();

            // Check if expired
            if (now > data.expiry) {
                localStorage.removeItem(SESSION_KEY);
                return false;
            }

            // Check hash
            if (data.hash === TARGET_HASH) {
                return true;
            }
        } catch (e) {
            console.error("Auth check failed", e);
            localStorage.removeItem(SESSION_KEY);
        }
        return false;
    }

    function showLoginOverlay() {
        // Create Overlay
        const overlay = document.createElement('div');
        overlay.id = 'auth-overlay';
        overlay.innerHTML = `
            <div class="auth-container">
                <div class="auth-box">
                    <h2>Restricted Access</h2>
                    <p>Please enter the password to view this content.</p>
                    <form id="auth-form">
                        <input type="password" id="auth-password" placeholder="Password" required autofocus autocomplete="current-password">
                        <button type="submit">Unlock</button>
                    </form>
                    <p id="auth-error" class="error-msg"></p>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';

        // Handle Form Submit
        const form = document.getElementById('auth-form');
        const input = document.getElementById('auth-password');
        const errorMsg = document.getElementById('auth-error');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = input.value;

            errorMsg.textContent = 'Verifying...';

            try {
                const hash = await sha256(password);
                if (hash === TARGET_HASH) {
                    // Success - Store with Expiry
                    const sessionData = {
                        hash: hash,
                        expiry: new Date().getTime() + EXPIRY_TIME_MS
                    };
                    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
                    unlockPage(overlay);
                } else {
                    // Fail
                    errorMsg.textContent = 'Incorrect password. Please try again.';
                    input.value = '';
                    input.focus();
                    // Shake animation effect
                    const box = document.querySelector('.auth-box');
                    box.classList.add('shake');
                    setTimeout(() => box.classList.remove('shake'), 400);
                }
            } catch (err) {
                console.error(err);
                errorMsg.textContent = 'An error occurred during verification.';
            }
        });
    }

    function unlockPage(overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
            document.body.style.overflow = '';
        }, 300);
    }

    // SHA-256 Helper Function
    async function sha256(message) {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // Run immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuth);
    } else {
        initAuth();
    }

})();
