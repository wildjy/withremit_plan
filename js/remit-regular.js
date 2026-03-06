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
    let hasError = false;
    let firstErrorElement = null;

    // 필수 항목 검증
    const requiredFields = [
        { id: 'remitCountry', message: '국가를 선택해 주세요.' },
        { id: 'remitService', message: '서비스를 선택해 주세요.' },
        { id: 'sendAmount', message: '송금 금액을 입력해 주세요.' },
        { id: 'firstNameEn', message: '수취인 이름 (영문)을 입력해 주세요.' },
        { id: 'lastNameEn', message: '수취인 성 (영문)을 입력해 주세요.' },
        { id: 'relationship', message: '수취인과의 관계를 선택해 주세요.' },
        { id: 'beneficiaryBank', message: '수취 은행을 선택해 주세요.' },
        { id: 'beneficiaryAccount', message: '수취 계좌 번호를 입력해 주세요.' },
        { id: 'remitPurpose', message: '송금 목적을 선택해 주세요.' },
        { id: 'fundSource', message: '자금 출처를 선택해 주세요.' },
        { id: 'beneficiaryPhone', message: '전화번호를 입력해 주세요.' },
        { id: 'beneficiaryAddress', message: '주소를 입력해 주세요.' },
        { id: 'remitCycle', message: '송금 주기를 선택해 주세요.' },
        { id: 'remitDate', message: '송금 일자를 선택해 주세요.' },
        { id: 'startDate', message: '송금 시작일을 선택해 주세요.' },
        { id: 'endDate', message: '송금 종료일을 선택해 주세요.' }
    ];

    // 일본인 경우에만 계좌 타입 필수
    if (country === 'JP') {
        requiredFields.push(
            { id: 'beneficiaryNameKana', message: '수취인 이름(카나명)을 입력해 주세요.' },
            { id: 'beneficiaryLastNameKana', message: '수취인 성(카나명)을 입력해 주세요.' },
            { id: 'accountType', message: '수취 계좌 타입을 선택해 주세요.' }
        );
    }

    // 호주인 경우에만 계좌 타입 필수
    if (country === 'AU') {
        requiredFields.push(
            { id: 'bsbNumber', message: 'BSB 번호를 입력해 주세요.' },
            { id: 'branchNumber', message: '지점 번호를 입력해 주세요.' },
            { id: 'accountType', message: '수취 계좌 타입을 선택해 주세요.' }
        );
    }

    for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        if (!element) {
            continue;
        }
        if (!element.value || element.value.trim() === '') {
            if (typeof showFieldError === 'function') {
                showFieldError(field.id, field.message);
            }
            hasError = true;
            if (!firstErrorElement) {
                firstErrorElement = element;
            }
        } else if (typeof clearFieldError === 'function') {
            clearFieldError(field.id);
        }
    }

    // 출금 계좌 선택 검증 (라디오)
    const withdrawalAccountChecked = document.querySelector('input[name="withdrawalAccount"]:checked');
    const withdrawalAccountError = document.getElementById('withdrawalAccountError');
    if (!withdrawalAccountChecked) {
        if (withdrawalAccountError) {
            withdrawalAccountError.textContent = '출금 계좌를 선택해 주세요.';
        }
        hasError = true;
    } else if (withdrawalAccountError) {
        withdrawalAccountError.textContent = '';
    }

    // 에러가 있으면 첫 번째 에러 필드로 포커스 이동
    if (hasError) {
        if (firstErrorElement) {
            firstErrorElement.focus();
        }
        return;
    }

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
