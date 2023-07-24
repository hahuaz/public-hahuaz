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

function bubbleSort(arr: number[]): number[] {
  const n = arr.length;

  // Iterate through each element in the array
  // The outer loop controls the number of passes
  for (let i = 0; i < n - 1; i++) {
    // Iterate through the unsorted portion of the array
    // After each pass, the largest element in the unsorted portion moves to the end
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements arr[j] and arr[j + 1]
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  // Return the sorted array
  return arr;
}

// -------------------------

function insertionSort(arr: number[]): number[] {
  const n = arr.length;

  // Iterate through each element in the array
  // Start from the second element (index 1), as the first element (index 0) is considered already sorted
  for (let i = 1; i < n; i++) {
    // Select the current element to be inserted into the sorted subarray
    const current = arr[i];

    let lastSortedPoint = i - 1;

    // Compare the current element with the elements in the sorted subarray
    // Move the elements greater than the current element one position to the right
    while (lastSortedPoint >= 0 && arr[lastSortedPoint] > current) {
      arr[lastSortedPoint + 1] = arr[lastSortedPoint];
      lastSortedPoint--;
    }

    // Insert the current element into its correct position in the sorted subarray
    arr[lastSortedPoint + 1] = current;
  }

  // Return the sorted array
  return arr;
}

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
