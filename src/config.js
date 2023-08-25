export const {BOTID, MANAGER_ID} = process.env;

export const {
    MYSQL_USER,
    MYSQL_DATABASE,
    MYSQL_ROOT_PASSWORD,
    MYSQL_HOST,
    MYSQL_PORT,
  } = process.env;

  export const states = {
    menu: 'menu',
    profile: 'profile',
    vip: 'vip',
    rates: 'rates',
    deals: 'deals',
    signals: 'signals'
  }
export const menuButtons = [
  {
    button: 'My Profile',
    callBack: '/profile'
  },
  {
    button: 'Signals',
    callBack: '/signals'
  },  
  {
    button: 'Trade coach',
    callBack: '/vip'
  },
  {
    button:' My last deals',
    callBack: '/deals'
  },
];

export const signals = {
  'EUR/USD': {
    name: 'EUR/USD',
    value: 1.83
  },
  'EUR/NZD': {
    name: 'EUR/NZD',
    value: 1.84
  },
  'AUD/NZD': {
    name: 'AUD/NZD',
    value: 1.81
  },
  'Crypto IDX': {
    name: 'Crypto IDX',
    value: 1.8
  },
};
export const currencyPairsButtons = [
  {
    button: 'EUR/USD',
    callBack: signals['EUR/USD'].name
  },
  {
    button: 'EUR/NZD',
    callBack: signals['EUR/NZD'].name
  },  
  {
    button: 'AUD/NZD',
    callBack: signals['AUD/NZD'].name
  },
  {
    button: 'Crypto IDX',
    callBack: signals['Crypto IDX'].name
  },
  {
    button: 'Back',
    callBack: 'back'
  }
];

