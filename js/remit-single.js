// Single remittance page logic (RM_01_01)

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
        { id: 'depositBank', message: '입금 은행을 선택해 주세요.' },
        { id: 'depositorName', message: '입금자 명을 입력해 주세요.' },
        { id: 'depositAccount', message: '입금 계좌를 입력해 주세요.' },
        { id: 'accountHolder', message: '입금 계좌 명의를 입력해 주세요.' },
        { id: 'firstNameEn', message: '수취인 이름 (영문)을 입력해 주세요.' },
        { id: 'lastNameEn', message: '수취인 성 (영문)을 입력해 주세요.' },
        { id: 'relationship', message: '수취인과의 관계를 선택해 주세요.' },
        { id: 'beneficiaryBank', message: '수취 은행을 선택해 주세요.' },
        { id: 'beneficiaryAccount', message: '수취 계좌 번호를 입력해 주세요.' },
        { id: 'remitPurpose', message: '송금 목적을 선택해 주세요.' },
        { id: 'fundSource', message: '자금 출처를 선택해 주세요.' },
        { id: 'beneficiaryPhone', message: '전화번호를 입력해 주세요.' },
        { id: 'beneficiaryAddress', message: '주소를 입력해 주세요.' },
        { id: 'couponSelect', message: '할인쿠폰을 선택해 주세요.' }
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
    location.href = 'DB_01_01.html';
}
