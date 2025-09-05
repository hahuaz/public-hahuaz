// -------------------------

/**
 * prime number: a number that is divisible only by itself and 1 (e.g. 2, 3, 5, 7, 11).
 *  */
function isPrime(num: number): boolean {
  if (num < 2) {
    return false;
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function returnPrimeNumbers(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1).filter(isPrime);
}

const primeTo500 = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
  239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
  331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
  421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
];

if (JSON.stringify(returnPrimeNumbers(500)) === JSON.stringify(primeTo500)) {
  console.log("isPrime function is correct");
} else {
  throw new Error("isPrime function is incorrect");
}

// -------------------------

/**
 * hex system is used to represent binary data in a human-readable format.
 * hex is used instead of decimal because it is easier to convert between hex and binary.
 * hex system consists of 16 characters: 0-9 and A-F.
 * hex system is base-16, which means each digit can represent 16 values.
 * each value is equivalent to 4 bits, which is half a byte (1 byte = 8 bits).
 * for example, A in hex is 1010 in binary, and F in hex is 1111 in binary. so AF in hex is 10101111 in binary which equals to 1 byte.
 */
const hexToBinaryMap: { [key: string]: string } = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  a: "1010",
  b: "1011",
  c: "1100",
  d: "1101",
  e: "1110",
  f: "1111",
};

function hexToBinary(hex: string): string {
  let binaryValue = "";
  const hexLowercase = hex.toLowerCase();

  // Iterate through the characters in the hexadecimal string
  for (let i = 0; i < hexLowercase.length; i++) {
    const char = hexLowercase[i];

    // Get the binary representation of the hexadecimal digit
    const digitValue = hexToBinaryMap[char];

    // If the hexadecimal digit is not found in the map, return an error
    if (!digitValue) {
      throw new Error(`Invalid hexadecimal digit: ${char}`);
    }

    // append the binary representation to the result
    binaryValue += digitValue;
  }

  return binaryValue;
}

if (hexToBinary("AF") === "10101111") {
  console.log("hexToBinary function is correct");
} else {
  throw new Error("hexToBinary function is incorrect");
}

// -------------------------

// Efficiently Store Long String with Repeated Characters

// You are given a long string that contains only uppercase letters.
// Your task is to write a function that efficiently counts the occurrences of repeated characters and stores the results in a memory-efficient way.
// The function should return an array of arrays, where each inner array consists of two elements: the repeated character and its corresponding count.

// Example:
// Input: "AAAABCCCCCDDDDDDDDD"
// Output: [['A', 4], ['B', 1], ['C', 5], ['D', 9]]

function countRepeatedCharacters(s: string): [string, number][] {
  const countMap: { [key: string]: number } = {};

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (countMap[char]) {
      countMap[char]++;
    } else {
      countMap[char] = 1;
    }
  }

  return Object.entries(countMap);
}

if (
  JSON.stringify(countRepeatedCharacters("AAAABCCCCCDDDDDDDDD")) ===
  JSON.stringify([
    ["A", 4],
    ["B", 1],
    ["C", 5],
    ["D", 9],
  ])
) {
  console.log("countRepeatedCharacters function is correct");
} else {
  throw new Error("countRepeatedCharacters function is incorrect");
}

// -------------------------

// write me a function that sanitizes the given object by removing specified properties.

/**
 * Sanitizes the given object by removing specified properties.
 *
 * @param {T} obj - The object to be sanitized.
 * @param {Array<keyof T>} props - An array of properties to be removed from the object.
 * @returns {Partial<T>} - The sanitized object.
 */
function sanitizeObject<T>(obj: T, props: Array<keyof T>): Partial<T> {
  const sanitizedObj = { ...obj };
  props.forEach((prop) => {
    delete sanitizedObj[prop];
  });
  return sanitizedObj;
}

// Example usage:
interface User {
  name: string;
  age: number;
  password: string;
}

const obj: User = { name: "Alice", age: 25, password: "secret" };
const propsToSanitize: Array<keyof User> = ["password"];
const sanitizedObj = sanitizeObject(obj, propsToSanitize);

console.log(sanitizedObj); // { name: 'Alice', age: 25 }

// -------------------------

// Convert the given array of numbers into a singly linked list

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number, next?: ListNode | null) {
    this.val = val;
    this.next = next || null;
  }
}

const arrToList = (arr: number[]): ListNode | null => {
  if (!arr.length) return null;

  let head = new ListNode(arr[0]);
  let curNode = head;

  for (let i = 1; i < arr.length; i++) {
    curNode.next = new ListNode(arr[i]);
    curNode = curNode.next;
  }

  return head;
};

// Example usage:
const list = arrToList([1, 2, 3, 4, 5]);
let currentNode = list;
while (currentNode) {
  console.log(currentNode.val); // Output: 1 2 3 4 5
  currentNode = currentNode.next;
}

// -------------------------
