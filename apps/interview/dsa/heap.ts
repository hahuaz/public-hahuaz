// Heap is typically implemented using array (not tree nodes with pointers).
// (binary) heap is a complete binary tree: all levels are completely filled except possibly the last, and the last level is filled left to right (flush-left).

// Min-heap: parent <= children : parent is smaller than or equal to its children
// Max-heap: parent >= children : parent is larger than or equal to its children

// For node at index i:
//   left child index = 2*i + 1
//   right child index = 2*i + 2
//   parent index = Math.floor((i - 1) / 2)

// Common operations:
//   insert: add new element to the end of the array, then "bubble up" to restore heap property
//   extractMin/Max: remove root element (min/max), replace with last element, then "bubble down" to restore heap property
//   peek: return root element without removing it
//   size: return number of elements in the heap
