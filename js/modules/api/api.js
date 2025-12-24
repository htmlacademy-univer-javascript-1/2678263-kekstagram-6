const SERVER_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

async function getData() {
  const response = await fetch(`${SERVER_URL}/data`);

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }

  const jsonData = await response.json();
  return jsonData;
}


async function sendData(formData) {
  const response = await fetch(`${SERVER_URL}`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Ошибка отправки данных: ${response.status} ${response.statusText}`);
  }
}

export { getData, sendData };
