const isValidStringLength = (stringLength, maxLength) => stringLength.length <= maxLength;

const isPalindrome = (str) => {
  str = str.replaceAll(' ', '').toUpperCase();
  return str === str.split('').reverse().join('');
};

const getNumberFromString = (str) => {
  if(typeof str === 'number') {
    str = str.toString();
  }
  str = str.replace(/\D/g, '');
  return str ?  Number(str) : NaN;
};
