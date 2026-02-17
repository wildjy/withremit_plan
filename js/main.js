// Sample remittance data (10 items) - Receive History
const remittanceData = [
    {
        receiptNum: '123456',
        date: '2026.01.12',
        sendAmount: '¥111,200',
        depositAmount: '¥111,200',
        receiveAmount: '₩1,000,000',
        receiveCurrency: '₩1,000,000',
        flag: 'images/jp.png',
        name: 'Kim Minho',
        bank: '신한은행',
        receiveDate: '2026.01.12',
        status: 'cancel',
        statusText: '거래 취소',
        country: '일본'
    },
    {
        receiptNum: '123457',
        date: '2026.01.11',
        sendAmount: '¥5,400',
        depositAmount: '¥5,400',
        receiveAmount: '₩1,000,000',
        receiveCurrency: '₩1,000,000',
        flag: 'images/cn.png',
        name: 'Lee Jisoo',
        bank: '우리은행',
        receiveDate: '2026.01.11',
        status: 'approved',
        statusText: '접수 완료',
        country: '중국'
    },
    {
        receiptNum: '123458',
        date: '2026.01.10',
        sendAmount: 'A$1,089',
        depositAmount: 'A$1,089',
        receiveAmount: '₩1,000,000',
        receiveCurrency: '₩1,000,000',
        flag: 'images/au.png',
        name: 'Park Jiwon',
        bank: 'KB국민은행',
        receiveDate: '2026.01.10',
        status: 'success',
        statusText: '거래 성공',
        country: '호주'
    },
    {
        receiptNum: '123459',
        date: '2026.01.09',
        sendAmount: '₱21,000',
        depositAmount: '₱21,000',
        receiveAmount: '₩500,000',
        receiveCurrency: '₩500,000',
        flag: 'images/ph.png',
        name: 'Choi Seohyun',
        bank: '하나은행',
        receiveDate: '2026.01.09',
        status: 'complete',
        statusText: '입금 완료',
        country: '필리핀'
    },
    {
        receiptNum: '123460',
        date: '2026.01.08',
        sendAmount: '₫13,900,000',
        depositAmount: '₫13,900,000',
        receiveAmount: '₩800,000',
        receiveCurrency: '₩800,000',
        flag: 'images/vn.png',
        name: 'Jung Hana',
        bank: 'IBK기업은행',
        receiveDate: '2026.01.08',
        status: 'success',
        statusText: '거래 성공',
        country: '베트남'
    },
    {
        receiptNum: '123461',
        date: '2026.01.07',
        sendAmount: '৳57,600',
        depositAmount: '৳57,600',
        receiveAmount: '₩650,000',
        receiveCurrency: '₩650,000',
        flag: 'images/bd.png',
        name: 'Kang Subin',
        bank: 'NH농협은행',
        receiveDate: '2026.01.07',
        status: 'approved',
        statusText: '접수 완료',
        country: '방글라데시'
    },
    {
        receiptNum: '123462',
        date: '2026.01.06',
        sendAmount: 'HK$6,900',
        depositAmount: 'HK$6,900',
        receiveAmount: '₩1,200,000',
        receiveCurrency: '₩1,200,000',
        flag: 'images/hk.png',
        name: 'Song Minji',
        bank: '카카오뱅크',
        receiveDate: '2026.01.06',
        status: 'success',
        statusText: '거래 성공',
        country: '홍콩'
    },
    {
        receiptNum: '123463',
        date: '2026.01.05',
        sendAmount: '₨44,000',
        depositAmount: '₨44,000',
        receiveAmount: '₩450,000',
        receiveCurrency: '₩450,000',
        flag: 'images/np.png',
        name: 'Yoon Jihoon',
        bank: '토스뱅크',
        receiveDate: '2026.01.05',
        status: 'pending',
        statusText: '거래 보류',
        country: '네팔'
    },
    {
        receiptNum: '123464',
        date: '2026.01.04',
        sendAmount: '₮1,880,000',
        depositAmount: '₮1,880,000',
        receiveAmount: '₩750,000',
        receiveCurrency: '₩750,000',
        flag: 'images/mn.png',
        name: 'Han Yoona',
        bank: 'SC제일은행',
        receiveDate: '2026.01.04',
        status: 'success',
        statusText: '거래 성공',
        country: '몽골'
    },
    {
        receiptNum: '123465',
        date: '2026.01.03',
        sendAmount: '₨123,000',
        depositAmount: '₨123,000',
        receiveAmount: '₩550,000',
        receiveCurrency: '₩550,000',
        flag: 'images/lk.png',
        name: 'Seo Hyunwoo',
        bank: '케이뱅크',
        receiveDate: '2026.01.03',
        status: 'complete',
        statusText: '입금 완료',
        country: '스리랑카'
    }
];

// ===== DOM Elements =====
const sendAmountInput = document.getElementById('sendAmount');
const receiveCurrencySelect = document.getElementById('receiveCurrency');
const receiveAmountEl = document.getElementById('receiveAmount');
const exchangeRateEl = document.getElementById('exchangeRate');
const savingsEl = document.getElementById('savings');
const countryCards = document.querySelectorAll('.country-card');

// Custom Dropdown Elements
const currencyDropdown = document.getElementById('currencyDropdown');
const currencyBtn = document.getElementById('currencyBtn');
const currencyOptions = document.getElementById('currencyOptions');
const currencyFlag = document.getElementById('receiveCurrencyFlag');
const currencyCode = document.getElementById('receiveCurrencyCode');

// common Tabs
const tabs = document.querySelectorAll('.guide-tab');
const contents = document.querySelectorAll('.tab-content');

// Function to activate a specific tab
if(tabs.length > 0 && contents.length > 0) {
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
}

// ===== Calculator Functions =====
function formatNumber(num, decimals = 0) {
    return new Intl.NumberFormat('ko-KR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

function calculateTransfer() {
    const sendAmount = parseFloat(sendAmountInput?.value.replace(/,/g, '')) || 0;
    const selectedCurrency = receiveCurrencySelect?.value || 'JPY';
    const rateInfo = exchangeRates[selectedCurrency];

    if (!rateInfo || sendAmount <= 0) {
        if (receiveAmountEl) receiveAmountEl.textContent = `${rateInfo ? rateInfo.symbol : '¥'} 0`;
        return;
    }

    // Calculate receive amount
    const receiveAmount = sendAmount / rateInfo.rate;

    // Calculate bank comparison
    const bankReceiveAmount = receiveAmount * (1 - bankFeePercent / 100);
    const savings = receiveAmount - bankReceiveAmount;

    // Update display
    if (receiveAmountEl) {
        receiveAmountEl.textContent = `${rateInfo.symbol} ${formatNumber(receiveAmount)}`;
    }
    if (exchangeRateEl) {
        exchangeRateEl.textContent = `1 KRW = ${rateInfo.rate.toFixed(6)} ${selectedCurrency}`;
    }
    if (savingsEl) {
        const compareText = t('calc.compare')
            .replace('{amount}', formatNumber(savings))
            .replace('{currency}', selectedCurrency);
        savingsEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span>${compareText}</span>`;
    }

    // Update 상대방이 받는 금액
    const receiveAmountDisplay = document.getElementById('receiveAmountDisplay');
    if (receiveAmountDisplay) {
        receiveAmountDisplay.textContent = `${rateInfo.symbol} ${formatNumber(receiveAmount)}`;
    }
}

function handleAmountInput(e) {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
        value = formatNumber(parseInt(value));
    }
    e.target.value = value;
    calculateTransfer();
}

function handleCurrencyChange(currency, flagUrl) {
    selectedCurrency = currency;

    const receiveCurrencyFlag = document.getElementById('receiveCurrencyFlag');
    const receiveCurrencyCode = document.getElementById('receiveCurrencyCode');
    const receiveCurrencySymbol = document.getElementById('receiveCurrencySymbol');
    const receiveCurrencyInput = document.getElementById('receiveCurrency');

    if (receiveCurrencyFlag && flagUrl) receiveCurrencyFlag.src = flagUrl;
    if (receiveCurrencyCode) receiveCurrencyCode.textContent = currency;
    if (receiveCurrencySymbol) {
        receiveCurrencySymbol.textContent = currencySymbols[currency] || '¥';
    }
    if (receiveCurrencyInput) receiveCurrencyInput.value = currency;

    // 계산 실행
    const sendInput = document.getElementById('sendAmount');
    if (sendInput) handleSendAmountInput({ target: sendInput });

    updateRateDisplay();
}

// Toggle dropdown
function toggleCurrencyDropdown() {
    if (currencyDropdown) {
        currencyDropdown.classList.toggle('open');
    }
}

// Close dropdown when clicking outside
function closeCurrencyDropdown(e) {
    if (currencyDropdown && !currencyDropdown.contains(e.target)) {
        currencyDropdown.classList.remove('open');
    }
}

// ===== Country Card Click Handler =====
function handleCountryClick(e) {
    const card = e.currentTarget;
    const currency = card.dataset.currency;

    if (currency && exchangeRates[currency]) {
        const flagImg = exchangeRates[currency].flagImg;
        const flagUrl = `images/${flagImg}.png`;
        handleCurrencyChange(currency, flagUrl);
        document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Header Scroll Effect =====
function handleScroll() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

// ===== Mobile Menu Toggle =====
// ===== Mobile Menu Toggle (Guest) =====
function toggleSidebar({
  sidebar,
  overlay,
  desktopBodyClass,
  mobileSidebarClass = 'active',
  breakpoint = 1024,
}) {
  // Desktop
  if (window.innerWidth > breakpoint && desktopBodyClass) {
    document.body.classList.toggle(desktopBodyClass);
    return;
  }

  // Mobile / Tablet
  const isOpen = sidebar.classList.toggle(mobileSidebarClass);
  overlay.classList.toggle('active', isOpen);

  document.body.style.overflow = isOpen ? 'hidden' : '';

  // overlay display 처리 (transition 대응)
  if (isOpen) {
    overlay.style.display = 'block';
    requestAnimationFrame(() => {
        sidebar.classList.add('active')
        overlay.classList.add('active')
    });
  } else {
    overlay.classList.remove('active');
    setTimeout(() => {
      if (!overlay.classList.contains('active')) {
        overlay.style.display = 'none';
      }
    }, 300);
  }
}

// function initGuestSidebar() {
//   const sidebar = document.getElementById('guestSidebar');
//   const overlay = document.getElementById('guestSidebarOverlay');
//   const toggleBtn = document.getElementById('sidebarToggle');
//   const closeBtn = document.getElementById('sidebarClose');
// //   const closeBtn = document.getElementById('guestSidebarClose');

//   if (!sidebar || !overlay || !toggleBtn) return;

//   toggleBtn.addEventListener('click', () =>
//     toggleSidebar({
//       sidebar,
//       overlay,
//       desktopBodyClass: document.body.classList.contains('db-body')
//         ? 'db-collapsed'
//         : null,
//     })
//   );

//   [overlay, closeBtn].forEach((el) => {
//     if (!el) return;
//     el.addEventListener('click', () => {
//       sidebar.classList.remove('active');
//       overlay.classList.remove('active');
//       document.body.style.overflow = '';
//       overlay.style.display = 'none';
//     });
//   });
// }

function initSidebar() {
    const sidebar = document.getElementById('dbSidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const closeBtn = document.getElementById('sidebarClose');

    if (sidebar && !document.getElementById('dbOverlay')) {
        document.body.insertAdjacentHTML(
            'beforeend',
            `<div id="dbOverlay"></div>`
        );
    }

    const overlay = document.getElementById('dbOverlay');

    if (!sidebar || !overlay || !toggleBtn) return;

    toggleBtn.addEventListener('click', () =>
        toggleSidebar({
            sidebar,
            overlay,
            desktopBodyClass: document.body.classList.contains('db-body')
            ? 'db-collapsed'
            : null,
            mobileSidebarClass: 'mobile-open',
        })
    );

    [overlay, closeBtn].forEach((el) => {
        if (!el) return;
        el.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            overlay.style.display = 'none';
        });
    });
}

function initMyMenu() {
  const myBtn = document.getElementById('myMenuBtn');
  const myLayer = document.getElementById('myMenuLayer');

  if (!myBtn || !myLayer) return;

  myBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    myLayer.classList.toggle('active');
  });

  document.addEventListener('click', () =>
    myLayer.classList.remove('active')
  );
}

document.addEventListener('DOMContentLoaded', () => {
//   initGuestSidebar();
  initSidebar();
  initMyMenu();
});

// ===== Intersection Observer for Animations =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .country-card, .trust-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Calculator event listeners
    const sendAmountInput = document.getElementById('sendAmount');
    const receiveAmountInput = document.getElementById('receiveAmount');

    if (sendAmountInput) {
        sendAmountInput.addEventListener('input', handleSendAmountInput);
        sendAmountInput.value = '1,000,000';
        // 초기 계산 실행
        setTimeout(() => {
            handleSendAmountInput({ target: sendAmountInput });
        }, 100);
    }

    if (receiveAmountInput) {
        receiveAmountInput.addEventListener('input', handleReceiveAmountInput);
    }

    // Custom currency dropdown
    if (currencyBtn) {
        currencyBtn.addEventListener('click', toggleCurrencyDropdown);
    }

    // Currency options click
    document.querySelectorAll('.calc-currency-option').forEach(option => {
        option.addEventListener('click', () => {
            const currency = option.dataset.value;
            const flagUrl = option.querySelector('img').src; // 이미지 경로 추출
            handleCurrencyChange(currency, flagUrl); // 두 값을 모두 보냄
            document.getElementById('currencyDropdown').classList.remove('open');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', closeCurrencyDropdown);

    // Country cards click
    countryCards.forEach(card => {
        card.addEventListener('click', handleCountryClick);
    });

    // Header scroll
    window.addEventListener('scroll', handleScroll);


    // Initialize
    initAnimations();

    // Set initial selected state
    document.querySelector('.calc-currency-option[data-value="JPY"]')?.classList.add('selected');
});

// ===== Smooth Scroll =====
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//         const target = document.querySelector(this.getAttribute('href'));
//         if (target) {
//             target.scrollIntoView({ behavior: 'smooth' });
//         }
//         // Close mobile menu if open
//         document.querySelector('.mobile-nav')?.classList.remove('active');
//     });
// });

let keypadMode = 'abc';
let isShift = false;
let activeInputId = null;
let passwordValues = {}; // Store real values: { 'inputID': 'actualValue' }
let maskingTimers = {}; // Store timers for masking delay

const keyboardLayouts = {
    num: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Del'],
    abc: [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm']],
    spec: [['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'], ['.', '?', '!', "'", ',', '_', '\\', '|', '~', '<'], ['>', '`', '[', ']', '{', '}', '#', '%', '^', '*']]
};

// function toggleKeypad moved to end of file
// function handleKeyInput kept here as it is helper logic
// But wait, the previous tool call ADDED the new toggleKeypad at the END.
// So now I have TWO toggleKeypad functions.
// I should remove the first one (lines 966-1010) AND likely correct the handleKeyInput since I claimed I would update it but I didn't in the previous block.
// Actually handleKeyInput was fine, except I verified logic is correct.
// So I just need to remove the first toggleKeypad.

function handleDelete() {
    if (!activeInputId) return;
    const input = document.getElementById(activeInputId);
    if (!input) return; // Should allow backspace even if empty?

    if (passwordValues[activeInputId].length > 0) {
        passwordValues[activeInputId] = passwordValues[activeInputId].slice(0, -1);
        updateInputDisplay(activeInputId, true); // Immediate mask update
    }
}

function updateInputDisplay(id, maskAll) {
    const val = passwordValues[id];
    if (maskAll) {
        document.getElementById(id).value = '*'.repeat(val.length);
    } else {
        if (val.length > 0) {
            // Mask all except last char
            const masked = '*'.repeat(val.length - 1) + val.slice(-1);
            document.getElementById(id).value = masked;
        } else {
            document.getElementById(id).value = '';
        }
    }
}

function renderKeypad() {
    const container = document.getElementById('keypadContainer');
    container.innerHTML = '';

    // Container Styles
    // MUST include 'keypad-grid' because auth.css uses .keypad-grid .key-btn selectors!
    container.className = 'keypad-grid keypad-container';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.padding = '8px';
    container.style.background = '#eef1f5';
    container.style.gap = '6px';

    const createBtn = (key, isFunc = false, className = "") => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `key-btn ${isFunc ? 'func-key' : ''} ${className}`;
        btn.style.flex = '1';
        btn.style.margin = '2px';
        btn.style.height = '42px';
        btn.style.borderRadius = '5px';
        btn.style.border = '1px solid #d1d5db';
        // btn.style.background = '#fff'; // MOVED TO CSS to enable hover
        btn.style.fontSize = '16px';
        btn.style.fontWeight = '600';
        btn.style.color = '#333';
        btn.style.cursor = 'pointer';

        // Touch highlight disable
        btn.style.webkitTapHighlightColor = 'transparent';

        if (key === 'Shift') {
            btn.textContent = 'Shift';
            btn.classList.toggle('active', isShift);
            if (isShift) {
                btn.className += ' btn-active'; // Use class for active state
                // btn.style.background = '#dbeafe'; // Handled by CSS .btn-active
                // btn.style.color = '#1e40af';
            } else {
                btn.className += ' btn-func'; // Use class for func
                // btn.style.background = '#e5e7eb';
            }
            btn.style.flex = '1.5';
            btn.onclick = toggleShift;
        } else if (key === 'Del') {
            // Backspace Icon (Arrow Left)
            btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m7-7l-7 7 7 7" /></svg>';
            btn.className += ' btn-func';
            btn.style.flex = '1';
            // btn.style.background = '#e5e7eb';
            btn.onclick = handleDelete;
        } else if (key === '!#1' || key === 'abc') {
            btn.textContent = key;
            btn.className += ' btn-func';
            btn.style.flex = '1.2';
            // btn.style.background = '#e5e7eb';
            btn.onclick = () => switchMode(key === '!#1' ? 'spec' : 'abc');
        } else if (key === 'Space') {
            btn.textContent = 'Space';
            btn.style.flex = '4';
            btn.onclick = () => handleKeyInput(' ');
        } else if (key === '확인') {
            btn.textContent = '확인';
            // Explicitly set class string vs appending to ensure precedence order isn't weird,
            // though with CSS selectors it shouldn't matter.
            // Using `btn.classList.add` is cleaner.
            btn.classList.add('btn-confirm');
            btn.style.flex = '1.2';
            btn.onclick = () => toggleKeypad(null);
        } else {
            let char = (keypadMode === 'abc' && isShift) ? key.toUpperCase() : key;
            btn.textContent = char;
            btn.onclick = () => handleKeyInput(char);
        }
        return btn;
    };

    // 1. Top Row: Numbers + Backspace (Always present in password mode)
    const numRowDiv = document.createElement('div');
    numRowDiv.style.display = 'flex';
    numRowDiv.style.width = '100%';
    numRowDiv.style.justifyContent = 'center';

    // Numbers 1-0
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    numbers.forEach(num => numRowDiv.appendChild(createBtn(num)));
    // Backspace
    numRowDiv.appendChild(createBtn('Del', true));
    container.appendChild(numRowDiv);

    // 2. Middle Rows: Letters or Special Chars
    const layout = keyboardLayouts[keypadMode] || keyboardLayouts['abc'];

    if (Array.isArray(layout[0])) {
        layout.forEach(rowKeys => {
            const rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            rowDiv.style.width = '100%';
            rowDiv.style.justifyContent = 'center';

            rowKeys.forEach(key => {
                rowDiv.appendChild(createBtn(key));
            });
            container.appendChild(rowDiv);
        });
    }

    // 3. Bottom Row: [!#1/abc] [Space] [확인]
    const bottomRow = document.createElement('div');
    bottomRow.style.display = 'flex';
    bottomRow.style.width = '100%';
    bottomRow.style.justifyContent = 'center';

    // Mode Switch Button
    const modeLabel = keypadMode === 'abc' ? '!#1' : 'abc';
    bottomRow.appendChild(createBtn(modeLabel, true));

    // Space
    bottomRow.appendChild(createBtn('Space'));

    // Check
    bottomRow.appendChild(createBtn('확인', false)); // Pass false to avoid func-key grey style conflict

    container.appendChild(bottomRow);
}

const loginForm = document.querySelector('.login-form');
if (loginForm) { // 로그인 폼이 존재하는 페이지(login.html)에서만 실행
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const fields = [
            { id: 'userId', box: 'userIdBox', err: 'userIdError', msg: '아이디를 입력하세요.' },
            { id: 'userPassword', box: 'userPasswordBox', err: 'userPasswordError', msg: '비밀번호를 입력하세요.' }
        ];

        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const errorEl = document.getElementById(field.err);
            const boxEl = document.getElementById(field.box);

            if (!input.value.trim()) {
                if (errorEl) {
                    errorEl.textContent = field.msg;
                    errorEl.style.display = 'block';
                }
                if (boxEl) boxEl.classList.add('error');
                isValid = false;
            } else {
                if (errorEl) errorEl.style.display = 'none';
                if (boxEl) boxEl.classList.remove('error');
            }
        });

        if (isValid) {
            this.submit(); // 모든 검증 통과 시 실제 제출
        }
    });
}

// ===== Global Modal Functions =====
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.id);
    }
});

// ===== open post Modal Functions =====
function openPostcodeModal() {
    openModal('postcodeModal');
    document.getElementById('postcodeSearchInput').value = '';
}

function searchPostcode() {
    const query = document.getElementById('postcodeSearchInput').value;
    if (!query) {
        alert('검색어를 입력해주세요.');
        return;
    }
    document.getElementById('postcodeResultList').style.display = 'block';
}

function selectAddress(postcode, address) {
    document.getElementById('postcodeInput').value = postcode;
    document.getElementById('addressBasicInput').value = address;
    closeModal('postcodeModal');
}

// ===== Security Keypad Helper Functions =====
function switchMode(mode) {
    keypadMode = (keypadMode === 'abc' && mode === 'spec') ? 'spec' : 'abc';
    renderKeypad();
}

function toggleShift() {
    isShift = !isShift;
    renderKeypad();
}

function handleKeyInput(char) {
    if (!activeInputId) return;
    const input = document.getElementById(activeInputId);
    if (!input) return;

    // Clear existing timer if user types fast
    if (maskingTimers[activeInputId]) {
        clearTimeout(maskingTimers[activeInputId]);
        // Force full mask of previous state
        updateInputDisplay(activeInputId, true);
    }

    // Update real value
    passwordValues[activeInputId] += char;

    // Update display: all stars + char
    updateInputDisplay(activeInputId, false);

    // Set timer to mask this char
    maskingTimers[activeInputId] = setTimeout(() => {
        updateInputDisplay(activeInputId, true);
        maskingTimers[activeInputId] = null;
    }, 500);
}

// ===== Security Keypad Functions =====
function toggleKeypad(targetId) {
    const keypad = document.getElementById('securityKeypad');
    if (!keypad) return;

    // Close logic
    if (!targetId) {
        keypad.classList.remove('active');
        // Force full mask on close for security
        if (activeInputId) {
            updateInputDisplay(activeInputId, true);
            // Revert type to password on close
            const input = document.getElementById(activeInputId);
            if (input) input.type = 'password';
        }
        activeInputId = null;
        return;
    }

    activeInputId = targetId;
    const targetInput = document.getElementById(targetId);
    if (!targetInput) return;

    // Change type to text to allow manual masking (showing last char)
    targetInput.type = 'text';

    // Initialize storage for this input if needed
    if (!passwordValues[targetId]) {
        passwordValues[targetId] = '';
    }

    // Calculate Position
    const rect = targetInput.getBoundingClientRect();
    const keypadWidth = 320;

    keypad.style.position = 'fixed';
    keypad.style.top = `${rect.bottom + 8}px`; // 8px gap
    const centerPos = rect.left + (rect.width / 2);

    keypad.style.left = `${centerPos}px`;
    keypad.style.width = `${keypadWidth}px`;
    keypad.style.transform = 'translateX(-50%)';

    keypad.classList.add('active');
    renderKeypad();
}

// ===== Agree Terms Checkboxes : AC_02_02, CM_04_11, CM_04_21 =====
const agreeAll = document.getElementById('agreeAll');
const items = document.querySelectorAll('.agree-item');
const nextBtn = document.getElementById('nextBtn');

if(agreeAll && items ) {
    function checkAllRequired() {
        const allChecked = Array.from(items).every(item => item.checked);
        if (allChecked) {
            nextBtn.disabled = false;
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        } else {
            nextBtn.disabled = true;
            nextBtn.style.pointerEvents = 'none';
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        }
    }

    agreeAll.addEventListener('change', () => {
        items.forEach(item => item.checked = agreeAll.checked);
        checkAllRequired();
    });

    items.forEach(item => {
        item.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('.agree-item:checked').length;
            agreeAll.checked = (checkedCount === items.length);
            checkAllRequired();
        });
    });
}


// ===== Remove Table Row : AC_01_01, AC_02_01 =====
let currentDeleteButton = null;

function removeRow(button) {
    currentDeleteButton = button;
    document.getElementById('deleteConfirmModal').classList.add('active');
}

function confirmDelete() {
    if (currentDeleteButton) {
        currentDeleteButton.closest('tr').remove();
        // Re-number rows
        const tbody = document.getElementById('accountTableBody');
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.querySelector('td:first-child').textContent = rows.length - index;
        });
        currentDeleteButton = null;
        updateTotalCount();
    }
    closeDeleteModal();
}

function closeDeleteModal() {
    document.getElementById('deleteConfirmModal').classList.remove('active');
    currentDeleteButton = null;
}

// ===== ValidationModal : AC_01_01, AC_02_02 =====
function closeValidationModal() {
    document.getElementById('validationModal').classList.remove('active');
}

function updateTotalCount() {
    const tbody = document.getElementById('accountTableBody');
    const count = tbody ? tbody.querySelectorAll('tr').length : 0;
    const countElement = document.getElementById('totalCount');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Initialize count on load
document.addEventListener('DOMContentLoaded', updateTotalCount);