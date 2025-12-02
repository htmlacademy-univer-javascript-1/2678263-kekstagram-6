const isValidStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (str) => {
  const strTemp = str.replaceAll(' ', '').toUpperCase();
  let reversed = '';
  for(let i = strTemp.length - 1; i >= 0; i--) {
    reversed += strTemp[i];
  }
  return strTemp === reversed;
};

const getNumberFromString = (str) => {
  const sourceStr = typeof str === 'number' ? str.toString() : str;
  let accumulatorNumber = '';
  for (let i = 0; i < sourceStr.length; i++) {
    const num = parseInt(sourceStr[i], 10);
    if (!Number.isNaN(num)) {
      accumulatorNumber += num;
    }
  }
  return accumulatorNumber === '' ? NaN : Number(accumulatorNumber);
};

const canScheduleMeeting = ( dayStart , dayEnd, startTime, durationMinutes) => {
  const toMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const totalMinutesStartMeeting = toMinutes(startTime);
  const totalMinutesEndMeeting = toMinutes(startTime) + durationMinutes;

  const totalMinutesStart = toMinutes(dayStart);
  const totalMinutesEnd = toMinutes(dayEnd);

  return (
    totalMinutesStartMeeting >= totalMinutesStart &&
    totalMinutesEndMeeting <= totalMinutesEnd
  );
};

export { isValidStringLength, isPalindrome, getNumberFromString, canScheduleMeeting };
