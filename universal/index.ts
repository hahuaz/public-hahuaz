/**
 * prime number: a number that is divisible only by itself and 1 (e.g. 2, 3, 5, 7, 11).
 *  */
function isPrime(num: number): boolean {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function printPrimeNumbers(n: number): void {
  for (let i = 1; i <= n; i++) {
    if (isPrime(i)) {
      console.log(i);
    }
  }
}

// Example usage:
printPrimeNumbers(20);

// -------------------------

// -------------------------

// Dictionary to hold hexadecimal characters and their decimal equivalents
const hexNumbers: { [key: string]: number } = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};

function hexToDecimal(hex: string): number {
  let decimalValue = 0;
  const hexLowercase = hex.toLowerCase();

  // Iterate through the characters in the hexadecimal string starting from the right
  for (let i = hexLowercase.length - 1; i >= 0; i--) {
    const char = hexLowercase[i];
    const digitValue = hexNumbers[char];
    const exponent = hexLowercase.length - 1 - i;

    // Calculate the decimal value by adding the current digit value multiplied by the appropriate power of 16
    decimalValue += digitValue * Math.pow(16, exponent);
  }

  return decimalValue;
}

const hexString = "1A3";
const decimalValue = hexToDecimal(hexString);
console.log(decimalValue); // Output: 419

// -------------------------

// Efficiently Store Long String with Repeated Characters

// You are given a long string that contains only uppercase letters.
// Your task is to write a function that efficiently counts the occurrences of repeated characters and stores the results in a memory-efficient way.
// The function should return an array of arrays, where each inner array consists of two elements: the repeated character and its corresponding count.

// Example:
// Input: "AAAABCCCCCDDDDDDDDD"
// Output: [['A', 4], ['B', 1], ['C', 5], ['D', 9]]

type CharacterCount = [string, number];

function storeRepeatedCharacters(s: string): CharacterCount[] {
  const result: CharacterCount[] = [];
  let currentChar = s[0];
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === currentChar) {
      count++;
    } else {
      // push previous character and its count to result array
      result.push([currentChar, count]);

      // reset current character and count
      currentChar = char;
      count = 1;
    }
  }

  // push the last character and its count to result array
  result.push([currentChar, count]);

  return result;
}

// Test the function with the given example
const inputString = "AAAABCCCCCDDDDDDDDDE";
const result = storeRepeatedCharacters(inputString);
console.log(result); // Output: [['A', 4], ['B', 1], ['C', 5], ['D', 9], ['E', 1]]
