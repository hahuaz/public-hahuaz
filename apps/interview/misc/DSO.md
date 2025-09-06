## Big O Notation (O(n))

In short: Big O tells you how fast or slow an algorithm scales as the input grows.

Represents how efficient a function or algorithm is in terms of time or space as the input size n grows.

Focuses on the worst-case scenario.

Common Examples
Notation Meaning Example
O(1) Constant time – same regardless of input size Accessing an array element
O(log n) Logarithmic – halves the problem each step Binary search
O(n) Linear – grows proportionally with input Looping through an array
O(n²) Quadratic – nested loops Bubble sort
O(2ⁿ) Exponential – doubles each step Recursive Fibonacci (naive)

### big o ignores anything that doesn't grow as n grows

#### O(n) example:

```ts
function example(arr: number[]) {
  // Constant-time operation
  console.log(arr[0]); // O(1)

  // Linear-time operation
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // O(n)
  }
}
```

time complexity of above function is O(1 + n) but we drop the constant and keep the term that grows the fastest, so it's O(n)

#### O(n2) example:

```ts
function example(arr: number[]) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // operation
    }
  }
}
```
Ah! Let’s go **step by step** and see exactly why the `/2` appears.

We have:

```ts
function example(arr: number[]) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // operation
    }
  }
}
```

inner loop runs `n-1` times when `i=0`, `n-2` times when `i=1`, ..., `1` time when `i=n-2`, and `0` times when `i=n-1`

So, the total number of operations is:
(n-1) + (n-2) + ... + 1 + 0
we use generic formula to calc this = n(n-1)/2 = (n² - n)/2

we ignore constants(/2) and lower-order terms(-n) when expressing Big O notation, so we simplify (n² - n)/2 to O(n²)

<hr>

Stack
A Stack is a collection of elements, with two principle operations: push, which adds to the collection, and pop, which removes the most recently added element
Last in, first out data structure (LIFO): the most recently added object is the first to be removed
Time Complexity:
Access: O(n)
Search: O(n)
Insert: O(1)
Remove: O(1)

Queue
A Queue is a collection of elements, supporting two principle operations: enqueue, which inserts an element into the queue, and dequeue, which removes an element from the queue
First in, first out data structure (FIFO): the oldest added object is the first to be removed
Time Complexity:
Access: O(n)
Search: O(n)
Insert: O(1)
Remove: O(1)

Hashing
Hashing is used to map data of an arbitrary size to data of a fixed size. The values returned by a hash function are called hash values, hash codes, or simply hashes. If two keys map to the same value, a collision occurs
Hash Map: a hash map is a structure that can map keys to values. A hash map uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.
Collision Resolution
Separate Chaining: in separate chaining, each bucket is independent, and contains a list of entries for each index. The time for hash map operations is the time to find the bucket (constant time), plus the time to iterate through the list
Open Addressing: in open addressing, when a new entry is inserted, the buckets are examined, starting with the hashed-to-slot and proceeding in some sequence, until an unoccupied slot is found. The name open addressing refers to the fact that the location of an item is not always determined by its hash value
