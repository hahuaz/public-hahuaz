// 1561. Maximum Number of Coins You Can Get

// There are 3n piles of coins of varying size, you and your friends will take piles of coins as follows:
// In each step, you will choose any 3 piles of coins (not necessarily consecutive).
// Of your choice, Alice will pick the pile with the maximum number of coins.
// You will pick the next pile with the maximum number of coins.
// Your friend Bob will pick the last pile.
// Repeat until there are no more piles of coins.
// Given an array of integers piles where piles[i] is the number of coins in the ith pile.
// Return the maximum number of coins that you can have.
//
// Input: piles = [2,4,1,2,7,8]
// Output: 9
// Explanation: Choose the triplet (2, 7, 8), Alice Pick the pile with 8 coins, you the pile with 7 coins and Bob the last one.
// Choose the triplet (1, 2, 4), Alice Pick the pile with 4 coins, you the pile with 2 coins and Bob the last one.
// The maximum number of coins which you can have are: 7 + 2 = 9.
// On the other hand if we choose this arrangement (1, 2, 8), (2, 4, 7) you only get 2 + 4 = 6 coins which is not optimal.

function maxCoins(piles: number[]): number {
  piles.sort((a, b) => a - b);
  let result = 0;
  while (piles.length !== 0) {
    piles.pop();
    result += piles.pop()!;
    piles.shift();
  }
  return result;
}

function maxCoins2(piles: number[]): number {
  piles.sort((a, b) => a - b);
  let i = 0; // Bob (smallest side)
  let j = piles.length - 1; // Alice/You (largest side)
  let rounds = Math.floor(piles.length / 3);
  let res = 0;

  while (rounds--) {
    const alice = piles[j--]; // largest
    const me = piles[j--]; // second largest
    res += me;
    const bob = piles[i++]; // smallest
  }

  return res;
}

function maxCoins3(piles: number[]): number {
  piles.sort((a, b) => a - b);
  let result = 0;

  const rounds = piles.length / 3;
  // give mins to bob from left for each round.
  // so you're starting from what left out. take every other
  const startFrom = rounds;

  for (let i = startFrom; i < piles.length; i += 2) {
    result += piles[i];
  }
  return result;
}

console.log(maxCoins([9, 8, 7, 6, 5, 1, 2, 3, 4])); // 18
console.log(maxCoins2([9, 8, 7, 6, 5, 1, 2, 3, 4])); // 18
console.log(maxCoins3([9, 8, 7, 6, 5, 1, 2, 3, 4])); // 18
