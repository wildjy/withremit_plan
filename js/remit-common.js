// Shared remittance logic (single + regular)

// window 객체에 등록하여 전역 접근 가능하게
// window.exchangeRates = exchangeRates;

// 송금 한도 상수 정의 (전역)
// const MAX_LIMIT = 5000; // USD
// const KRW_PER_USD = 1350;
// const MAX_KRW_LIMIT = MAX_LIMIT * KRW_PER_USD; // 6,750,000원

const servicesByCountry = window.remitServicesByCountry || {};
const banksByCountry = window.remitBanksByCountry || {};
const quickAmountsByCountry = window.remitQuickAmounts || {};
const depositBankInfos = window.remitDepositBankInfos || {};

function getMaxUsd() {
    if (typeof MAX_LIMIT !== 'undefined') return MAX_LIMIT;
    if (typeof MAX_USD !== 'undefined') return MAX_USD;
    return 0;
}

function getMaxKrwLimit() {
    if (typeof MAX_KRW_LIMIT !== 'undefined') return MAX_KRW_LIMIT;
    const maxUsd = getMaxUsd();
    if (maxUsd && typeof KRW_PER_USD !== 'undefined') return maxUsd * KRW_PER_USD;
    return 0;
}

// 국가 선택 시 처리
const remitCountryEl = document.getElementById('remitCountry');
if (remitCountryEl) {
    remitCountryEl.addEventListener('change', function () {
        const country = this.value;
        const serviceSelect = document.getElementById('remitService');
        const bankSelect = document.getElementById('beneficiaryBank');
        const nameKanaSection = document.getElementById('NameKanaSection');
        const bsbSection = document.getElementById('BsbSection');
        const bsbField = document.getElementById('BsbField');

        if (nameKanaSection) {
            nameKanaSection.style.display = country === 'JP' ? 'grid' : 'none';
        }

        if (bsbSection) {
            bsbSection.classList.toggle('form-row-2', country === 'AU');
            bsbSection.classList.toggle('form-row', country !== 'AU');
        }

        if (bsbField) {
            bsbField.style.display = country === 'AU' ? 'grid' : 'none';
        }

        // 서비스 선택 업데이트
        if (serviceSelect) {
            serviceSelect.disabled = false;
            serviceSelect.innerHTML = '';

            if (servicesByCountry[country]) {
                servicesByCountry[country].forEach((service, index) => {
                    const option = document.createElement('option');
                    option.value = service.value;
                    option.textContent = service.text;
                    if (index === 0) option.selected = true;
                    serviceSelect.appendChild(option);
                });

                // 변경 불가능한 경우 disabled 처리
                if (servicesByCountry[country][0].locked && servicesByCountry[country].length === 1) {
                    serviceSelect.disabled = true;
                }
            }
        }

        // 은행 목록 업데이트
        if (bankSelect) {
            bankSelect.innerHTML = '';
            if (banksByCountry[country]) {
                banksByCountry[country].forEach(bank => {
                    const option = document.createElement('option');
                    option.value = bank.value;
                    option.textContent = bank.text;
                    if (bank.value === '') {
                        option.disabled = true;
                        option.selected = true;
                    }
                    bankSelect.appendChild(option);
                });
            }
        }

        // 송금액 설정 영역 표시
        const amountSectionWrapper = document.getElementById('amountSectionWrapper');
        if (amountSectionWrapper) {
            amountSectionWrapper.style.display = country ? 'block' : 'none';
        }

        // 환율 표시 업데이트
        const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');
        if (exchangeRateDisplay && exchangeRates[country]) {
            const rateInfo = exchangeRates[country];
            const rateFor1000 = (rateInfo.rate * 1000).toLocaleString('ko-KR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
            const exchangeRateEl = document.getElementById('exchangeRate');
            if (exchangeRateEl) {
                exchangeRateEl.textContent = `₩ 1,000 = ${rateInfo.symbol} ${rateFor1000}`;
            }
            exchangeRateDisplay.style.display = 'block';
        } else if (exchangeRateDisplay) {
            exchangeRateDisplay.style.display = 'none';
        }

        // 통화 기호 업데이트 (수취 금액 기준이 선택된 경우)
        const amountTypeEl = document.querySelector('input[name="amountType"]:checked');
        const currencySymbol = document.getElementById('currencySymbol');
        if (amountTypeEl && currencySymbol && exchangeRates[country]) {
            if (amountTypeEl.value === 'receive') {
                currencySymbol.textContent = exchangeRates[country].symbol;
            }
        }

        // 국가 변경 시 송금 금액/수취 금액 초기화
        const sendAmountInput = document.getElementById('sendAmount');
        if (sendAmountInput) {
            sendAmountInput.value = '';
        }

        // 국가 변경 시 계산 결과 영역 숨기기
        const calcResult = document.getElementById('calcResult');
        if (calcResult) {
            calcResult.classList.remove('active');
        }

        // 빠른 금액 버튼 업데이트
        updateQuickAmountButtons();
    });
}

// 송금액 기준 라디오 버튼 변경 시 통화 기호 및 라벨 업데이트
const amountTypeEls = document.querySelectorAll('input[name="amountType"]');
if (amountTypeEls.length > 0) {
    amountTypeEls.forEach(radio => {
        radio.addEventListener('change', function () {
            const country = document.getElementById('remitCountry')?.value;
            const currencySymbol = document.getElementById('currencySymbol');
            const amountLabel = document.getElementById('amountLabel');
            const sendAmountInput = document.getElementById('sendAmount');
            if (!sendAmountInput || !amountLabel || !currencySymbol) return;

            const currentAmount = sendAmountInput.value.replace(/,/g, '');
            const numValue = parseInt(currentAmount);

            if (this.value === 'send') {
                currencySymbol.textContent = '₩';
                amountLabel.textContent = '송금 금액';
                sendAmountInput.placeholder = '송금 금액을 입력하세요';

                // 수취 금액 → 송금 금액 변환 (외화를 KRW로)
                if (country && exchangeRates[country] && !isNaN(numValue) && numValue > 0) {
                    const krwAmount = Math.floor(numValue / exchangeRates[country].rate);
                    sendAmountInput.value = krwAmount.toLocaleString('ko-KR');
                }
            } else if (this.value === 'receive') {
                if (country && exchangeRates[country]) {
                    currencySymbol.textContent = exchangeRates[country].symbol;
                } else {
                    currencySymbol.textContent = '₩';
                }
                amountLabel.textContent = '수취 금액';
                sendAmountInput.placeholder = '수취 금액을 입력하세요';

                // 송금 금액 → 수취 금액 변환 (KRW를 외화로)
                if (country && exchangeRates[country] && !isNaN(numValue) && numValue > 0) {
                    const foreignAmount = Math.floor(numValue * exchangeRates[country].rate);
                    sendAmountInput.value = foreignAmount.toLocaleString('ko-KR');
                }
            }

            // 빠른 금액 버튼 업데이트
            updateQuickAmountButtons();
        });
    });
}

// 송금 금액 계산
function calculateRemit() {
    const country = document.getElementById('remitCountry')?.value;
    const sendAmountInput = document.getElementById('sendAmount')?.value;
    const amountType = document.querySelector('input[name="amountType"]:checked')?.value;

    if (!country) {
        showWarning('송금 국가를 선택해주세요.');
        return;
    }

    if (!sendAmountInput) {
        const message = amountType === 'send' ? '송금 금액을 입력해주세요.' : '수취 금액을 입력해주세요.';
        showWarning(message);
        return;
    }

    const inputAmount = parseFloat(sendAmountInput.replace(/,/g, ''));

    if (isNaN(inputAmount) || inputAmount <= 0) {
        showWarning('올바른 금액을 입력해주세요.');
        return;
    }

    const rateInfo = exchangeRates[country];
    const feeRate = country === 'NP' ? 0.005 : 0.01;

    let sendAmount, fee, receiveAmtBeforeFee, withdrawalFee, receiveAmt, depositAmount;

    if (amountType === 'send') {
        // 송금액 기준
        sendAmount = inputAmount;
        fee = Math.floor(sendAmount * feeRate);
        receiveAmtBeforeFee = (sendAmount - fee) * rateInfo.rate;
        withdrawalFee = rateInfo.withdrawalFee;
        receiveAmt = Math.max(receiveAmtBeforeFee - withdrawalFee, 0);
        depositAmount = sendAmount + fee;
    } else {
        // 수취 금액 기준 - 먼저 송금액 계산
        receiveAmt = inputAmount;
        withdrawalFee = rateInfo.withdrawalFee;
        receiveAmtBeforeFee = receiveAmt + withdrawalFee;
        const beforeFee = receiveAmtBeforeFee / rateInfo.rate;
        sendAmount = beforeFee / (1 - feeRate);
        fee = Math.floor(sendAmount * feeRate);
        depositAmount = sendAmount + fee;

        // 역산한 송금 금액이 한도를 초과하는지 검증
        if (sendAmount > getMaxKrwLimit()) {
            showLimitModal(`외환거래법령에 따라 건당 최대 <b>$${getMaxUsd().toLocaleString()}(USD)</b>까지 송금이 가능합니다.<br><br>수취 금액을 낮춰주세요.`);
            return;
        }
    }

    // 한도 검증 (송금액 기준으로 통일)
    if (sendAmount > getMaxKrwLimit()) {
        if (amountType === 'send') {
            showLimitModal(`외환거래법령에 따라 건당 최대 <b>$${getMaxUsd().toLocaleString()}(USD)</b>까지 송금이 가능합니다.<br><br>현재 환율 기준 송금 가능액인 <b>₩${getMaxKrwLimit().toLocaleString()}</b>까지 입력해주세요.`);
        } else {
            // 수취 금액 기준일 때는 최대 수취 가능액 계산
            const maxReceiveAmt = getMaxKrwLimit() * (1 - feeRate) * rateInfo.rate - rateInfo.withdrawalFee;
            showLimitModal(`외환거래법령에 따라 건당 최대 <b>$${getMaxUsd().toLocaleString()}(USD)</b>까지 송금이 가능합니다.<br><br>현재 환율 기준 수취 가능액인 <b>${rateInfo.symbol} ${Math.floor(maxReceiveAmt).toLocaleString()}</b>까지 입력해주세요.`);
        }
        return;
    }

    // 결과 표시
    const displaySendAmount = document.getElementById('displaySendAmount');
    const remitFee = document.getElementById('remitFee');
    const receiveAmount = document.getElementById('receiveAmount');
    const depositAmountEl = document.getElementById('depositAmount');

    if (displaySendAmount) {
        displaySendAmount.textContent = `₩ ${sendAmount.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}`;
    }
    if (remitFee) {
        remitFee.textContent = `₩ ${fee.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}`;
    }
    if (receiveAmount) {
        receiveAmount.textContent = `${rateInfo.symbol} ${receiveAmt.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}`;
    }
    if (depositAmountEl) {
        depositAmountEl.textContent = `₩ ${depositAmount.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}`;
    }

    // 수취 수수료 표시 및 그리드 컬럼 조정
    const withdrawalFeeRow = document.getElementById('withdrawalFeeRow');
    const withdrawalFeeAmount = document.getElementById('withdrawalFeeAmount');
    const calcResultCols = document.querySelector('.calc-result-cols');
    const calcResult = document.getElementById('calcResult');

    if (withdrawalFee > 0) {
        if (withdrawalFeeAmount) {
            withdrawalFeeAmount.textContent = `${rateInfo.symbol} ${withdrawalFee.toLocaleString('ko-KR')}`;
        }
        if (withdrawalFeeRow) {
            withdrawalFeeRow.classList.remove('hidden');
        }
        if (calcResultCols) {
            calcResultCols.classList.remove('four-items');
        }
    } else {
        if (withdrawalFeeRow) {
            withdrawalFeeRow.classList.add('hidden');
        }
        if (calcResultCols) {
            calcResultCols.classList.add('four-items');
        }
    }

    if (calcResult) {
        calcResult.classList.add('active');
    }
}

// 한도 초과 모달
function showLimitModal(message) {
    const limitModalMessage = document.getElementById('limitModalMessage');
    if (limitModalMessage) {
        limitModalMessage.innerHTML = message;
    }

    if (typeof openModal === 'function') {
        openModal('limitModal');
    } else {
        const modal = document.getElementById('limitModal');
        if (modal) modal.classList.add('active');
    }
}

// 경고 모달
function showWarning(message) {
    const warningMessage = document.getElementById('warningMessage');
    if (warningMessage) {
        warningMessage.textContent = message;
    }

    if (typeof openModal === 'function') {
        openModal('warningModal');
    } else {
        const modal = document.getElementById('warningModal');
        if (modal) modal.classList.add('active');
    }
}

// 송금액 입력 포맷팅 및 검증
const sendAmountEl = document.getElementById('sendAmount');
if (sendAmountEl) {
    sendAmountEl.addEventListener('input', function (e) {
        // 숫자만 허용
        let value = e.target.value.replace(/[^0-9]/g, '');

        if (value === '') {
            e.target.value = '';
            return;
        }

        let numValue = parseInt(value);
        const country = document.getElementById('remitCountry')?.value;
        const amountType = document.querySelector('input[name="amountType"]:checked')?.value;
        const maxKrwLimit = getMaxKrwLimit();

        // 한도 검증
        if (amountType === 'send') {
            if (numValue > maxKrwLimit) {
                showLimitModal(`외환거래법령에 따라 건당 최대 <b>$${getMaxUsd().toLocaleString()}(USD)</b>까지 송금이 가능합니다.<br><br>현재 환율 기준 송금 가능액인 <b>₩${maxKrwLimit.toLocaleString()}</b>까지 입력해주세요.`);
                numValue = maxKrwLimit;
            }
        } else if (amountType === 'receive' && country && exchangeRates[country]) {
            const rateInfo = exchangeRates[country];
            const feeRate = country === 'NP' ? 0.005 : 0.01;
            // 수취 금액 기준일 때는 송금액으로 환산하여 한도 검증
            const receiveAmt = numValue;
            const withdrawalFee = rateInfo.withdrawalFee;
            const receiveAmtBeforeFee = receiveAmt + withdrawalFee;
            const beforeFee = receiveAmtBeforeFee / rateInfo.rate;
            const calculatedSendAmount = beforeFee / (1 - feeRate);

            if (calculatedSendAmount > maxKrwLimit) {
                const maxReceiveAmt = maxKrwLimit * (1 - feeRate) * rateInfo.rate - rateInfo.withdrawalFee;
                showLimitModal(`외환거래법령에 따라 건당 최대 <b>$${getMaxUsd().toLocaleString()}(USD)</b>까지 송금이 가능합니다.<br><br>현재 환율 기준 수취 가능액인 <b>${rateInfo.symbol} ${Math.floor(maxReceiveAmt).toLocaleString()}</b>까지 입력해주세요.`);
                numValue = Math.floor(maxReceiveAmt);
            }
        }

        e.target.value = numValue.toLocaleString('ko-KR');
    });
}

// 빠른 금액 버튼 클릭 시
function setQuickAmount(amount, buttonEl) {
    const sendAmountInput = document.getElementById('sendAmount');
    if (!sendAmountInput) return;

    sendAmountInput.value = amount.toLocaleString('ko-KR');

    // 입력 이벤트 트리거하여 유효성 검사 및 자동 계산
    const event = new Event('input', { bubbles: true });
    sendAmountInput.dispatchEvent(event);

    // active 클래스 처리
    const quickButtonsContainer = document.getElementById('quickAmountButtons');
    if (quickButtonsContainer) {
        quickButtonsContainer.querySelectorAll('.quick-btn.active').forEach(btn => {
            btn.classList.remove('active');
        });

        if (buttonEl && buttonEl.classList) {
            buttonEl.classList.add('active');
        } else {
            const targetButton = quickButtonsContainer.querySelector(`.quick-btn[data-amount="${amount}"]`);
            if (targetButton) {
                targetButton.classList.add('active');
            }
        }
    }
}

// 빠른 금액 버튼 업데이트
function updateQuickAmountButtons() {
    const country = document.getElementById('remitCountry')?.value;
    const amountType = document.querySelector('input[name="amountType"]:checked')?.value;
    const quickButtonsContainer = document.getElementById('quickAmountButtons');

    if (!quickButtonsContainer) return;

    if (!country || !exchangeRates[country]) {
        quickButtonsContainer.innerHTML = '';
        return;
    }

    const rateInfo = exchangeRates[country];
    const feeRate = country === 'NP' ? 0.005 : 0.01;
    const isMobile = window.innerWidth <= 768;
    const maxKrwLimit = getMaxKrwLimit();
    let buttonsHtml = '';

    if (amountType === 'send') {
        // 송금액 기준: KRW 버튼 (100만~600만 고정)
        let amounts = [1000000, 2000000, 3000000, 4000000, 5000000, 6000000];

        // 모바일: 100만, 300만, 600만 3개 노출
        if (isMobile) {
            amounts = [1000000, 3000000, 6000000];
        }

        amounts.forEach(amount => {
            if (amount <= maxKrwLimit) {
                buttonsHtml += `<button type="button" class="quick-btn btn btn-secondary size-sm" data-amount="${amount}" onclick="setQuickAmount(${amount}, this)">₩ ${amount.toLocaleString('ko-KR')}</button>`;
            }
        });
    } else {
        // 수취 금액 기준: 외화 버튼 (송금액으로 환산하여 한도 검증)
        const quickAmounts = quickAmountsByCountry;

        // 최대 수취 가능액 계산 (송금액 한도를 수취액으로 환산, 수수료 고려)
        const fee = Math.floor(maxKrwLimit * feeRate);
        const receiveAmtBeforeFee = (maxKrwLimit - fee) * rateInfo.rate;
        const maxReceiveAmt = Math.floor(receiveAmtBeforeFee - rateInfo.withdrawalFee);

        let amounts = quickAmounts[country] || [100000, 300000, 500000];

        // 모바일: 3단계 (최소, 중간, 최대)
        if (isMobile && amounts.length > 3) {
            const midIndex = Math.floor(amounts.length / 2);
            amounts = [amounts[0], amounts[midIndex], amounts[amounts.length - 1]];
        }

        amounts.forEach(amount => {
            // 한도 내의 금액만 표시
            if (amount <= maxReceiveAmt) {
                buttonsHtml += `<button type="button" class="quick-btn btn btn-secondary size-sm" data-amount="${amount}" onclick="setQuickAmount(${amount}, this)">${rateInfo.symbol} ${amount.toLocaleString('ko-KR')}</button>`;
            }
        });
    }

    quickButtonsContainer.innerHTML = buttonsHtml;
}

// URL 파라미터에서 금액과 국가 읽어서 자동 설정
window.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    const countryParam = urlParams.get('country');

    const country = typeof window.normalizeCountryCode === 'function'
        ? window.normalizeCountryCode(countryParam)
        : (countryParam ? countryParam.trim().toUpperCase() : '');

    if (amount && country) {
        // 국가 선택
        const countrySelect = document.getElementById('remitCountry');
        if (!countrySelect || !exchangeRates[country]) return;
        countrySelect.value = country;

        // 국가 선택 이벤트 트리거 (서비스, 은행, 환율 업데이트)
        const event = new Event('change');
        countrySelect.dispatchEvent(event);

        // 금액 입력
        setTimeout(function () {
            const sendAmountInput = document.getElementById('sendAmount');
            if (!sendAmountInput) return;
            sendAmountInput.value = parseFloat(amount).toLocaleString('ko-KR');

            // 자동 계산 실행
            setTimeout(function () {
                calculateRemit();
            }, 100);
        }, 100);
    }
});

// 입금 은행 선택에 따른 계좌 정보 자동 입력
const depositBankEl = document.getElementById('depositBank');
if (depositBankEl) {
    depositBankEl.addEventListener('change', function () {
        const bank = this.value;
        const accountInput = document.getElementById('depositAccount');
        const holderInput = document.getElementById('accountHolder');

        if (!accountInput || !holderInput) return;

        // 은행별 정보 매핑
        if (depositBankInfos[bank]) {
            accountInput.value = depositBankInfos[bank].account;
            holderInput.value = depositBankInfos[bank].holder;
        } else {
            accountInput.value = '';
            holderInput.value = '';
        }
    });
}

const couponButton = document.querySelector('.coupon-btn');
const applyCouponButton = document.getElementById('applyCouponBtn');
const couponHiddenInput = document.getElementById('couponSelect');
const couponLabel = document.querySelector('.coupon-btn .btn-label');
const couponRows = document.querySelectorAll('#couponSelectionModal tbody tr');

couponRows.forEach((row) => {
    row.addEventListener('click', () => {
        const radio = row.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
        }
    });
});

if (couponButton) {
    couponButton.addEventListener('click', () => {
        openModal('couponSelectionModal');
    });
}

if (applyCouponButton) {
    applyCouponButton.addEventListener('click', () => {
        const selectedRadio = document.querySelector('#couponSelectionModal input[name="couponSelectRadio"]:checked');
        if (!selectedRadio) {
            return;
        }

        const selectedRow = selectedRadio.closest('tr');
        const selectedCouponName = selectedRow?.dataset.couponName || '';
        const selectedCouponId = selectedRow?.dataset.couponId || '';

        if (couponHiddenInput) {
            couponHiddenInput.value = selectedCouponId;
        }

        if (couponLabel && selectedCouponName) {
            couponLabel.textContent = selectedCouponName;
        }

        if (typeof clearFieldError === 'function') {
            clearFieldError('couponSelect');
        }

        closeModal('couponSelectionModal');
    });
}

// 출금 계좌 테이블 행 클릭 시 라디오 버튼 선택
const withdrawalRows = document.querySelectorAll('.db-notice-table tbody tr');
withdrawalRows.forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function (e) {
        // 라디오 버튼 직접 클릭한 경우는 처리 불필요
        if (e.target.type === 'radio') return;

        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
        }
    });
});