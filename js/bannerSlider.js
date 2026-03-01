document.addEventListener('DOMContentLoaded', function () {
    const bannerSlider = document.querySelector('.banner-slider.swiper');
    const playPauseBtn = document.getElementById('bannerPlayPause');

    if (!bannerSlider || typeof Swiper === 'undefined') return;

    const playIcon = playPauseBtn?.querySelector('.play-icon');
    const pauseIcon = playPauseBtn?.querySelector('.pause-icon');
    const paginationEl = bannerSlider.querySelector('.banner-indicators');

    const swiper = new Swiper(bannerSlider, {
        effect: 'fade',
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: paginationEl
            ? {
                  el: paginationEl,
                  clickable: true,
                  bulletClass: 'banner-indicator',
                  bulletActiveClass: 'active',
                  renderBullet: function (index, className) {
                      return `<button class="${className}" aria-label="배너 ${index + 1}"></button>`;
                  },
              }
            : undefined,
    });

    let isPlaying = true;

    function updatePlayState(playing) {
        isPlaying = playing;
        if (playIcon && pauseIcon) {
            playIcon.classList.toggle('hidden', playing);
            pauseIcon.classList.toggle('hidden', !playing);
        }
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function () {
            if (isPlaying) {
                swiper.autoplay.stop();
                updatePlayState(false);
            } else {
                swiper.autoplay.start();
                updatePlayState(true);
            }
        });
    }

    updatePlayState(true);
});