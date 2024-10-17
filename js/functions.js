//Функция для проверки длины строки.
const checkStringLength = (string, maxStringLength) => string.length <= maxStringLength;

//Функция для проверки, является ли строка палиндромом
const checkIsPalindrome = (string) => string.toLowerCase().replaceAll(' ', '') === string.toLowerCase().replaceAll(' ', '').split('').reverse().join('');

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
//Если в строке нет ни одной цифры, функция должна вернуть NaN:
const makeNumber = (string) => {
  let result = '';
  string = string.toString().replaceAll(' ', '').split('');
  for (let simbol of string) {
    if (Number(simbol) == simbol) {
    result += simbol;
    }
  }
  return Number(result);
}

