import { assertEqual } from "@repo/lib";

// -------------------------

/**
 * A prime number is only divisible by 1 and itself.
 * The first few prime numbers are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...
 */
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
  const primes: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

// -------------------------

/**
 * The hexadecimal (hex) system consists of 16 characters: 0–9 and A–F.
 * Hex is base-16, meaning each digit can represent 16 values.
 *
 * Hex is commonly used to represent binary data in a human-readable format.
 * It is preferred over decimal because conversion between hex and binary is straightforward.
 * Each hex digit corresponds to 4 bits (half a byte). Since 1 byte = 8 bits,
 * two hex digits represent exactly 1 byte.
 *
 * Example: A in hex = 1010 in binary, and F in hex = 1111 in binary.
 * Together, AF in hex = 10101111 in binary, which represents 1 byte.
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
  hex = hex.toLowerCase();

  // Iterate through the characters in the hexadecimal string
  for (let i = 0; i < hex.length; i++) {
    const char = hex[i];

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

assertEqual(
  countRepeatedCharacters("AAAABCCCCCDDDDDDDDD"),
  [
    ["A", 4],
    ["B", 1],
    ["C", 5],
    ["D", 9],
  ],
  "should count characters correctly"
);

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

const myUser: User = { name: "Alice", age: 25, password: "mypass" };
const propsToSanitize: Array<keyof User> = ["password"];
const sanitizedObj = sanitizeObject(myUser, propsToSanitize);

console.log(sanitizedObj); // { name: 'Alice', age: 25 }

// -------------------------
/**
 * company operates two drones.
 * Two drone needs to complete delivery1 and delivery2.
 * Each delivery takes 1 hour.
 * Only one drone can operate at a time.
 *
 * Drone1 needs to charge every charge1, drone2 needs to charge every charge2.
 * Both drone can charge at the same time.
 *
 * Determine the minimum time to complete both deliveries.
 *
 * Example:
 * Input: delivery1 = 3, delivery2 = 1, charge1 = 2, charge2 = 3
 *
 * Output: 5
 *
 * Explanation:
 * Drone1 is out for delivery on hours 1,3,5. It charges on hours 2,4 (multiple of charge1)
 * Drone2 is out for delivery on hour 2. It can charge on hour 3 (multiple of charge2) but no need since delivery is done.
 */

function minDeliveryTime(
  d1: number,
  d2: number,
  c1: number,
  c2: number
): number {
  // Impossible if a drone must charge every hour but still has work
  if (c1 === 1 && d1 > 0) return -1;
  if (c2 === 1 && d2 > 0) return -1;
  if (d1 === 0 && d2 === 0) return 0;

  let t = 0; // hours are 1-based in the spec; we'll pre-increment at loop start

  while (d1 > 0 || d2 > 0) {
    t++;

    const d1Available = d1 > 0 && t % c1 !== 0;
    const d2Available = d2 > 0 && t % c2 !== 0;

    if (!d1Available && !d2Available) {
      // both charging, do nothing
      continue;
    }

    if (d1Available && !d2Available) {
      d1--; // only Drone1 can work this hour
    } else if (!d1Available && d2Available) {
      d2--; // only Drone2 can work this hour
    } else if (d1Available && d2Available) {
      // Both can work
      // choose the one that has less time to next charge
      const next1 = c1 - (t % c1);
      const next2 = c2 - (t % c2);

      if (next1 < next2) {
        d1--;
      } else if (next2 < next1) {
        d2--;
      } else {
        // tie: break by who has more remaining work (helps finish sooner)
        if (d1 >= d2) d1--;
        else d2--;
      }
    }
  }

  return t;
}
console.log(minDeliveryTime(3, 1, 2, 3)); // expected 5
console.log(minDeliveryTime(1, 1, 2, 3)); // expected 2
console.log(minDeliveryTime(10, 0, 7, 4)); // expected 11
console.log(minDeliveryTime(7, 7, 3, 3)); // expected 20
console.log(minDeliveryTime(4, 1, 1, 3)); // expected IMPOSSIBLE (-1)

// ------------------------
