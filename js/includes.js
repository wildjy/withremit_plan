// Load HTML includes
function loadIncludes() {
    let headerLoaded = false;
    let sidebarLoaded = false;

    // Function to initialize sidebar when both header and sidebar are loaded
    function tryInitSidebar() {
        if (headerLoaded && (sidebarLoaded || !document.getElementById('sidebarContainer'))) {
            if (typeof initSidebar === 'function') {
                initSidebar();
            }
        }
    }

    // Check for guest mode
    const urlParams = new URLSearchParams(window.location.search);
    const isGuest = urlParams.get('guest') === 'true';

    // Load header
    const headerContainer = document.getElementById('headerContainer');
    if (headerContainer) {
        const headerFile = isGuest ? 'includes/header_guest.html' : 'includes/header.html';
        fetch(headerFile)
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;
                headerLoaded = true;

                // Initialize mobile menu toggle
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileMenuBtn) {
                    // Check if toggleMobileMenu is defined globally (from main.js)
                    if (typeof toggleMobileMenu === 'function') {
                        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
                    } else {
                        console.error('toggleMobileMenu function not found');
                    }
                }

                tryInitSidebar();
            })
            .catch(error => console.error('Error loading header:', error));
    } else {
        headerLoaded = true;
    }

    // Load sidebar
    const sidebarContainer = document.getElementById('sidebarContainer');
    if (sidebarContainer) {
        const sidebarFile = isGuest ? 'includes/sidebar_guest.html' : 'includes/sidebar.html';
        fetch(sidebarFile)
            .then(response => response.text())
            .then(data => {
                sidebarContainer.innerHTML = data;
                // Mark active navigation
                // Mark active navigation
                const currentPage = window.location.pathname.split('/').pop();

                // 공지사항 (Notice)
                if (currentPage === 'CS_01_01.html' || currentPage === 'CS_01_02.html') {
                    const navNotice = document.getElementById('navNotice');
                    if (navNotice) {
                        navNotice.classList.add('active');
                    }
                }

                // 자주 묻는 질문 (FAQ)
                if (currentPage === 'CS_02_01.html') {
                    const navFaq = document.getElementById('navFaq');
                    if (navFaq) {
                        navFaq.classList.add('active');
                    }
                }

                // 홈 (Home)
                if (currentPage === 'DB_01_01.html') {
                    const navHome = document.getElementById('navHome');
                    if (navHome) {
                        navHome.classList.add('active');
                    }
                }

                // 해외 송금 신청 (Remittance)
                if (currentPage === 'RM_01_01.html') {
                    const navRemittance = document.getElementById('navRemittance');
                    if (navRemittance) {
                        navRemittance.classList.add('active');
                    }
                }

                // 정기 해외 송금 (Recurring Remittance)
                if (['RM_02_01.html', 'RM_02_02.html', 'RM_02_03.html'].includes(currentPage)) {
                    const navRecurringRemittance = document.getElementById('navRecurringRemittance');
                    if (navRecurringRemittance) {
                        navRecurringRemittance.classList.add('active');
                    }
                }

                // 송금 내역 (History)
                if (currentPage === 'HI_01_01.html') {
                    const navRemittanceList = document.getElementById('navRemittanceList');
                    if (navRemittanceList) {
                        navRemittanceList.classList.add('active');
                    }
                }

                // 거래 내역 (Transaction History)
                if (currentPage === 'HI_02_01.html') {
                    const navTransactionHistory = document.getElementById('navTransactionHistory');
                    if (navTransactionHistory) {
                        navTransactionHistory.classList.add('active');
                    }
                }

                // 수취 내역 (Receive History)
                if (currentPage === 'HI_03_01.html') {
                    const navReceiveHistory = document.getElementById('navReceiveHistory');
                    if (navReceiveHistory) {
                        navReceiveHistory.classList.add('active');
                    }
                }

                // 개인 계좌 (Personal Account)
                if (currentPage === 'AC_01_01.html') {
                    const navPersonalAccount = document.getElementById('navPersonalAccount');
                    if (navPersonalAccount) {
                        navPersonalAccount.classList.add('active');
                    }
                }

                // 출금 계좌 (Withdrawal Account)
                if (['AC_02_01.html', 'AC_02_02.html', 'AC_02_03.html', 'AC_02_04.html'].includes(currentPage)) {
                    const navWithdrawalAccount = document.getElementById('navWithdrawalAccount');
                    if (navWithdrawalAccount) {
                        navWithdrawalAccount.classList.add('active');
                    }
                }

                // 자주 쓰는 계좌 (Favorite Account)
                if (['AC_03_01.html', 'AC_03_02.html'].includes(currentPage)) {
                    const navFavorite = document.getElementById('navFavorite');
                    if (navFavorite) {
                        navFavorite.classList.add('active');
                    }
                }

                // 송금 서비스 안내 (Service Guide)
                if (currentPage === 'GU_01_01.html') {
                    const navServiceGuide = document.getElementById('navServiceGuide');
                    if (navServiceGuide) {
                        navServiceGuide.classList.add('active');
                    }
                }

                // 가입 안내 (Sign Up Guide)
                if (currentPage === 'GU_02_01.html') {
                    const navSignupGuide = document.getElementById('navSignupGuide');
                    if (navSignupGuide) {
                        navSignupGuide.classList.add('active');
                    }
                }

                // 1:1 문의 (1:1 Inquiry)
                if (['CS_03_01.html', 'CS_03_02.html', 'CS_03_03.html'].includes(currentPage)) {
                    const navInquiry = document.getElementById('navInquiry');
                    if (navInquiry) {
                        navInquiry.classList.add('active');
                    }
                }
                sidebarLoaded = true;

                // Init Guest Sidebar Close Event
                const closeBtn = document.getElementById('guestSidebarClose');
                const overlay = document.getElementById('guestSidebarOverlay');
                const sidebar = document.getElementById('guestSidebar');

                if (closeBtn && sidebar) {
                    closeBtn.addEventListener('click', () => {
                        sidebar.classList.remove('active');
                        if (overlay) overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                }

                if (overlay && sidebar) {
                    overlay.addEventListener('click', () => {
                        sidebar.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                }

                tryInitSidebar();
            })
            .catch(error => console.error('Error loading sidebar:', error));
    } else {
        sidebarLoaded = true;
    }

    // Load contact
    const contactContainer = document.getElementById('contactContainer');
    if (contactContainer) {
        fetch('includes/contact.html')
            .then(response => response.text())
            .then(data => {
                contactContainer.innerHTML = data;
            })
            .catch(error => console.error('Error loading contact:', error));
    }

    // Load footer
    const footerContainer = document.getElementById('footerContainer');
    if (footerContainer) {
        fetch('includes/footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
}

// Load includes when DOM is ready
document.addEventListener('DOMContentLoaded', loadIncludes);

/**
 * 푸터의 회사소개 클릭 시 게스트 모드면 사이드바를 열고, 아니면 페이지이동
 */
function handleFooterAboutClick(e) {
    const urlParams = new URLSearchParams(window.location.search);
    const isGuest = urlParams.get('guest') === 'true' || !document.getElementById('dbSidebar');

    if (isGuest) {
        e.preventDefault();
        // guest 모드에서도 회사소개 페이지로 이동하되, guest 파라미터 유지
        window.location.href = 'UT_02_01.html?guest=true';
    }
}

/**
 * 푸터의 링크 클릭 시 게스트 모드면 파라미터 유지 (공용)
 */
function handleGuestLinkClick(e) {
    const urlParams = new URLSearchParams(window.location.search);
    const isGuest = urlParams.get('guest') === 'true'
        || !!document.getElementById('guestSidebar')
        || !document.getElementById('dbSidebar');

    if (isGuest) {
        e.preventDefault();
        const targetUrl = e.currentTarget.getAttribute('href');
        if (targetUrl) {
            // 이미 query string이 있는지 확인
            const separator = targetUrl.includes('?') ? '&' : '?';
            window.location.href = targetUrl + separator + 'guest=true';
        }
    }
}
