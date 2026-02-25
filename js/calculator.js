// ===== Calculator Data =====
const exchangeRates = {
    JP: { rate: 0.1112, name: '일본', currency: '엔', symbol: '¥', flagImg: 'jp', withdrawalFee: 660 },
    PH: { rate: 0.0421, name: '필리핀', currency: '페소', symbol: '₱', flagImg: 'ph', withdrawalFee: 40129 },
    CN: { rate: 0.0054, name: '중국', currency: '위안', symbol: '¥', flagImg: 'cn', withdrawalFee: 40129 },
    NP: { rate: 0.1004, name: '네팔', currency: '루피', symbol: 'रू', flagImg: 'np', withdrawalFee: 97607 },
    AU: { rate: 0.0011, name: '호주', currency: '달러', symbol: 'A$', flagImg: 'au', withdrawalFee: 0 },
    HK: { rate: 0.0059, name: '홍콩', currency: '달러', symbol: 'HK$', flagImg: 'hk', withdrawalFee: 0 },
    MN: { rate: 2.5830, name: '몽골', currency: '투그릭', symbol: '₮', flagImg: 'mn', withdrawalFee: 0 },
    VN: { rate: 18.5200, name: '베트남', currency: '동', symbol: '₫', flagImg: 'vn', withdrawalFee: 0 },
    LK: { rate: 0.2450, name: '스리랑카', currency: '루피', symbol: '௹', flagImg: 'lk', withdrawalFee: 0 },
    BD: { rate: 0.0815, name: '방글라데시', currency: '타카', symbol: '৳', flagImg: 'bd', withdrawalFee: 0 }
};

const currencySymbols = {
    JP: '¥', PH: '₱', CN: '¥', NP: 'रू', AU: 'A$', HK: 'HK$', MN: '₮', VN: '₫', LK: '௹', BD: '৳'
};

const withdrawalFees = {
    JP: 660,
    PH: 40129,
    CN: 4713,
    NP: 97607,
    AU: 0,
    HK: 0,
    MN: 0,
    VN: 0,
    LK: 0,
    BD: 0
};

function normalizeCountryCode(code) {
    if (!code) return '';
    const normalized = code.trim().toUpperCase();
    const map = {
        JPY: 'JP',
        PHP: 'PH',
        CNY: 'CN',
        NPR: 'NP',
        AUD: 'AU',
        HKD: 'HK',
        MNT: 'MN',
        VND: 'VN',
        LKR: 'LK',
        BDT: 'BD'
    };
    return map[normalized] || normalized;
}

window.normalizeCountryCode = normalizeCountryCode;

let selectedCurrency = 'JP';

// Bank comparison rates
const bankFeePercent = 3.5;

// 송금 한도 설정을 위한 상수 (기준: USD)
const KRW_PER_USD = 1350;
const MAX_USD = 5000;
const MAX_KRW_LIMIT = MAX_USD * KRW_PER_USD; // 6,750,000원
// [옵션 기능 - 최소 송금액 강제] 필요 시 아래 주석 해제 후 사용
// const MIN_NET_RECEIVE_AMOUNT = 1;
//
// function getMinimumSendAmount(currency = selectedCurrency) {
//     const rate = exchangeRates[currency]?.rate;
//     if (!rate || rate <= 0) return 0;
//
//     const withdrawalFee = withdrawalFees[currency] || 0;
//     return Math.ceil((MIN_NET_RECEIVE_AMOUNT + withdrawalFee) / rate);
// }

// 모달 열기/닫기 함수
function showLimitModal() {
    const modal = document.getElementById('limitModal');
    const msg = document.getElementById('modalMessage');
    const key = msg?.getAttribute('data-i18n');
    const template = key && translations?.[currentLang]?.[key]
        ? translations[currentLang][key]
        : null;

    if (msg && template) {
        msg.innerHTML = template.replace('{limit}', MAX_KRW_LIMIT.toLocaleString());
    }
    if (modal) {
        modal.classList.add('active');
    }
}

function closeLimitModal() {
    const modal = document.getElementById('limitModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 환율 안내 문구 업데이트 함수
function updateRateDisplay() {
    const exchangeRateEl = document.getElementById('exchangeRate');
    if (exchangeRateEl && exchangeRates[selectedCurrency]) {
        const rate = exchangeRates[selectedCurrency].rate;
        exchangeRateEl.textContent = `1 KRW = ${rate.toFixed(4)} ${selectedCurrency}`;
    }
}

function updateFees(krw, foreignAmount) {
    const transferFeeRate = selectedCurrency === 'NPR' ? 0.005 : 0.01;
    const transferFee = Math.floor(krw * transferFeeRate);
    const depositTotal = krw + transferFee;
    const withdrawalFee = withdrawalFees[selectedCurrency] || 0;
    const symbol = currencySymbols[selectedCurrency] || '¥';

    const depositAmountEl = document.getElementById('depositAmount');
    if (depositAmountEl) {
        depositAmountEl.textContent = `₩${depositTotal.toLocaleString()}`;
    }

    const transferFeeEl = document.getElementById('transferFee');
    if (transferFeeEl) {
        transferFeeEl.textContent = `₩${transferFee.toLocaleString()}`;
    }

    const withdrawalFeeEl = document.getElementById('withdrawalFee');
    if (withdrawalFeeEl) {
        withdrawalFeeEl.textContent = `${symbol}${withdrawalFee.toLocaleString()}`;
    }

    updateSavings(krw, foreignAmount);
}

function handleSendAmountInput(e) {
    let rawValue = e.target.value.replace(/[^\d]/g, '');
    if (!rawValue) {
        e.target.value = '';
        const receiveAmountEl = document.getElementById('receiveAmount');
        if (receiveAmountEl) {
            receiveAmountEl.value = '';
        }
        return;
    }

    let numValue = parseInt(rawValue, 10);
    // [옵션 기능 - 최소 송금액 강제]
    // const minSendAmount = getMinimumSendAmount(selectedCurrency);

    if (numValue > MAX_KRW_LIMIT) {
        numValue = MAX_KRW_LIMIT;
        e.target.value = numValue.toLocaleString('ko-KR');
        showLimitModal();
    } else {
        e.target.value = numValue.toLocaleString('ko-KR');
    }

    const rate = exchangeRates[selectedCurrency].rate;
    const withdrawalFee = withdrawalFees[selectedCurrency] || 0;
    const grossReceiveAmount = Math.floor(numValue * rate);
    const convertedAmount = Math.max(grossReceiveAmount - withdrawalFee, 0);

    const receiveInput = document.getElementById('receiveAmount');
    if (receiveInput) {
        receiveInput.value = convertedAmount.toLocaleString('ko-KR');
    }

    updateFees(numValue, convertedAmount);
    updateRateDisplay();
}

function handleReceiveAmountInput(e) {
    let rawValue = e.target.value.replace(/[^\d]/g, '');
    if (!rawValue) {
        e.target.value = '';
        const sendAmountEl = document.getElementById('sendAmount');
        if (sendAmountEl) {
            sendAmountEl.value = '';
        }
        return;
    }

    let numValue = parseInt(rawValue, 10);
    // [옵션 기능 - 최소 순수취금액 보정]
    // if (numValue < MIN_NET_RECEIVE_AMOUNT) {
    //     numValue = MIN_NET_RECEIVE_AMOUNT;
    // }

    const rate = exchangeRates[selectedCurrency].rate;
    const withdrawalFee = withdrawalFees[selectedCurrency] || 0;
    let krwAmount = Math.ceil((numValue + withdrawalFee) / rate);

    if (krwAmount > MAX_KRW_LIMIT) {
        krwAmount = MAX_KRW_LIMIT;
        const maxGrossReceive = Math.floor(MAX_KRW_LIMIT * rate);
        numValue = Math.max(maxGrossReceive - withdrawalFee, 0);
        e.target.value = numValue.toLocaleString('ko-KR');
        showLimitModal();
    } else {
        e.target.value = numValue.toLocaleString('ko-KR');
    }

    const sendAmountEl = document.getElementById('sendAmount');
    if (sendAmountEl) {
        sendAmountEl.value = krwAmount.toLocaleString('ko-KR');
    }

    updateFees(krwAmount, numValue);
}

function updateSavings(krw, foreignAmount) {
    const savingsElement = document.getElementById('savings');
    if (!savingsElement) return;

    const currentRate = exchangeRates[selectedCurrency].rate;
    const bankAmount = Math.floor(krw * (currentRate * 0.965));
    const savings = foreignAmount - bankAmount;
    const symbol = currencySymbols[selectedCurrency] || '¥';

    const template = translations[currentLang]['calc.savings'] || translations.ko['calc.savings'];
    const savingsText = template.replace('{amount}', `<strong>${symbol} ${savings.toLocaleString()}</strong>`);

    savingsElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>${savingsText}</span>
    `;
}
