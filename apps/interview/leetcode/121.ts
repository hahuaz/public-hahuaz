/**
 * 121. Best Time to Buy and Sell Stock
 * You are given an array prices where prices[i] is the price of a given stock on the i-th day.
 * You want to maximize your profit by choosing a single day to buy one stock
 * and choosing a different day in the future to sell that stock.
 * Return the maximum profit you can achieve from this transaction.
 * If you cannot achieve any profit, return 0.
 *
 * Example 1:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.
 */

// O(n) time complexity
function maxProfit(prices: number[]): number {
  let maxProfit = 0;
  let buyPrice = 0;

  for (let day = 0; day < prices.length; day++) {
    // if it's first day, buy in order to calculate profit in the future
    if (day == 0) {
      buyPrice = prices[day];
      continue;
    }

    // if price got increase, calc and save the profit for future compare
    if (prices[day] >= buyPrice) {
      maxProfit = Math.max(maxProfit, prices[day] - buyPrice);
      continue;
    }

    // if price got down, change buy point to see what profit we can make
    if (prices[day] < buyPrice) {
      buyPrice = prices[day];
    }
  }

  if (maxProfit < 0) {
    return 0;
  }
  return maxProfit;
}

// O(n^2) time complexity
function maxProfit2(prices: number[]): number {
  let maxProfit = 0;

  for (let buyD = 0; buyD < prices.length; buyD++) {
    for (let sellD = buyD + 1; sellD < prices.length; sellD++) {
      const profit = prices[sellD] - prices[buyD];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}
