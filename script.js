const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('uppercase');
const lowEl = document.getElementById('lowercase');
const numberEl = document.getElementById('Numbers');
const symbolEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const copyEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLow,
  upper: getRandomUp,
  number: getRandomNumber,
  symbol: getSymbol
};

function getRandomLow() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUp() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getSymbol() {
  const symbols = '!@#%^&*(){}[]=/.,';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowEl.checked;
  const hasUpper = upperEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbols = symbolEl.checked;

  resultEl.innerText = generatePass(hasLower, hasUpper, hasNumber, hasSymbols, length);
});

function generatePass(hasLower, hasUpper, hasNumber, hasSymbols, length) {
  let generatedPassword = '';
  const typeCount = hasLower + hasUpper + hasNumber + hasSymbols;
  const typeArr = [{ hasLower }, { hasUpper }, { hasNumber }, { hasSymbols }].filter(item => Object.values(item)[0]);

  if (typeCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typeCount) {
    typeArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPass = generatedPassword.slice(0, length);
  return finalPass;
}
