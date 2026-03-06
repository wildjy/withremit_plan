// Sample remittance data (10 items) - Receive History
const remittanceData = [
  // verified - 인증
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
    flag: 'images/cn.png',
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
    flag: 'images/au.png',
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
    flag: 'images/ph.png',
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
    flag: 'images/vn.png',
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
    flag: 'images/bd.png',
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
    flag: 'images/hk.png',
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
    flag: 'images/np.png',
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
    flag: 'images/mn.png',
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
    flag: 'images/lk.png',
    name: 'Seo Hyunwoo',
    bank: '케이뱅크',
    receiveDate: '2026.01.03',
    status: 'cancel',
    statusText: '거래 취소',
    country: '스리랑카'
  }
];

// ===== Remit Account Selection Common =====
const remitFrequentAccounts = [
    { id: 1, country: 'JP', countryName: '일본', name: 'Tanaka Hiro', bank: 'Mizuho Bank', account: '123-4567-89', purpose: 'family', purposeName: '가족 송금' },
    { id: 2, country: 'PH', countryName: '필리핀', name: 'Maria Cruz', bank: 'BDO', account: '0011-2233-44', purpose: 'living', purposeName: '생활비' },
    { id: 3, country: 'CN', countryName: '중국', name: 'Wang Wei', bank: 'ICBC', account: '6222-0210-01', purpose: 'business', purposeName: '사업' },
    { id: 4, country: 'NP', countryName: '네팔', name: 'Ram Thapa', bank: 'Nabil Bank', account: '0101-0123-45', purpose: 'saving', purposeName: '저축' },
    { id: 5, country: 'AU', countryName: '호주', name: 'John Smith', bank: 'Commonwealth', account: '062-000-1234', purpose: 'education', purposeName: '교육비' },
    { id: 6, country: 'HK', countryName: '홍콩', name: 'Li Lei', bank: 'HSBC', account: '123-456-789', purpose: 'investment', purposeName: '투자' },
    { id: 7, country: 'MN', countryName: '몽골', name: 'Bold Bat', bank: 'Khan Bank', account: '5000-1234-56', purpose: 'gift', purposeName: '선물' },
    { id: 8, country: 'VN', countryName: '베트남', name: 'Nguyen Van A', bank: 'Vietcombank', account: '0011-0022-33', purpose: 'medical', purposeName: '의료비' },
    { id: 9, country: 'LK', countryName: '스리랑카', name: 'Perera', bank: 'BOC', account: '8888-7777-66', purpose: 'other', purposeName: '기타' },
    { id: 10, country: 'BD', countryName: '방글라데시', name: 'Rahman', bank: 'DBBL', account: '101.101.123', purpose: 'family', purposeName: '가족 송금' }
];

const remitRecentAccounts = [
    { id: 1, country: 'JP', countryName: '일본', name: 'Suzuki Ichiro', bank: 'SMBC', account: '987-6543-21', purpose: 'travel', purposeName: '여행 경비' },
    { id: 2, country: 'PH', countryName: '필리핀', name: 'Jose Rizal', bank: 'BPI', account: '5555-6666-77', purpose: 'family', purposeName: '가족 송금' },
    { id: 3, country: 'CN', countryName: '중국', name: 'Li Na', bank: 'China Bank', account: '6222-0000-99', purpose: 'business', purposeName: '물품 대금' },
    { id: 4, country: 'NP', countryName: '네팔', name: 'Sita', bank: 'Himalayan Bank', account: '0202-0987-65', purpose: 'living', purposeName: '생활비' },
    { id: 5, country: 'AU', countryName: '호주', name: 'Emma Watson', bank: 'ANZ', account: '013-111-2222', purpose: 'education', purposeName: '학비' },
    { id: 6, country: 'HK', countryName: '홍콩', name: 'Chan Tai Man', bank: 'Standard Chartered', account: '321-654-987', purpose: 'investment', purposeName: '부동산 투자' },
    { id: 7, country: 'MN', countryName: '몽골', name: 'Sarnai', bank: 'Golomt Bank', account: '1100-2200-33', purpose: 'gift', purposeName: '축의금' },
    { id: 8, country: 'VN', countryName: '베트남', name: 'Tran Thi B', bank: 'BIDV', account: '1234-5678-90', purpose: 'medical', purposeName: '병원비' },
    { id: 9, country: 'LK', countryName: '스리랑카', name: 'Silva', bank: 'People\'s Bank', account: '1111-2222-33', purpose: 'other', purposeName: '기부' },
    { id: 10, country: 'BD', countryName: '방글라데시', name: 'Ahmed', bank: 'BRAC Bank', account: '202.202.456', purpose: 'family', purposeName: '생활비 지원' }
];

// ===== DOM Elements =====
const countryCards = document.querySelectorAll('.country-card');

// Custom Dropdown Elements
const currencyDropdown = document.getElementById('currencyDropdown');
const currencyBtn = document.getElementById('currencyBtn');

// common Tabs
const tabs = document.querySelectorAll('.common-tab');
const contents = document.querySelectorAll('.tab-content');

// Generate status SVG
// verified - 인증,
// unverified - 미인증,
// received - 접수,
// processing - 신청중,
// approved- 접수 완료,
// complete - 입금 완료,
// success - 거래 성공,
// failed - 거래 실패,
// pending - 거래 보류
// cancel - 거래취소
function getStatusSVG(status) {
    const svgs = {
        // HI_01_01, HI_01_03
        verified: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.66667 0C2.99333 0 0 2.99333 0 6.66667C0 10.34 2.99333 13.3333 6.66667 13.3333C10.34 13.3333 13.3333 10.34 13.3333 6.66667C13.3333 2.99333 10.34 0 6.66667 0ZM9.85333 5.13333L6.07333 8.91333C5.98 9.00667 5.85333 9.06 5.72 9.06C5.58667 9.06 5.46 9.00667 5.36667 8.91333L3.48 7.02667C3.28667 6.83333 3.28667 6.51333 3.48 6.32C3.67333 6.12667 3.99333 6.12667 4.18667 6.32L5.72 7.85333L9.14667 4.42667C9.34 4.23333 9.66 4.23333 9.85333 4.42667C10.0467 4.62 10.0467 4.93333 9.85333 5.13333Z" fill="#059669"/></svg>',
        unverified: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.66667 0C2.99333 0 0 2.99333 0 6.66667C0 10.34 2.99333 13.3333 6.66667 13.3333C10.34 13.3333 13.3333 10.34 13.3333 6.66667C13.3333 2.99333 10.34 0 6.66667 0ZM8.90667 8.2C9.1 8.39333 9.1 8.71333 8.90667 8.90667C8.80667 9.00667 8.68 9.05333 8.55333 9.05333C8.42667 9.05333 8.3 9.00667 8.2 8.90667L6.66667 7.37333L5.13333 8.90667C5.03333 9.00667 4.90667 9.05333 4.78 9.05333C4.65333 9.05333 4.52667 9.00667 4.42667 8.90667C4.23333 8.71333 4.23333 8.39333 4.42667 8.2L5.96 6.66667L4.42667 5.13333C4.23333 4.94 4.23333 4.62 4.42667 4.42667C4.62 4.23333 4.94 4.23333 5.13333 4.42667L6.66667 5.96L8.2 4.42667C8.39333 4.23333 8.71333 4.23333 8.90667 4.42667C9.1 4.62 9.1 4.94 8.90667 5.13333L7.37333 6.66667L8.90667 8.2Z" fill="#EF4444"/></svg>',
        received: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.4395 2.06641C10.8927 2.06641 11.4591 2.38005 11.6992 2.7666L14.4863 7.21973C14.753 7.65306 14.7266 8.33357 14.4199 8.74023L10.9668 13.3398C10.7201 13.6665 10.186 13.9336 9.7793 13.9336H2.81348C1.64691 13.9336 0.939674 12.6535 1.55273 11.6602L3.39941 8.70703C3.64606 8.31372 3.64603 7.67361 3.39941 7.28027L1.55273 4.32715C0.939401 3.34715 1.65348 2.06641 2.81348 2.06641H10.4395ZM7.41602 4.72266C7.26285 4.49291 6.95241 4.43086 6.72266 4.58398C6.49289 4.73716 6.43081 5.04758 6.58398 5.27734L8.39844 8L6.58398 10.7227C6.43081 10.9524 6.49289 11.2628 6.72266 11.416C6.95241 11.5691 7.26285 11.5071 7.41602 11.2773L9.41602 8.27734C9.52795 8.10941 9.52795 7.89059 9.41602 7.72266L7.41602 4.72266Z" fill="#059669"/></svg>',
        processing: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00016 1.33333C4.32683 1.33333 1.3335 4.32666 1.3335 7.99999C1.3335 11.6733 4.32683 14.6667 8.00016 14.6667C11.6735 14.6667 14.6668 11.6733 14.6668 7.99999C14.6668 4.32666 11.6735 1.33333 8.00016 1.33333ZM11.1868 6.46666L7.40683 10.2467C7.3135 10.34 7.18683 10.3933 7.0535 10.3933C6.92016 10.3933 6.7935 10.34 6.70016 10.2467L4.8135 8.35999C4.62016 8.16666 4.62016 7.84666 4.8135 7.65333C5.00683 7.45999 5.32683 7.45999 5.52016 7.65333L7.0535 9.18666L10.4802 5.75999C10.6735 5.56666 10.9935 5.56666 11.1868 5.75999C11.3802 5.95333 11.3802 6.26666 11.1868 6.46666Z" fill="#059669"/></svg>',
        approved: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00016 1.33333C4.32683 1.33333 1.3335 4.32666 1.3335 7.99999C1.3335 11.6733 4.32683 14.6667 8.00016 14.6667C11.6735 14.6667 14.6668 11.6733 14.6668 7.99999C14.6668 4.32666 11.6735 1.33333 8.00016 1.33333ZM11.1868 6.46666L7.40683 10.2467C7.3135 10.34 7.18683 10.3933 7.0535 10.3933C6.92016 10.3933 6.7935 10.34 6.70016 10.2467L4.8135 8.35999C4.62016 8.16666 4.62016 7.84666 4.8135 7.65333C5.00683 7.45999 5.32683 7.45999 5.52016 7.65333L7.0535 9.18666L10.4802 5.75999C10.6735 5.56666 10.9935 5.56666 11.1868 5.75999C11.3802 5.95333 11.3802 6.26666 11.1868 6.46666Z" fill="#059669"/></svg>',
        complete: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00016 1.33333C4.32683 1.33333 1.3335 4.32666 1.3335 7.99999C1.3335 11.6733 4.32683 14.6667 8.00016 14.6667C11.6735 14.6667 14.6668 11.6733 14.6668 7.99999C14.6668 4.32666 11.6735 1.33333 8.00016 1.33333ZM10.9002 10.38C10.8068 10.54 10.6402 10.6267 10.4668 10.6267C10.3802 10.6267 10.2935 10.6067 10.2135 10.5533L8.14683 9.31999C7.6335 9.01333 7.2535 8.33999 7.2535 7.74666V5.01333C7.2535 4.73999 7.48016 4.51333 7.7535 4.51333C8.02683 4.51333 8.2535 4.73999 8.2535 5.01333V7.74666C8.2535 7.98666 8.4535 8.33999 8.66016 8.45999L10.7268 9.69333C10.9668 9.83333 11.0468 10.14 10.9002 10.38Z" fill="#1B5E9E"/></svg>',
        success: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7601 1.97333L4.74008 3.97333C0.693412 5.32666 0.693412 7.53333 4.74008 8.88L6.52674 9.47333L7.12008 11.26C8.46674 15.3067 10.6801 15.3067 12.0267 11.26L14.0334 5.24666C14.9267 2.54666 13.4601 1.07333 10.7601 1.97333ZM10.9734 5.56L8.44008 8.10666C8.34008 8.20667 8.21341 8.25333 8.08674 8.25333C7.96008 8.25333 7.83341 8.20667 7.73341 8.10666C7.54008 7.91333 7.54008 7.59333 7.73341 7.4L10.2667 4.85333C10.4601 4.66 10.7801 4.66 10.9734 4.85333C11.1667 5.04666 11.1667 5.36666 10.9734 5.56Z" fill="#1B5E9E"/></svg>',
        failed: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00065 1.33333C4.32732 1.33333 1.33398 4.32666 1.33398 7.99999C1.33398 11.6733 4.32732 14.6667 8.00065 14.6667C11.674 14.6667 14.6673 11.6733 14.6673 7.99999C14.6673 4.32666 11.674 1.33333 8.00065 1.33333ZM10.2407 9.53333C10.434 9.72666 10.434 10.0467 10.2407 10.24C10.1407 10.34 10.014 10.3867 9.88732 10.3867C9.76065 10.3867 9.63398 10.34 9.53398 10.24L8.00065 8.70666L6.46732 10.24C6.36732 10.34 6.24065 10.3867 6.11398 10.3867C5.98732 10.3867 5.86065 10.34 5.76065 10.24C5.56732 10.0467 5.56732 9.72666 5.76065 9.53333L7.29398 7.99999L5.76065 6.46666C5.56732 6.27333 5.56732 5.95333 5.76065 5.75999C5.95398 5.56666 6.27398 5.56666 6.46732 5.75999L8.00065 7.29333L9.53398 5.75999C9.72732 5.56666 10.0473 5.56666 10.2407 5.75999C10.434 5.95333 10.434 6.27333 10.2407 6.46666L8.70732 7.99999L10.2407 9.53333Z" fill="#EF4444"/></svg>',
        pending: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5936 10.4467L8.90031 8H7.09364L4.40031 10.4467C3.64698 11.1267 3.40031 12.1733 3.76698 13.12C4.13364 14.06 5.02698 14.6667 6.03364 14.6667H9.96031C10.9736 14.6667 11.8603 14.06 12.227 13.12C12.5936 12.1733 12.347 11.1267 11.5936 10.4467ZM9.21364 12.0933H6.78698C6.53364 12.0933 6.33364 11.8867 6.33364 11.64C6.33364 11.3933 6.54031 11.1867 6.78698 11.1867H9.21364C9.46698 11.1867 9.66698 11.3933 9.66698 11.64C9.66698 11.8867 9.46031 12.0933 9.21364 12.0933Z" fill="#4A5C64"/><path d="M12.2336 2.87998C11.8669 1.93998 10.9736 1.33331 9.96694 1.33331H6.0336C5.02694 1.33331 4.1336 1.93998 3.76694 2.87998C3.40694 3.82665 3.6536 4.87331 4.40694 5.55331L7.10027 7.99998H8.90694L11.6003 5.55331C12.3469 4.87331 12.5936 3.82665 12.2336 2.87998ZM9.2136 4.81998H6.78694C6.5336 4.81998 6.3336 4.61331 6.3336 4.36665C6.3336 4.11998 6.54027 3.91331 6.78694 3.91331H9.2136C9.46694 3.91331 9.66694 4.11998 9.66694 4.36665C9.66694 4.61331 9.46027 4.81998 9.2136 4.81998Z" fill="#4A5C64"/></svg>',
        cancel: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.66667 0C2.99333 0 0 2.99333 0 6.66667C0 10.34 2.99333 13.3333 6.66667 13.3333C10.34 13.3333 13.3333 10.34 13.3333 6.66667C13.3333 2.99333 10.34 0 6.66667 0ZM8.90667 8.2C9.1 8.39333 9.1 8.71333 8.90667 8.90667C8.80667 9.00667 8.68 9.05333 8.55333 9.05333C8.42667 9.05333 8.3 9.00667 8.2 8.90667L6.66667 7.37333L5.13333 8.90667C5.03333 9.00667 4.90667 9.05333 4.78 9.05333C4.65333 9.05333 4.52667 9.00667 4.42667 8.90667C4.23333 8.71333 4.23333 8.39333 4.42667 8.2L5.96 6.66667L4.42667 5.13333C4.23333 4.94 4.23333 4.62 4.42667 4.42667C4.62 4.23333 4.94 4.23333 5.13333 4.42667L6.66667 5.96L8.2 4.42667C8.39333 4.23333 8.71333 4.23333 8.90667 4.42667C9.1 4.62 9.1 4.94 8.90667 5.13333L7.37333 6.66667L8.90667 8.2Z" fill="#4A5C64"/></svg>',
        // RM_02_01 status icons
        // running: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        paused: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
        active: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        // stop: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
    };
    return svgs[status] || '';
}

// Function to activate a specific tab
if(tabs.length > 0 && contents.length > 0) {
    function activateTab(tabId) {
        // Deactivate all
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Activate target
        const targetTab = document.querySelector(`.common-tab[data-tab="${tabId}"]`);
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

function handleCurrencyChange(currency, flagUrl) {
    selectedCurrency = currency;

    const receiveCurrencyFlag = document.getElementById('receiveCurrencyFlag');
    const receiveCurrencyCode = document.getElementById('receiveCurrencyCode');
    const receiveCurrencySymbol = document.getElementById('receiveCurrencySymbol');
    const receiveCurrencyInput = document.getElementById('receiveCurrency');

    if (receiveCurrencyFlag && flagUrl) receiveCurrencyFlag.src = flagUrl;
    if (receiveCurrencyCode) {
        const displayCode = (typeof currencyCodes !== 'undefined' && currencyCodes[currency])
            ? currencyCodes[currency]
            : currency;
        receiveCurrencyCode.textContent = displayCode;
    }
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
    if (!header) return;

    if (document.body.classList.contains('db-body')) {
        header.classList.add('scrolled');
        return;
    }

    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const closeBtn = document.getElementById('sidebarClose');

    if (sidebar && !document.getElementById('sidebarOverlay')) {
        document.body.insertAdjacentHTML(
            'beforeend',
            `<div id="sidebarOverlay"></div>`
        );
    }

    const overlay = document.getElementById('sidebarOverlay');

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
    // Calculator event listeners (계산기 카드가 있는 페이지에서만 실행)
    const isCalculatorPage = !!document.getElementById('receiveCurrency') && !!currencyDropdown;
    if (isCalculatorPage) {
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

        if (receiveAmountInput && receiveAmountInput.tagName === 'INPUT') {
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

        // Set initial selected state
        document.querySelector('.calc-currency-option[data-value="JP"]')?.classList.add('selected');
    }

    // Country cards click
    countryCards.forEach(card => {
        card.addEventListener('click', handleCountryClick);
    });

    // Header scroll
    handleScroll(); // 초기 상태 체크
    window.addEventListener('scroll', handleScroll);


    // Initialize
    initAnimations();

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


// 이메일 입력 관련 이벤트 핸들러
function emailDomainEventHandler(options = {}) {
  const {
    localId = 'emailLocal',
    domainId = 'emailDomain',
    selectId = 'domainMode',
    fullId = 'emailFull',
    helpId = 'emailHelp',
  } = options;

  const localEl = document.getElementById(localId);
  const domainEl = document.getElementById(domainId);
  const selectEl = document.getElementById(selectId);
  const fullEl = document.getElementById(fullId);
  const helpEl = helpId ? document.getElementById(helpId) : null;

  // ✅ 해당 UI 없는 페이지면 아무것도 안 하고 종료
  if (!localEl || !domainEl || !selectEl || !fullEl) return;

  // ✅ 중복 등록 방지(페이지 내 스크립트가 여러 번 호출되는 경우 대비)
  if (selectEl.dataset.bound === '1') return;
  selectEl.dataset.bound = '1';

  window.emailVerified = false;

  const resetVerified = () => {
    window.emailVerified = false;
    if (helpEl) helpEl.textContent = '이메일 중복 확인을 진행해 주세요.';
  };

  const syncFullEmail = () => {
    const local = localEl.value.trim();
    const domain = domainEl.value.trim();
    fullEl.value = (local && domain) ? `${local}@${domain}` : '';
  };

  let prevMode = 'direct';

  const applyDomainMode = () => {
    if (!selectEl.value) selectEl.value = 'direct';
    const v = selectEl.value;

    if (v === 'direct') {
      domainEl.readOnly = false;
    //   domainEl.placeholder = '직접 입력';
      if (prevMode !== 'direct') domainEl.value = ''; // ✅ 선택→직접입력 시 초기화
    } else {
      domainEl.value = v;
      domainEl.readOnly = true;
    }

    prevMode = v;
    syncFullEmail();
    resetVerified();
  };

  // init
  if (!selectEl.value) selectEl.value = 'direct';
  applyDomainMode();

  // events
  selectEl.addEventListener('change', applyDomainMode);
  localEl.addEventListener('input', () => { syncFullEmail(); resetVerified(); });
  domainEl.addEventListener('input', () => { syncFullEmail(); resetVerified(); });
}

// ===== Half-width (전각 -> 반각) input 처리 =====
function normalizeHalfWidth(value) {
  return String(value || '')
    .replace(/[！-～]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0))
    .replace(/　/g, ' ');
}

function initHalfWidthInputs(selector = '.half-KeyMode-only') {
  document.querySelectorAll(selector).forEach((input) => {
    if (input.dataset.halfwidthBound === '1') return;
    input.dataset.halfwidthBound = '1';

    // 키보드 힌트 + 자동 교정 OFF (iOS 대응: 완전 강제는 아니지만 UX 개선)
    input.setAttribute('inputmode', 'latin');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('autocomplete', 'username');

    // IME 조합 입력 안전 처리
    let composing = false;

    const normalizeIdValue = (value) =>
      normalizeHalfWidth(value)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

    input.addEventListener('compositionstart', () => {
      composing = true;
    });

    input.addEventListener('compositionend', () => {
      composing = false;
      input.value = normalizeIdValue (input.value);
    });

    input.addEventListener('input', () => {
      if (composing) return;
      input.value = normalizeIdValue (input.value)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHalfWidthInputs();

  // 2) fetch로  DOM이 나중에 추가되는 경우 자동 적용
  const obs = new MutationObserver(() => {
    initHalfWidthInputs();
  });
  obs.observe(document.body, { childList: true, subtree: true });
});

// 중복 확인 모달 열기
function openDupCheckModal({
    type = 'email',      // 'email' | 'id'
    status = 'success',  // 'success' | 'fail'
}) {
    const titleEl = document.getElementById('dupCheckTitle');
    const msgEl = document.getElementById('dupCheckMessage');
    const iconEl = document.getElementById('dupCheckIcon');
    const btnEl = document.getElementById('dupCheckBtn');

    const isEmail = type === 'email';

    if (status === 'success') {
        titleEl.textContent = isEmail ? '이메일 중복 확인' : '아이디 중복 확인';
        msgEl.textContent = isEmail
        ? '사용 가능한 이메일입니다.'
        : '사용 가능한 아이디입니다.';

        iconEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00A0DC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11"></polyline>
        </svg>
        `;

        btnEl.style.backgroundColor = '#00A0DC';
    } else {
        titleEl.textContent = isEmail ? '이메일 중복 확인' : '아이디 중복 확인';
        msgEl.textContent = isEmail
        ? '이미 사용 중인 이메일입니다.'
        : '이미 사용 중인 아이디입니다.';

        iconEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z">
            </path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        `;

        btnEl.style.backgroundColor = '#f59e0b';
    }

    openModal('dupCheckModal');
}

// 에러 표시 함수
function showFieldError(elementId, message) {
    const element = document.getElementById(elementId);
    if (!element) return;

    bindGlobalFieldErrorAutoClear();

    // 부모 요소 찾기
    const fieldItem = element.closest('.field-item');
    if (!fieldItem) return;

    // input-box-group에 에러 클래스 추가 (없는 경우도 있음)
    const inputGroup = element.closest('.input-box-group');
    if (inputGroup) {
        inputGroup.classList.add('error');
    }

    // select, input, textarea인 경우 직접 에러 클래스 추가
    if (element.tagName === 'SELECT' || element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.classList.add('error');
    }

    // 에러 메시지 span 찾기
    const errorSpanId = `${elementId}Error`;
    let errorSpan = document.getElementById(errorSpanId);
    if (!errorSpan) {
        errorSpan = fieldItem.querySelector('.field-error');
    }
    if (errorSpan) {
        errorSpan.textContent = message;
    }

    // 값이 입력되면 해당 필드 에러 자동 해제 (중복 바인딩 방지)
    if (element.dataset.errorClearBound !== '1') {
        const clearHandler = () => clearFieldError(element);
        element.addEventListener('input', clearHandler);
        element.addEventListener('change', clearHandler);
        element.dataset.errorClearBound = '1';
    }
}

// 전역 자동 해제 바인딩 (select 변경으로 input 값이 코드에서 채워지는 케이스 대응)
function bindGlobalFieldErrorAutoClear() {
    if (document.documentElement.dataset.fieldErrorGlobalBound === '1') return;

    const reevaluate = () => {
        clearResolvedFieldErrors();
    };

    document.addEventListener('input', reevaluate, true);
    document.addEventListener('change', () => {
        // change 핸들러 내부에서 값이 세팅되는 경우를 위해 다음 tick에서 재평가
        setTimeout(reevaluate, 0);
    }, true);

    document.documentElement.dataset.fieldErrorGlobalBound = '1';
}

// 값이 채워진 에러 필드만 선별 해제
function clearResolvedFieldErrors() {
    const candidates = document.querySelectorAll(
        'input.error, select.error, textarea.error, .input-box-group.error input, .input-box-group.error select, .input-box-group.error textarea'
    );

    const seen = new Set();
    candidates.forEach((el) => {
        if (!el || seen.has(el)) return;
        seen.add(el);
        clearFieldError(el);
    });
}

// 단일 필드 에러 초기화
function clearFieldError(elementOrId) {
    const element = typeof elementOrId === 'string'
        ? document.getElementById(elementOrId)
        : elementOrId;

    if (!element) return;

    const value = (element.value ?? '').toString().trim();
    if (!value) return;

    const fieldItem = element.closest('.field-item');
    const inputGroup = element.closest('.input-box-group');

    if (inputGroup) {
        inputGroup.classList.remove('error');
    }

    if (element.tagName === 'SELECT' || element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.classList.remove('error');
    }

    const errorSpanId = `${element.id}Error`;
    let errorSpan = document.getElementById(errorSpanId);
    if (!errorSpan && fieldItem) {
        errorSpan = fieldItem.querySelector('.field-error');
    }
    if (errorSpan) {
        errorSpan.textContent = '';
    }
}

// 오타 호환용 alias (clearFiledError)
function clearFiledError(elementOrId) {
    clearFieldError(elementOrId);
}

// 모든 에러 초기화
function clearAllErrors() {
    document.querySelectorAll('.input-box-group.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.select-styled.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('input.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('textarea.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
}

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

// Close modal when clicking/touching outside
document.addEventListener('click', (e) => {
    if (!e.target.classList) return;

    // 직접 클릭한 요소가 modal-overlay인지 확인
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.id);
        return;
    }

    // 또는 closest로도 확인 (form 내부 모달도 대응)
    const modalOverlay = e.target.closest('.modal-overlay');
    if (modalOverlay) {
        // 클릭한 요소가 정확히 modal-overlay인지 확인
        if (e.target === modalOverlay) {
            closeModal(modalOverlay.id);
        }
    }
}, false); // 버블 단계에서 동작

// 터치 기기 지원
document.addEventListener('touchend', (e) => {
    if (!e.target.classList) return;

    if (e.target.classList.contains('modal-overlay')) {
        closeModal(e.target.id);
        return;
    }

    const modalOverlay = e.target.closest('.modal-overlay');
    if (modalOverlay && e.target === modalOverlay) {
        closeModal(modalOverlay.id);
    }
}, false);

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
const termsBoxes = document.querySelectorAll('.terms-content-box');

if (agreeAll && items.length > 0) {
    const hasTermsBoxes = termsBoxes.length >= items.length;
    const readState = Array.from({ length: items.length }, () => !hasTermsBoxes);

    function syncMasterState() {
        const checkedCount = document.querySelectorAll('.agree-item:checked').length;
        agreeAll.checked = (checkedCount === items.length);
    }

    function checkAllRequired() {
        const allChecked = Array.from(items).every(item => item.checked);
        if (nextBtn) {
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
    }

    termsBoxes.forEach((box, index) => {
        if (!items[index]) return;

        const markAsRead = () => {
            if (readState[index]) return;
            readState[index] = true;
            items[index].checked = true;
            syncMasterState();
            checkAllRequired();
        };

        if (box.scrollHeight <= box.clientHeight) {
            markAsRead();
            return;
        }

        box.addEventListener('scroll', () => {
            const reachedBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 2;
            if (reachedBottom) {
                markAsRead();
            }
        });
    });

    agreeAll.addEventListener('change', () => {
        if (agreeAll.checked) {
            const allRead = readState.every(Boolean);
            if (!allRead) {
                agreeAll.checked = false;
                // showTermsModal();
                openModal('termsScrollModal');
                return;
            }
            items.forEach(item => {
                item.checked = true;
            });
            checkAllRequired();
            return;
        }

        items.forEach(item => {
            item.checked = false;
        });
        checkAllRequired();
    });

    items.forEach((item, index) => {
        item.addEventListener('change', () => {
            if (item.checked && !readState[index]) {
                item.checked = false;
                // showTermsModal();
                openModal('termsScrollModal');
                return;
            }

            syncMasterState();
            checkAllRequired();
        });
    });

    syncMasterState();
    checkAllRequired();
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

function fillBeneficiaryName(name) {
    const beneficiaryNameInput = document.getElementById('beneficiaryName');
    if (beneficiaryNameInput) {
        beneficiaryNameInput.value = name;
        return;
    }

    const firstNameInput = document.getElementById('firstNameEn');
    const lastNameInput = document.getElementById('lastNameEn');

    if (firstNameInput && lastNameInput) {
        const nameParts = String(name || '').trim().split(/\s+/);
        if (nameParts.length >= 2) {
            lastNameInput.value = nameParts[0];
            firstNameInput.value = nameParts.slice(1).join(' ');
        } else {
            firstNameInput.value = name || '';
            lastNameInput.value = '';
        }
    }
}

function renderRemitAccountModal(type) {
    const title = document.getElementById('accountModalTitle');
    const tbody = document.getElementById('accountTableBody');
    const cardList = document.getElementById('accountCardList');
    if (!title || !tbody || !cardList) return;

    const data = type === 'frequent' ? remitFrequentAccounts : remitRecentAccounts;
    title.textContent = type === 'frequent' ? '자주 쓰는 계좌' : '최근 입금 계좌';

    tbody.innerHTML = '';
    cardList.innerHTML = '';

    data.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class='center'>${index + 1}</td>
            <td>${item.countryName}</td>
            <td>${item.name}</td>
            <td>${item.bank}</td>
            <td>${item.account}</td>
            <td>${item.purposeName}</td>
        `;
        tr.style.cursor = 'pointer';
        tr.onclick = () => window.selectAccount(item);
        tbody.appendChild(tr);

        const card = document.createElement('div');
        card.className = 'account-card';
        card.innerHTML = `
            <div class="account-card-header">
                <span class="account-card-number">#${index + 1}</span>
                <span class="account-card-country">${item.countryName}</span>
            </div>
            <div class="account-card-body">
                <div class="account-card-row">
                    <span class="account-card-label">수취인명</span>
                    <span class="account-card-value">${item.name}</span>
                </div>
                <div class="account-card-row">
                    <span class="account-card-label">은행명</span>
                    <span class="account-card-value">${item.bank}</span>
                </div>
                <div class="account-card-row">
                    <span class="account-card-label">계좌 번호</span>
                    <span class="account-card-value">${item.account}</span>
                </div>
                <div class="account-card-row">
                    <span class="account-card-label">송금 목적</span>
                    <span class="account-card-value">${item.purposeName}</span>
                </div>
            </div>
        `;
        card.onclick = () => window.selectAccount(item);
        cardList.appendChild(card);
    });
}

window.openAccountModal = function (type) {
    renderRemitAccountModal(type);
    openModal('accountSelectionModal');
};

window.selectAccount = function (item) {
    const countrySelect = document.getElementById('remitCountry');
    if (countrySelect) {
        countrySelect.value = item.country;
        countrySelect.dispatchEvent(new Event('change'));
    }

    setTimeout(() => {
        fillBeneficiaryName(item.name);

        const beneficiaryAccountInput = document.getElementById('beneficiaryAccount');
        if (beneficiaryAccountInput) {
            beneficiaryAccountInput.value = item.account;
        }

        const bankSelect = document.getElementById('beneficiaryBank');
        if (bankSelect && bankSelect.options.length > 1) {
            for (let i = 0; i < bankSelect.options.length; i++) {
                if (bankSelect.options[i].text.toLowerCase().includes(item.bank.toLowerCase()) ||
                    bankSelect.options[i].value.toLowerCase().includes(item.bank.toLowerCase())) {
                    bankSelect.selectedIndex = i;
                    break;
                }
            }
        }

        const purposeSelect = document.getElementById('remitPurpose');
        if (purposeSelect && item.purpose) {
            purposeSelect.value = item.purpose;
        }

        closeModal('accountSelectionModal');
    }, 100);
};

window.initRemitAccountSelection = function () {
    const btns = document.querySelectorAll('.quick-btn.small');
    if (btns.length >= 2) {
        btns[0].addEventListener('click', () => window.openAccountModal('frequent'));
        btns[1].addEventListener('click', () => window.openAccountModal('recent'));
    }
};

window.initEnhancedRemitCycle = function () {
    const remitCycle = document.getElementById('remitCycle');
    const remitDate = document.getElementById('remitDate');
    const remitDateInput = document.getElementById('remitDateInput');

    let currentDateChangeHandler = null;

    if (remitCycle && remitDate && remitDateInput) {
        remitCycle.addEventListener('change', function () {
            const cycle = this.value;
            remitDate.innerHTML = '';
            remitDate.disabled = false;
            remitDateInput.style.display = 'none';
            remitDateInput.value = '';

            if (cycle === 'daily') {
                const option = document.createElement('option');
                option.value = 'everyday';
                option.text = '매일';
                option.selected = true;
                remitDate.appendChild(option);
                remitDate.disabled = true;
            } else if (cycle === 'weekly') {
                const days = [
                    { val: 'mon', txt: '월요일' },
                    { val: 'tue', txt: '화요일' },
                    { val: 'wed', txt: '수요일' },
                    { val: 'thu', txt: '목요일' },
                    { val: 'fri', txt: '금요일' },
                    { val: 'sat', txt: '토요일' },
                    { val: 'sun', txt: '일요일' }
                ];

                const defaultOpt = document.createElement('option');
                defaultOpt.value = '';
                defaultOpt.text = '요일 선택';
                defaultOpt.disabled = true;
                defaultOpt.selected = true;
                remitDate.appendChild(defaultOpt);

                days.forEach(day => {
                    const option = document.createElement('option');
                    option.value = day.val;
                    option.text = day.txt;
                    remitDate.appendChild(option);
                });
            } else if (cycle === 'monthly') {
                const dates = [
                    { val: '5', txt: '5일' },
                    { val: '10', txt: '10일' },
                    { val: '15', txt: '15일' },
                    { val: '20', txt: '20일' },
                    { val: '25', txt: '25일' },
                    { val: 'end', txt: '말일' },
                    { val: 'custom', txt: '직접 입력' }
                ];

                const defaultOpt = document.createElement('option');
                defaultOpt.value = '';
                defaultOpt.text = '일자 선택';
                defaultOpt.disabled = true;
                defaultOpt.selected = true;
                remitDate.appendChild(defaultOpt);

                dates.forEach(d => {
                    const option = document.createElement('option');
                    option.value = d.val;
                    option.text = d.txt;
                    remitDate.appendChild(option);
                });

                if (currentDateChangeHandler) {
                    remitDate.removeEventListener('change', currentDateChangeHandler);
                }

                currentDateChangeHandler = function () {
                    if (remitDate.value === 'custom') {
                        remitDateInput.style.display = 'block';
                        remitDateInput.focus();
                    } else {
                        remitDateInput.style.display = 'none';
                        remitDateInput.value = '';
                    }
                };

                remitDate.addEventListener('change', currentDateChangeHandler);
            } else {
                const defaultOpt = document.createElement('option');
                defaultOpt.value = '';
                defaultOpt.text = '선택';
                defaultOpt.disabled = true;
                defaultOpt.selected = true;
                remitDate.appendChild(defaultOpt);
            }
        });

        remitDateInput.addEventListener('blur', function () {
            if (!this.value) {
                this.style.display = 'none';
                remitDate.style.display = 'block';
                remitDate.value = '';
            }
        });
    }
};