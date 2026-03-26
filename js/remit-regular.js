// Regular remittance page logic (RM_02_03, RM_02_04)

// 날짜 초기화 함수
function initializeDates() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    if (!startDateInput || !endDateInput) return;

    // 시작일: 오늘 + 2일
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + 2);

    // 종료일: 시작일 + 1년
    const endDate = new Date(startDate);
    endDate.setFullYear(startDate.getFullYear() + 1);

    // 날짜 형식 변환 (YYYY-MM-DD)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    startDateInput.value = formatDate(startDate);
    endDateInput.value = formatDate(endDate);

    // 시작일 최소값 설정 (오늘 + 2일)
    startDateInput.min = formatDate(startDate);
}

// 송금 주기 선택 시 송금 일자 활성화
const remitCycleEl = document.getElementById('remitCycle');
if (remitCycleEl) {
    remitCycleEl.addEventListener('change', function () {
        const remitDateSelect = document.getElementById('remitDate');
        const remitDateInput = document.getElementById('remitDateInput');

        if (!remitDateSelect || !remitDateInput) return;

        if (this.value) {
            // 주기가 선택되면 송금 일자 활성화
            remitDateSelect.disabled = false;
            remitDateInput.disabled = false;
        } else {
            // 주기가 선택되지 않으면 송금 일자 비활성화
            remitDateSelect.disabled = true;
            remitDateInput.disabled = true;
        }
    });
}

// 송금 일자 직접 입력 시 1-31 범위 제한
const remitDateInputEl = document.getElementById('remitDateInput');
if (remitDateInputEl) {
    remitDateInputEl.addEventListener('input', function () {
        let value = parseInt(this.value);
        if (value > 31) {
            this.value = 31;
        } else if (value < 1 && this.value !== '') {
            this.value = 1;
        }
    });
}

// 시작일 변경 시 종료일 자동 업데이트 (1년 후)
const startDateEl = document.getElementById('startDate');
if (startDateEl) {
    startDateEl.addEventListener('change', function () {
        const endDateInput = document.getElementById('endDate');
        if (!endDateInput) return;

        const startDate = new Date(this.value);
        const endDate = new Date(startDate);
        endDate.setFullYear(startDate.getFullYear() + 1);

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        endDateInput.value = formatDate(endDate);
    });
}

// 송금 신청
function submitRemittance() {
    // 기존 에러 초기화
    if (typeof clearAllErrors === 'function') {
        clearAllErrors();
    }

    const country = document.getElementById('remitCountry')?.value;

    // 필수 항목 검증
    const requiredFields = [
        { id: 'remitCountry', message: 'error.countryRequired' },
        { id: 'remitService', message: 'error.serviceRequired' },
        { id: 'sendAmount', message: 'error.sendAmountRequired' },
        { id: 'firstNameEn', message: 'error.firstNameEnRequired' },
        { id: 'lastNameEn', message: 'error.lastNameEnRequired' },
        { id: 'recipientFirstNameEn', message: 'error.firstNameEnRequired' },
        { id: 'recipientLastNameEn', message: 'error.lastNameEnRequired' },
        { id: 'relationship', message: 'error.relationshipRequired' },
        { id: 'beneficiaryBank', message: 'error.beneficiaryBankRequired' },
        { id: 'beneficiaryAccount', message: 'error.beneficiaryAccountRequired' },
        { id: 'remitPurpose', message: 'error.remitPurposeRequired' },
        { id: 'fundSource', message: 'error.fundSourceRequired' },
        { id: 'beneficiaryPhone', message: 'error.phoneRequired' },
        { id: 'beneficiaryAddress', message: 'error.addressRequired' },
        { id: 'remitCycle', message: 'error.remitCycleRequired' },
        { id: 'remitDate', message: 'error.remitDateRequired' },
        { id: 'startDate', message: 'error.startDateRequired' },
        { id: 'endDate', message: 'error.endDateRequired' }
    ];

    // 일본인 경우에만 계좌 타입 필수
    if (country === 'JP') {
        requiredFields.push(
            { id: 'beneficiaryNameKana', message: 'error.kanaFirstNameRequired' },
            { id: 'beneficiaryLastNameKana', message: 'error.kanaLastNameRequired' },
            { id: 'accountType', message: 'error.accountTypeRequired' }
        );
    }

    // 호주인 경우에만 계좌 타입 필수
    if (country === 'AU') {
        requiredFields.push(
            { id: 'bsbNumber', message: 'error.bsbRequired' },
            { id: 'branchNumber', message: 'error.branchRequired' },
            { id: 'accountType', message: 'error.accountTypeRequired' }
        );
    }

    let hasError = !validateRequiredFields(requiredFields);

    // 출금 계좌 선택 검증 (라디오)
    const withdrawalAccountChecked = document.querySelector('input[name="withdrawalAccount"]:checked');
    const withdrawalAccountError = document.getElementById('withdrawalAccountError');
    if (!withdrawalAccountChecked) {
        if (withdrawalAccountError) {
            withdrawalAccountError.textContent = t('error.withdrawalAccountRequired');
            withdrawalAccountError.setAttribute('data-i18n', 'error.withdrawalAccountRequired');
        }
        hasError = true;
    } else if (withdrawalAccountError) {
        withdrawalAccountError.textContent = '';
        withdrawalAccountError.removeAttribute('data-i18n');
    }

    if (hasError) return;

    // 송금 신청 완료 모달 표시
    if (typeof openModal === 'function') {
        openModal('remitCompleteModal');
    }
}

// 모달 닫기
function closeRemitModal() {
    if (typeof closeModal === 'function') {
        closeModal('remitCompleteModal');
    }
    location.href = 'RM_02_01.html';
}

// 초기 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDates);
} else {
    initializeDates();
}
