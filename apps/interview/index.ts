const _myvar = "Hello World";

console.log("Hello World");

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

await wait(5000);

console.log("Hello World2");
