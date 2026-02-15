document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.banner-indicator');
    const playPauseBtn = document.getElementById('bannerPlayPause');

    if (!playPauseBtn) return; // 배너가 없는 경우 종료

    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');

    let currentSlide = 0;
    let isPlaying = true;
    let slideInterval;

    // 슬라이드 변경 함수
    function goToSlide(index) {
        // 모든 슬라이드와 인디케이터 비활성화
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // 현재 슬라이드와 인디케이터 활성화
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    // 다음 슬라이드로 이동
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // 자동 슬라이드 시작
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
        isPlaying = true;
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    }

    // 자동 슬라이드 정지
    function stopAutoSlide() {
        clearInterval(slideInterval);
        isPlaying = false;
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }

    // 재생/정지 버튼 클릭
    playPauseBtn.addEventListener('click', function () {
        if (isPlaying) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // 인디케이터 클릭
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            goToSlide(index);
            // 인디케이터 클릭 시 자동 슬라이드 재시작
            if (isPlaying) {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }
        });
    });

    // 초기 자동 슬라이드 시작
    startAutoSlide();
});