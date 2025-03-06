function maxProfit(prices: number[]): number {
  // Basically, we are trying to find the maximum difference between the numbers of the array

  if (prices.length == 0) return 0;

  let maxProfit = 0;
  let buyPrice = 0;

  for (let i = 0; i < prices.length; i++) {
    // if it's first day, buy in order to calculate profit in the future
    if (i == 0) {
      buyPrice = prices[i];
    }

    // if price got down, change buy point to see what proift we can make
    if (prices[i] < buyPrice) {
      buyPrice = prices[i];
    } else {
      // if price got increase, calculate the profit
      maxProfit = Math.max(maxProfit, prices[i] - buyPrice);
    }
  }

  if (maxProfit < 0) {
    return 0;
  }
  return maxProfit;
}

maxProfit([1, 30, 0, 3, 6, 4]);
