// Single remittance page logic (RM_01_01)

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
        { id: 'depositBank', message: 'error.depositBankRequired' },
        { id: 'depositorName', message: 'error.depositorNameRequired' },
        { id: 'depositAccount', message: 'error.depositAccountRequired' },
        { id: 'accountHolder', message: 'error.accountHolderRequired' },
        { id: 'firstNameEn', message: 'error.firstNameEnRequired' },
        { id: 'lastNameEn', message: 'error.lastNameEnRequired' },
        { id: 'relationship', message: 'error.relationshipRequired' },
        { id: 'beneficiaryBank', message: 'error.beneficiaryBankRequired' },
        { id: 'beneficiaryAccount', message: 'error.beneficiaryAccountRequired' },
        { id: 'remitPurpose', message: 'error.remitPurposeRequired' },
        { id: 'fundSource', message: 'error.fundSourceRequired' },
        { id: 'beneficiaryPhone', message: 'error.phoneRequired' },
        { id: 'beneficiaryAddress', message: 'error.addressRequired' },
        { id: 'couponSelect', message: 'error.couponRequired' }
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

    if (!validateRequiredFields(requiredFields)) return;

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
