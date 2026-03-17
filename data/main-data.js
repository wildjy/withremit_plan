// Main shared data (remittance history & account lists)

window.remittanceData = [
  // verified - 인증
  {
    receiptNum: '123456',
    date: '2026.01.12',
    sendAmount: '¥111,200',
    depositAmount: '¥111,200',
    receiveAmount: '₩1,000,000',
    receiveCurrency: '₩1,000,000',
    flag: 'images/jp.svg',
    name: 'Kim Minho',
    bank: '신한은행',
    receiveDate: '2026.01.12',
    status: 'verified',
    statusText: '인증',
    country: '일본'
  },
  // unverified - 미인증
  {
    receiptNum: '123457',
    date: '2026.01.11',
    sendAmount: '¥5,400',
    depositAmount: '¥5,400',
    receiveAmount: '₩1,000,000',
    receiveCurrency: '₩1,000,000',
    flag: 'images/cn.svg',
    name: 'Lee Jisoo',
    bank: '우리은행',
    receiveDate: '2026.01.11',
    status: 'unverified',
    statusText: '미인증',
    country: '중국'
  },
  // received - 접수
  {
    receiptNum: '123458',
    date: '2026.01.10',
    sendAmount: 'A$1,089',
    depositAmount: 'A$1,089',
    receiveAmount: '₩1,000,000',
    receiveCurrency: '₩1,000,000',
    flag: 'images/au.svg',
    name: 'Park Jiwon',
    bank: 'KB국민은행',
    receiveDate: '2026.01.10',
    status: 'received',
    statusText: '접수',
    country: '호주'
  },
  // processing - 신청중
  {
    receiptNum: '123459',
    date: '2026.01.09',
    sendAmount: '₱21,000',
    depositAmount: '₱21,000',
    receiveAmount: '₩500,000',
    receiveCurrency: '₩500,000',
    flag: 'images/ph.svg',
    name: 'Choi Seohyun',
    bank: '하나은행',
    receiveDate: '2026.01.09',
    status: 'processing',
    statusText: '신청중',
    country: '필리핀'
  },
  // approved - 접수 완료
  {
    receiptNum: '123460',
    date: '2026.01.08',
    sendAmount: '₫13,900,000',
    depositAmount: '₫13,900,000',
    receiveAmount: '₩800,000',
    receiveCurrency: '₩800,000',
    flag: 'images/vn.svg',
    name: 'Jung Hana',
    bank: 'IBK기업은행',
    receiveDate: '2026.01.08',
    status: 'approved',
    statusText: '접수 완료',
    country: '베트남'
  },
  // complete - 입금 완료
  {
    receiptNum: '123461',
    date: '2026.01.07',
    sendAmount: '৳57,600',
    depositAmount: '৳57,600',
    receiveAmount: '₩650,000',
    receiveCurrency: '₩650,000',
    flag: 'images/bd.svg',
    name: 'Kang Subin',
    bank: 'NH농협은행',
    receiveDate: '2026.01.07',
    status: 'complete',
    statusText: '입금 완료',
    country: '방글라데시'
  },
  // success - 거래 성공
  {
    receiptNum: '123462',
    date: '2026.01.06',
    sendAmount: 'HK$6,900',
    depositAmount: 'HK$6,900',
    receiveAmount: '₩1,200,000',
    receiveCurrency: '₩1,200,000',
    flag: 'images/hk.svg',
    name: 'Song Minji',
    bank: '카카오뱅크',
    receiveDate: '2026.01.06',
    status: 'success',
    statusText: '거래 성공',
    country: '홍콩'
  },
  // failed - 거래 실패
  {
    receiptNum: '123463',
    date: '2026.01.05',
    sendAmount: '₨44,000',
    depositAmount: '₨44,000',
    receiveAmount: '₩450,000',
    receiveCurrency: '₩450,000',
    flag: 'images/np.svg',
    name: 'Yoon Jihoon',
    bank: '토스뱅크',
    receiveDate: '2026.01.05',
    status: 'failed',
    statusText: '거래 실패',
    country: '네팔'
  },
  // pending - 거래 보류
  {
    receiptNum: '123464',
    date: '2026.01.04',
    sendAmount: '₮1,880,000',
    depositAmount: '₮1,880,000',
    receiveAmount: '₩750,000',
    receiveCurrency: '₩750,000',
    flag: 'images/mn.svg',
    name: 'Han Yoona',
    bank: 'SC제일은행',
    receiveDate: '2026.01.04',
    status: 'pending',
    statusText: '거래 보류',
    country: '몽골'
  },
  // cancel - 거래취소
  {
    receiptNum: '123465',
    date: '2026.01.03',
    sendAmount: '₨123,000',
    depositAmount: '₨123,000',
    receiveAmount: '₩550,000',
    receiveCurrency: '₩550,000',
    flag: 'images/lk.svg',
    name: 'Seo Hyunwoo',
    bank: '케이뱅크',
    receiveDate: '2026.01.03',
    status: 'cancel',
    statusText: '거래 취소',
    country: '스리랑카'
  }
];
// test data - for empty state
// window.remittanceData = [];

window.remitFrequentAccounts = [
    { id: 1, country: 'JP', countryName: '일본', firstName: 'Suzuki', lastName: 'Ichiro', firstNameKana: 'スズキ', lastNameKana: 'イチロウ', bank: 'Mizuho Bank', account: '987-6543-21', purpose: 'family', purposeName: '가족 송금' },
    { id: 3, country: 'CN', countryName: '중국', name: 'Wang Wei', bank: 'ICBC', account: '6222-0210-01', purpose: 'business', purposeName: '사업' },
    { id: 4, country: 'NP', countryName: '네팔', name: 'Ram Thapa', bank: 'Nabil Bank', account: '0101-0123-45', purpose: 'saving', purposeName: '저축' },
    { id: 5, country: 'AU', countryName: '호주', name: 'John Smith', bank: 'Commonwealth', account: '062-000-1234', bsbNumber: '123-456', purpose: 'education', purposeName: '교육비' },
    { id: 6, country: 'HK', countryName: '홍콩', name: 'Li Lei', bank: 'HSBC', account: '123-456-789', purpose: 'investment', purposeName: '투자' },
    { id: 7, country: 'MN', countryName: '몽골', name: 'Bold Bat', bank: 'Khan Bank', account: '5000-1234-56', purpose: 'gift', purposeName: '선물' },
    { id: 8, country: 'VN', countryName: '베트남', name: 'Nguyen Van A', bank: 'Vietcombank', account: '0011-0022-33', purpose: 'medical', purposeName: '의료비' },
    { id: 9, country: 'LK', countryName: '스리랑카', name: 'Perera', bank: 'BOC', account: '8888-7777-66', purpose: 'other', purposeName: '기타' },
    { id: 10, country: 'BD', countryName: '방글라데시', name: 'Rahman', bank: 'DBBL', account: '101.101.123', purpose: 'family', purposeName: '가족 송금' }
];

window.remitRecentAccounts = [
    { id: 1, country: 'JP', countryName: '일본', firstName: 'Suzuki', lastName: 'Ichiro', firstNameKana: 'スズキ', lastNameKana: 'イチロウ', bank: 'Mizuho Bank', account: '987-6543-21', purpose: 'family', purposeName: '가족 송금' },
    { id: 3, country: 'CN', countryName: '중국', name: 'Li Na', bank: 'China Bank', account: '6222-0000-99', purpose: 'business', purposeName: '물품 대금' },
    { id: 4, country: 'NP', countryName: '네팔', name: 'Sita', bank: 'Himalayan Bank', account: '0202-0987-65', purpose: 'living', purposeName: '생활비' },
    { id: 5, country: 'AU', countryName: '호주', name: 'Emma Watson', bank: 'ANZ', account: '013-111-2222', bsbNumber: '123-456', purpose: 'education', purposeName: '학비' },
    { id: 6, country: 'HK', countryName: '홍콩', name: 'Chan Tai Man', bank: 'Standard Chartered', account: '321-654-987', purpose: 'investment', purposeName: '부동산 투자' },
    { id: 7, country: 'MN', countryName: '몽골', name: 'Sarnai', bank: 'Golomt Bank', account: '1100-2200-33', purpose: 'gift', purposeName: '축의금' },
    { id: 8, country: 'VN', countryName: '베트남', name: 'Tran Thi B', bank: 'BIDV', account: '1234-5678-90', purpose: 'medical', purposeName: '병원비' },
    { id: 9, country: 'LK', countryName: '스리랑카', name: 'Silva', bank: 'People\'s Bank', account: '1111-2222-33', purpose: 'other', purposeName: '기부' },
    { id: 10, country: 'BD', countryName: '방글라데시', name: 'Ahmed', bank: 'BRAC Bank', account: '202.202.456', purpose: 'family', purposeName: '생활비 지원' }
];

window.recentAccounts = [
  { id: 1, country: 'JP', countryName: '일본', firstName: 'Suzuki', lastName: 'Ichiro', firstNameKana: 'スズキ', lastNameKana: 'イチロウ', bank: 'Mizuho Bank', account: '987-6543-21', purpose: 'family', purposeName: '가족 송금' },
  { id: 2, country: 'PH', countryName: '필리핀', firstName: 'Jose', lastName: 'Rizal', bank: 'BDO', account: '5555-6666-77', purpose: 'living', purposeName: '생활비' },
  { id: 3, country: 'CN', countryName: '중국', firstName: 'Li', lastName: 'Na', bank: 'ICBC', account: '6222-0000-99', purpose: 'business', purposeName: '사업' },
  { id: 4, country: 'NP', countryName: '네팔', firstName: 'Sita', lastName: '', bank: 'Nabil Bank', account: '0202-0987-65', purpose: 'saving', purposeName: '저축' },
  { id: 5, country: 'AU', countryName: '호주', firstName: 'Emma', lastName: 'Watson', bank: 'Commonwealth', account: '013-111-2222', bsbNumber: '123-456', purpose: 'education', purposeName: '교육비' },
];

window.couponList = [
  { id: 'coupon_1', name: '친구 소개 쿠폰', benefit: '수수료 전액 할인', description: '친구를 소개하면 받을 수 있는 쿠폰입니다.', validUntil: '2026.12.31', etc: '추가 혜택' },
  { id: 'coupon_2', name: '첫 거래 쿠폰', benefit: '수수료 50% 할인', description: '첫 거래를 완료하면 받을 수 있는 쿠폰입니다.', validUntil: '2026.12.31', etc: '친구 아이디 : withremit' },
  { id: 'coupon_3', name: '휴면 고객 쿠폰', benefit: '수수료 30% 할인', description: '오랜 기간 거래가 없는 고객에게 제공되는 쿠폰입니다.', validUntil: '2026.12.31', etc: '-' },
  { id: 'coupon_4', name: '특정 국가 송금 쿠폰', benefit: '수수료 20% 할인', description: '특정 국가로 송금할 때 사용할 수 있는 쿠폰입니다.', validUntil: '2026.12.31', etc: '-' },
  { id: 'coupon_5', name: '이벤트 참여 쿠폰', benefit: '수수료 10% 할인', description: '이벤트에 참여하면 받을 수 있는 쿠폰입니다.', validUntil: '2026.12.31', etc: '추가 혜택' }
];

// Bank Account Data (AC_02_03 - 출금 계좌 등록)
window.bankAccountData = [
  // 산업은행 - 2계좌
  {
    id: 1,
    bankName: '산업',
    accountType: '예금 · 적금',
    accountName: 'KDB 정기예금',
    accountNumber: '76346662510674',
    balance: '30,000,000원',
    status: 'available',
    statusText: '등록가능',
    disabled: false
  },
  {
    id: 2,
    bankName: '산업',
    accountType: '예금 · 적금',
    accountName: 'KDB 정기예금',
    accountNumber: '93808008753696',
    balance: '20,000,000원',
    status: 'available',
    statusText: '등록가능',
    disabled: false
  },
  // 케이뱅크 - 1계좌
  {
    id: 3,
    bankName: '케이뱅크',
    accountType: '입출금',
    accountName: '듀얼K 입출금통장',
    accountNumber: '100144380011',
    balance: '330,017원',
    status: 'available',
    statusText: '등록가능',
    disabled: false
  },
  // 카카오뱅크 - 2계좌
  {
    id: 4,
    bankName: '카카오뱅크',
    accountType: '입출금',
    accountName: '카카오뱅크 입출금통장',
    accountNumber: '3333037115702',
    balance: '613,612원',
    status: 'unavailable',
    statusText: '등록불가',
    disabled: true
  },
  {
    id: 5,
    bankName: '카카오뱅크',
    accountType: '예금·적금',
    accountName: '카카오뱅크 정기예금',
    accountNumber: '3388140671141',
    balance: '30,000,000원',
    status: 'available',
    statusText: '등록가능',
    disabled: false
  }
];