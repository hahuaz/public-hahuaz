/**
 * 20. Valid Parentheses
 *
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 *
 * An input string is valid if:
 *  1) Open brackets are closed by the same type of brackets.
 *  2) Open brackets are closed in the correct order.
 *  3) Every close bracket has a corresponding open bracket of the same type.
 *
 * Example 1:
 * Input: s = "()"
 * Output: true
 *
 * Example 2:
 * Input: s = "()[]{}"
 * Output: true
 *
 * Example 3:
 * Input: s = "(]"
 * Output: false
 *
 * Example 4:
 * Input: s = "([)]"
 * Output: false
 *
 * Example 5:
 * Input: s = "{[]}"
 * Output: true
 */

function isValid(s: string): boolean {
  const bracketMapper: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    const curChar = s[i];

    // If it's an opening bracket, push it.
    if (curChar in bracketMapper) {
      stack.push(curChar);
      continue;
    } else {
      // Otherwise it must close the latest opening bracket.
      const latestOpenBracket = stack.pop();
      if (!latestOpenBracket) return false;

      // Mismatched type/order.
      if (bracketMapper[latestOpenBracket] !== curChar) return false;
    }
  }

  // if stack is not empty, which indicates string doesn't close all the open braces, return false
  return stack.length === 0;
}

const cases: Array<{ input: string; expected: boolean }> = [
  { input: "()", expected: true },
  { input: "()[]{}", expected: true },
  { input: "(]", expected: false },
  { input: "([)]", expected: false },
  { input: "{[]}", expected: true },
  { input: "[", expected: false },
  { input: "]", expected: false },
  { input: "((({{[[]]}})))", expected: true },
  { input: "({[}])", expected: false },
];

for (const { input, expected } of cases) {
  const got = isValid(input);
  if (got === expected) {
    console.log(`PASS  s="${input}" -> ${got}`);
  } else {
    console.error(`FAIL  s="${input}" -> ${got} (expected ${expected})`);
  }
}
