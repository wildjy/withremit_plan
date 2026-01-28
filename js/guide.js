document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.guide-tab');
    const contents = document.querySelectorAll('.tab-content');

    // Function to activate a specific tab
    function activateTab(tabId) {
        // Deactivate all
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Activate target
        const targetTab = document.querySelector(`.guide-tab[data-tab="${tabId}"]`);
        const targetContent = document.getElementById(`tab-${tabId}`);

        if (targetTab && targetContent) {
            targetTab.classList.add('active');
            targetContent.classList.add('active');
        }
    }

    // Initialize from Hash
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        activateTab(hash);
    } else {
        // If no hash, ensure the default active tab is set (usually the first one in HTML)
        // However, HTML already has 'active' class on the first tab, so we might not need to do anything
        // unless we want to enforce it.
    }

    // Click Event
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            activateTab(target);

            // Update URL hash without jumping
            history.replaceState(null, null, `#${target}`);
        });
    });
});
