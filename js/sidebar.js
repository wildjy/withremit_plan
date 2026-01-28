// 사이드바 토글 로직 초기화 함수
function initSidebar() {
    const sidebar = document.getElementById('dbSidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const closeBtn = document.getElementById('sidebarClose');
    const overlay = document.getElementById('dbOverlay');

    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener('click', () => {
            if (window.innerWidth > 1024) {
                document.body.classList.toggle('db-collapsed');
            } else {
                const isOpen = sidebar.classList.toggle('mobile-open');
                if (isOpen) {
                    overlay.style.display = 'block';
                    setTimeout(() => overlay.classList.add('active'), 10);
                    document.body.style.overflow = 'hidden';
                } else {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                    setTimeout(() => {
                        if (!overlay.classList.contains('active')) overlay.style.display = 'none';
                    }, 300);
                }
            }
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (!overlay.classList.contains('active')) overlay.style.display = 'none';
            }, 300);
        });
    }

    // 사이드바 닫기 버튼 (480px 이하 모바일에서만 표시)
    if (closeBtn && sidebar && overlay) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (!overlay.classList.contains('active')) overlay.style.display = 'none';
            }, 300);
        });
    }

    // MY 메뉴 레이어 토글
    const myBtn = document.getElementById('myMenuBtn');
    const myLayer = document.getElementById('myMenuLayer');

    if (myBtn && myLayer) {
        myBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            myLayer.classList.toggle('active');
        });
        document.addEventListener('click', () => myLayer.classList.remove('active'));
    }
}

// initSidebar will be called by includes.js after header and sidebar are loaded
// No auto-initialization to prevent race conditions
