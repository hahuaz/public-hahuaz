// 1268. Search Suggestions System
// You are given an array of strings products and a string searchWord.

// Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.
// Return a list of lists of the suggested products after each character of searchWord is typed.
// input:

function suggestedProducts(products: string[], searchWord: string): string[][] {
  products.sort(); // keep lexicographic order
  const res: string[][] = [];
  let prefix = "";

  for (const ch of searchWord) {
    prefix = prefix + ch;
    const suggestions = [];

    for (const product of products) {
      for (let i = 0; i < prefix.length; i++) {
        if (product[i] !== prefix[i]) break;
        if (i === prefix.length - 1) {
          suggestions.push(product);
        }
      }
      if (suggestions.length === 3) break; // only need top 3
    }

    res.push(suggestions);
  }

  return res;
}

// Time: O(m * n) m = searchWord.length, n = products.length
// Space: O(1) if we don't consider the output array

console.log(
  suggestedProducts(
    ["mobile", "mouse", "moneypot", "monitor", "mousepad"],
    "mouse"
  )
); // [
//   ["mobile","moneypot","monitor"],
//   ["mobile","moneypot","monitor"],
//   ["mouse","mousepad"],
//   ["mouse","mousepad"],
//   ["mouse","mousepad"]
// ];
