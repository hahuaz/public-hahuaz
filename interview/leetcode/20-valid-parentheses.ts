function isValid(s: string): boolean {
  const mapper: { [key: string]: string } = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  const stack: string[] = [];

  for (let i = 0; i < s.length; i++) {
    console.log(s[i]);
    // if it's open brace save it
    if (s[i] in mapper) {
      stack.push(s[i]);
      continue;
    }

    // if it's not open brace, it should be closing brace for the last stack element
    const lastOpenBrace = stack.pop();
    if (!lastOpenBrace) return false;
    if (s[i] !== mapper[lastOpenBrace]) return false;
  }

  // if stack is not empty, which indicates string doesn't close all the open braces e.g "[", return false
  if (stack.length) return false;

  return true;
}
