const numeral = require('numeral');

numeral.register('locale', 'es', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  ordinal: function(number) {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
    symbol: '$',
  },
});

numeral.locale('es');
