export function isEqualArrays<T>(
  arr1: T[] | undefined | null,
  arr2: T[] | undefined | null
): boolean {
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  return arr1.every((val, idx) => val === arr2[idx]);
}
