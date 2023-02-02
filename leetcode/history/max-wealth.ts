function maximumWealth(accounts: number[][]): number {
  let maxWealth = 0;

  for (const moneys of accounts) {
    let currWealth = 0;
    for (const money of moneys) {
      currWealth += money;
    }
    if (currWealth > maxWealth) {
      maxWealth = currWealth;
    }
  }
  return maxWealth;
}

// console.log(
//   maximumWealth([
//     [1, 2, 3],
//     [3, 2, 1],
//   ])
// );
