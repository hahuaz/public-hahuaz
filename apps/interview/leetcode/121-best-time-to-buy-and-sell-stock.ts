/**
 * 121. Best Time to Buy and Sell Stock
 *
 * You are given an array prices where prices[i] is the price of a given stock on the i-th day.
 *
 * You want to maximize your profit by choosing a single day to buy one stock
 * and choosing a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction.
 * If you cannot achieve any profit, return 0.
 *
 * Example 1:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.
 *
 */

// O(n) time complexity
function maxProfit(prices: number[]): number {
  let maxProfit = 0;
  let buyPrice = 0;

  for (let i = 0; i < prices.length; i++) {
    // if it's first day, buy in order to calculate profit in the future
    if (i == 0) {
      buyPrice = prices[i];
      continue;
    }

    // if price got increase, calc and save the profit for future compare
    if (prices[i] >= buyPrice) {
      maxProfit = Math.max(maxProfit, prices[i] - buyPrice);
      continue;
    }

    // if price got down, change buy point to see what profit we can make
    if (prices[i] < buyPrice) {
      buyPrice = prices[i];
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

  for (let buyDay = 0; buyDay < prices.length; buyDay++) {
    for (let sellDay = buyDay + 1; sellDay < prices.length; sellDay++) {
      const profit = prices[sellDay] - prices[buyDay];
      maxProfit = Math.max(maxProfit, profit);
    }
  }

  return maxProfit;
}
